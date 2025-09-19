import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, returnUrl } = body;

    // Validar payload
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'items array es requerido' },
        { status: 400 }
      );
    }

    // Buscar todas las variantes en DB
    const skus = items.map((item: any) => item.sku);
    const variants = await prisma.variant.findMany({
      where: { sku: { in: skus } },
      include: {
        product: {
          include: {
            categories: true,
            collections: true
          }
        }
      }
    });

    if (variants.length !== items.length) {
      return NextResponse.json(
        { error: 'Algunas variantes no fueron encontradas' },
        { status: 404 }
      );
    }

    // Verificar stock para todos los items
    for (const item of items) {
      const variant = variants.find(v => v.sku === item.sku);
      if (!variant || variant.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${item.sku}` },
          { status: 400 }
        );
      }
    }

    // Crear sesión de Stripe Checkout
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      customer_creation: 'always',
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ['MX', 'US'],
      },
      allow_promotion_codes: true,
      mode: 'payment',
      line_items: items.map((item: any) => {
        const variant = variants.find(v => v.sku === item.sku);
        return {
          quantity: item.quantity,
          price_data: {
            currency: 'mxn',
            unit_amount: item.priceMXN * 100, // convertir pesos a centavos para Stripe
            product_data: {
              name: `${item.title} – ${variant?.option2 || ''}`,
              description: variant?.product?.description || '',
              metadata: {
                sku: item.sku,
                productId: variant?.product?.id || '',
                variantId: variant?.id || '',
              },
            },
          },
        };
      }),
      success_url: returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pago/cancelado`,
      metadata: {
        items: JSON.stringify(items.map((item: any) => ({
          sku: item.sku,
          quantity: item.quantity,
        }))),
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}