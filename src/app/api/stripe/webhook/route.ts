import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook } from '@/lib/payments/stripe';
import { PrismaClient } from '@prisma/client';
import { sendOrderEmail } from '@/lib/notifications/email';
import { sendWhatsApp } from '@/lib/notifications/whatsapp';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Leer el body raw para verificación de webhook
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('Missing Stripe signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verificar el webhook
    const event = await verifyWebhook(body, signature);
    if (!event) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Procesar según el tipo de evento
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompletedEvent(event);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompletedEvent(event: any) {
  const session = event.data.object;
  
  try {
    const orderId = session.metadata?.orderId;
    if (!orderId) {
      throw new Error('Order ID not found in session metadata');
    }

    // Obtener la orden de la base de datos
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }

    // Extraer información del cliente y envío
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const customerPhone = session.customer_details?.phone;
    
    const shippingAddress = session.shipping_details?.address;
    // const shippingName = session.shipping_details?.name;

    // Calcular totales (por ahora usar los de Stripe)
    const amountTotal = session.amount_total || 0;
    const amountSubtotal = session.amount_subtotal || 0;
    const shippingCost = amountTotal - amountSubtotal;

    // Generar número de orden
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const orderCount = await prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(year, now.getMonth(), 1),
        },
      },
    });
    const orderNumber = `LP-${year}${month}-${String(orderCount).padStart(4, '0')}`;

    // Actualizar la orden
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'paid',
        subtotalMXN: amountSubtotal,
        shippingMXN: shippingCost,
        taxMXN: 0, // Stripe maneja impuestos automáticamente
        totalMXN: amountTotal,
        providerId: session.id,
      },
    });

    // Crear/actualizar cliente si existe email
    let customer = null;
    if (customerEmail) {
      customer = await prisma.customer.upsert({
        where: { email: customerEmail },
        update: {
          name: customerName || undefined,
          phone: customerPhone || undefined,
        },
        create: {
          email: customerEmail,
          name: customerName || undefined,
          phone: customerPhone || undefined,
        },
      });

      // Actualizar la orden con el customerId
      await prisma.order.update({
        where: { id: orderId },
        data: { customerId: customer.id },
      });
    }

    // Crear dirección de envío si existe
    if (shippingAddress && customer) {
      await prisma.address.create({
        data: {
          customerId: customer.id,
          line1: shippingAddress.line1 || '',
          line2: shippingAddress.line2 || '',
          city: shippingAddress.city || '',
          state: shippingAddress.state || '',
          postalCode: shippingAddress.postal_code || '',
          country: shippingAddress.country || 'MX',
          isDefault: true,
        },
      });
    }

    // TODO: Crear OrderItems basado en los items del carrito
    // Por ahora solo logueamos la información
    console.log('Order completed:', {
      orderId,
      orderNumber,
      amountTotal,
      customerEmail,
      shippingAddress,
    });

    // TODO: Descontar stock de variantes
    // Enviar notificaciones
    await sendOrderEmail(orderId);
    await sendWhatsApp(orderId);

    console.log(`✅ Order ${orderNumber} processed successfully`);

  } catch (error) {
    console.error('Error handling checkout completed:', error);
    throw error;
  }
}
