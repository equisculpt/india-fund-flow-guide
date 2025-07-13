import { BaseApiService } from './baseApiService';

interface PaymentIntentRequest {
  amount: number;
  currency: string;
  orderId: string;
  paymentMethod: 'upi' | 'netbanking' | 'card';
}

interface PaymentIntentResponse {
  paymentIntentId: string;
  amount: number;
  currency: string;
  paymentUrl: string;
  expiresAt: string;
}

interface PaymentStatus {
  paymentIntentId: string;
  status: 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED';
  amount: number;
  paidAt?: string;
  transactionId?: string;
}

export class PaymentService extends BaseApiService {
  async createPaymentIntent(paymentData: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    return this.post<PaymentIntentResponse>('/api/payment/create-intent', paymentData);
  }

  async getPaymentStatus(paymentIntentId: string): Promise<PaymentStatus> {
    return this.get<PaymentStatus>(`/api/payment/status/${paymentIntentId}`);
  }
}

export const paymentService = new PaymentService();