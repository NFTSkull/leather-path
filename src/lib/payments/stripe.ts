import Stripe from 'stripe';
import { z } from 'zod';

// Función lazy para obtener Stripe
function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  
  return new Stripe(secretKey, {
    apiVersion: '2025-08-27.basil',
  });
}

// Esquemas de validación
const checkoutItemSchema = z.object({
  variantId: z.string().min(1),
  qty: z.number().min(1).max(10),
});

const createCheckoutSessionSchema = z.object({
  items: z.array(checkoutItemSchema).min(1),
  customerEmail: z.string().email(),
});

export type CreateCheckoutSessionData = z.infer<typeof createCheckoutSessionSchema>;

/**
 * Crea una sesión de checkout de Stripe
 */
export async function createCheckoutSession({
  items,
  customerEmail,
  orderId,
}: CreateCheckoutSessionData & { orderId: string }) {
  try {
    // Validar datos de entrada
    const validatedData = createCheckoutSessionSchema.parse({
      items,
      customerEmail,
    });

    // Construir line_items para Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    // TODO: Obtener datos de variantes desde la base de datos
    // Por ahora usamos datos mock para desarrollo
    for (const item of validatedData.items) {
      lineItems.push({
        price_data: {
          currency: 'mxn',
          unit_amount: 265000, // $2,650.00 MXN en centavos
          product_data: {
            name: `Producto - Variante ${item.variantId}`,
            description: 'Sandalias de cuero premium',
            images: [], // Se pueden agregar URLs de imágenes
          },
        },
        quantity: item.qty,
      });
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?oid=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/carrito`,
      customer_email: validatedData.customerEmail,
      shipping_address_collection: {
        allowed_countries: ['MX', 'US'],
      },
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        orderId,
        items: JSON.stringify(validatedData.items),
      },
    }, {
      idempotencyKey: `checkout-${orderId}-${Date.now()}`,
    });

    return {
      success: true,
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Verifica un webhook de Stripe
 */
export async function verifyWebhook(
  payload: string | Buffer,
  signature: string
): Promise<Stripe.Event | null> {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.log('⚠️ STRIPE_WEBHOOK_SECRET no configurado');
      return null;
    }

    const event = getStripe().webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );
    return event;
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return null;
  }
}

/**
 * Procesa el evento checkout.session.completed
 */
export async function handleCheckoutCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  
  try {
    const orderId = session.metadata?.orderId;
    if (!orderId) {
      throw new Error('Order ID not found in session metadata');
    }

    // TODO: Implementar lógica de actualización de orden
    // 1. Actualizar Order en la base de datos
    // 2. Descontar stock de variantes
    // 3. Generar número de orden
    // 4. Enviar notificaciones

    console.log('Checkout completed for order:', orderId);
    console.log('Session details:', {
      id: session.id,
      amount_total: session.amount_total,
      customer_email: session.customer_details?.email,
      // shipping: session.shipping_details,
    });

    return {
      success: true,
      orderId,
      sessionId: session.id,
    };
  } catch (error) {
    console.error('Error handling checkout completed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}
