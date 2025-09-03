import { CheckoutData } from '@/lib/validations';

export interface PaymentProvider {
  createCheckoutSession: (checkoutData: CheckoutData) => Promise<{
    id: string;
    url: string;
    status: string;
  }>;
  
  verifyWebhook: (payload: unknown, signature: string) => Promise<{
    id: string;
    status: string;
    amount: number;
    customer: {
      email: string;
      name: string;
    };
  }>;
  
  getPaymentStatus: (paymentId: string) => Promise<{
    id: string;
    status: string;
    amount: number;
  }>;
}

export interface PaymentConfig {
  provider: 'stripe' | 'mercadopago' | 'mock';
  publicKey: string;
  secretKey: string;
  webhookSecret?: string;
}

/**
 * Factory para crear el proveedor de pagos según la configuración
 */
export function createPaymentProvider(config: PaymentConfig): PaymentProvider {
  switch (config.provider) {
    case 'stripe':
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require('./stripe').createStripeProvider(config);
    case 'mercadopago':
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require('./mercadopago').createMercadoPagoProvider(config);
    case 'mock':
    default:
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require('./mock').createMockProvider();
  }
}
