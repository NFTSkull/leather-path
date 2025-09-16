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

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      // Obtener detalles de la sesión
      const stripe = getStripe();
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items', 'customer_details', 'shipping_details'],
      });

      const lineItems = sessionWithLineItems.line_items?.data || [];
      const customerDetails = sessionWithLineItems.customer_details;
      const shippingDetails = (sessionWithLineItems as any).shipping_details;

      // Crear registro de Order en DB
      const order = await prisma.order.create({
        data: {
          subtotalMXN: session.amount_subtotal || 0,
          shippingMXN: session.shipping_cost?.amount_total || 0,
          taxMXN: session.total_details?.amount_tax || 0,
          totalMXN: session.amount_total || 0,
          status: 'paid',
          provider: 'stripe',
          providerId: session.id,
          customerId: null, // TODO: crear/actualizar customer si es necesario
        },
      });

      // Crear OrderItems
      for (const item of lineItems) {
        if ((item as any).price_data?.product_data?.metadata) {
          const metadata = (item as any).price_data.product_data.metadata;
          const variantId = metadata.variantId;
          const quantity = item.quantity || 1;

          await prisma.orderItem.create({
            data: {
              orderId: order.id,
              variantId: variantId,
              title: (item as any).price_data.product_data.name || '',
              option1: null,
              option2: metadata.option2 || null,
              unitPriceMXN: (item as any).price_data.unit_amount || 0,
              qty: quantity,
            },
          });

          // Descontar stock
          await prisma.variant.update({
            where: { id: variantId },
            data: {
              stock: {
                decrement: quantity,
              },
            },
          });
        }
      }

      // Notificaciones (placeholders)
      await sendOrderNotifications(order.id, session);

      console.log(`Order ${order.id} created successfully`);

    } catch (error) {
      console.error('Error processing checkout.session.completed:', error);
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function sendOrderNotifications(orderId: string, session: Stripe.Checkout.Session) {
  try {
    // Email notification (si existe RESEND_API_KEY)
    if (process.env.RESEND_API_KEY && process.env.SALES_EMAIL) {
      await sendOrderEmail(orderId, session);
    }

    // WhatsApp notification (si existen credenciales)
    if (process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID && process.env.SALES_PHONE) {
      await sendOrderWhatsApp(orderId, session);
    }
  } catch (error) {
    console.error('Notification error:', error);
  }
}

async function sendOrderEmail(orderId: string, session: Stripe.Checkout.Session) {
  // Placeholder para email
  console.log(`📧 Email notification for order ${orderId} to ${process.env.SALES_EMAIL}`);
  // TODO: Implementar con Resend API
}

async function sendOrderWhatsApp(orderId: string, session: Stripe.Checkout.Session) {
  // Placeholder para WhatsApp
  console.log(`📱 WhatsApp notification for order ${orderId} to ${process.env.SALES_PHONE}`);
  // TODO: Implementar con WhatsApp Business API
}