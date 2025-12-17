import api from './api';

export interface PaymentInitiateResponse {
  payment_url: string;
  tx_ref: string;
}

export const paymentService = {
  initiatePayment: async (bookingId: number, provider: 'CHAPA' | 'PAYPAL' = 'CHAPA') => {
    const response = await api.post<PaymentInitiateResponse>('/payments/initiate/', {
      booking_id: bookingId,
      provider
    });
    return response.data;
  },

  verifyChapaPayment: async (txRef: string) => {
    const response = await api.get(`/payments/chapa/verify/${txRef}/`);
    return response.data;
  }
};
