import { PaymentProvider } from './index';
import { CheckoutData } from '@/lib/validations';

/**
 * Proveedor de pagos mock para desarrollo
 */
export function createMockProvider(): PaymentProvider {
  return {
    async createCheckoutSession(_checkoutData: CheckoutData) {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockId = `mock_${Date.now()}`;
      const mockUrl = `/checkout/success?session_id=${mockId}`;
      
      return {
        id: mockId,
        url: mockUrl,
        status: 'pending',
      };
    },
    
    async verifyWebhook(payload: unknown, _signature: string) {
      // En modo mock, siempre retornamos éxito
      const payloadData = payload as { id?: string; amount?: number; customer?: { email?: string; name?: string } };
      return {
        id: payloadData.id || 'mock_payment',
        status: 'succeeded',
        amount: payloadData.amount || 0,
        customer: {
          email: payloadData.customer?.email || 'mock@example.com',
          name: payloadData.customer?.name || 'Cliente Mock',
        },
      };
    },
    
    async getPaymentStatus(paymentId: string) {
      // Simular verificación de estado
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        id: paymentId,
        status: 'succeeded',
        amount: 150000, // 1500 MXN en centavos
      };
    },
  };
}
