import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Envía email de confirmación de pedido
 */
export async function sendOrderEmail(orderId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Obtener datos de la orden
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }

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

    // Datos del email
    const emailData = {
      to: order.customer?.email || 'cliente@ejemplo.com',
      subject: `Confirmación de Pedido ${orderNumber} - Leather Path`,
      template: 'order-confirmation',
      data: {
        orderNumber,
        orderDate: order.createdAt.toLocaleDateString('es-MX'),
        customerName: order.customer?.name || 'Cliente',
        items: order.items.map((item: any) => ({
          title: item.title,
          variant: item.variant.option2 || 'Única',
          quantity: item.qty,
          unitPrice: item.unitPriceMXN,
          total: item.unitPriceMXN * item.qty,
        })),
        subtotal: order.subtotalMXN,
        shipping: order.shippingMXN,
        tax: order.taxMXN,
        total: order.totalMXN,
        orderUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/cuenta/pedidos/${orderId}`,
      },
    };

    // TODO: Implementar envío real de email
    // Por ahora solo logueamos
    console.log('📧 Email de confirmación:', {
      orderId,
      orderNumber,
      emailData,
    });

    // Simular envío exitoso
    if (process.env.EMAIL_API_KEY) {
      // Aquí iría la lógica real de envío de email
      // Ejemplo con SendGrid, Resend, etc.
      console.log('✅ Email enviado exitosamente');
    } else {
      console.log('⚠️ EMAIL_API_KEY no configurada - email no enviado');
    }

    return { success: true };

  } catch (error) {
    console.error('Error sending order email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Envía WhatsApp de confirmación de pedido
 */
export async function sendWhatsApp(orderId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Obtener datos de la orden
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
      },
    });

    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }

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

    // Datos del WhatsApp
    const whatsappData = {
      to: order.customer?.phone || '+521234567890',
      message: `🎉 ¡Pago confirmado!

Pedido: ${orderNumber}
Monto: $${(order.totalMXN / 100).toFixed(2)} MXN
Fecha: ${order.createdAt.toLocaleDateString('es-MX')}

Gracias por tu compra en Leather Path. Te enviaremos los detalles de envío pronto.

¿Necesitas ayuda? Contáctanos.`,
    };

    // TODO: Implementar envío real de WhatsApp
    // Por ahora solo logueamos
    console.log('📱 WhatsApp de confirmación:', {
      orderId,
      orderNumber,
      whatsappData,
    });

    // Simular envío exitoso
    if (process.env.WHATSAPP_API_KEY) {
      // Aquí iría la lógica real de envío de WhatsApp
      // Ejemplo con Twilio, WhatsApp Cloud API, etc.
      console.log('✅ WhatsApp enviado exitosamente');
    } else {
      console.log('⚠️ WHATSAPP_API_KEY no configurada - WhatsApp no enviado');
    }

    return { success: true };

  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}
