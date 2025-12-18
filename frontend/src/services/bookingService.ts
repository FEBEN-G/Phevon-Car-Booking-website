import api from './api';
import type { Car } from '../types/car';

export interface Booking {
  id: number;
  car: Car;
  start_date: string;
  end_date: string;
  total_price: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

export interface CreateBookingData {
  car: number;
  start_date: string;
  end_date: string;
}

export const bookingService = {
  createBooking: async (data: CreateBookingData) => {
    const response = await api.post<Booking>('bookings/', data);
    return response.data;
  },

  getMyBookings: async () => {
    const response = await api.get<Booking[]>('bookings/');
    return response.data;
  }
};
