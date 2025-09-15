import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createCheckoutSession } from '@/lib/payments/stripe';
import { getPrisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';

// Esquema de validación para el request
const checkoutRequestSchema = z.object({
  items: z.array(z.object({
    variantId: z.string().min(1),
    qty: z.number().min(1).max(10),
  })).min(1),
  customerEmail: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos de entrada
    const validatedData = checkoutRequestSchema.parse(body);
    
    // Generar ID único para la orden
    const orderId = randomBytes(16).toString('hex');
    
    // Crear orden preliminar en la base de datos
    const prisma = getPrisma();
    await prisma.order.create({
      data: {
        id: orderId,
        subtotalMXN: 0, // Se calculará después
        shippingMXN: 0,
        taxMXN: 0,
        totalMXN: 0,
        status: 'created',
        provider: 'stripe',
        providerId: null,
      },
    });

    // Crear sesión de checkout con Stripe
    const checkoutResult = await createCheckoutSession({
      ...validatedData,
      orderId,
    });

    if (!checkoutResult.success) {
      // Si falla la creación de la sesión, eliminar la orden
      await prisma.order.delete({
        where: { id: orderId },
      });
      
      return NextResponse.json(
        { error: checkoutResult.error },
        { status: 400 }
      );
    }

    // Actualizar la orden con el ID de la sesión de Stripe
    await prisma.order.update({
      where: { id: orderId },
      data: {
        providerId: checkoutResult.sessionId,
      },
    });

    return NextResponse.json({
      success: true,
      url: checkoutResult.url,
      orderId,
    });

  } catch (error) {
    console.error('Error in checkout API:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos de entrada inválidos', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
