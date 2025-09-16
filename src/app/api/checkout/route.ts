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
    const { productId, variantSku, quantity = 1 } = body;

    // Validar payload
    if (!productId || !variantSku || quantity < 1) {
      return NextResponse.json(
        { error: 'productId, variantSku y quantity son requeridos' },
        { status: 400 }
      );
    }

    // Buscar variant en DB
    const variant = await prisma.variant.findUnique({
      where: { sku: variantSku },
      include: {
        product: {
          include: {
            categories: true,
            collections: true
          }
        }
      }
    });

    if (!variant) {
      return NextResponse.json(
        { error: 'Variante no encontrada' },
        { status: 404 }
      );
    }

    // Verificar stock
    if (variant.stock < quantity) {
      return NextResponse.json(
        { error: 'Stock insuficiente' },
        { status: 400 }
      );
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
      line_items: [
        {
          quantity,
          price_data: {
            currency: 'mxn',
            unit_amount: variant.priceMXN, // ya está en centavos
            product_data: {
              name: `${variant.product.title} – ${variant.option2}`,
              description: variant.product.description || '',
              metadata: {
                sku: variant.sku,
                productId: variant.product.id,
                variantId: variant.id,
              },
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pago/cancelado`,
      metadata: {
        productId: variant.product.id,
        variantId: variant.id,
        quantity: quantity.toString(),
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