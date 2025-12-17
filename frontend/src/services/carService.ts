import api from './api';
import type { Car, CarFilters, Location } from '../types/car';

export const carService = {
  getCars: async (filters?: CarFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.make) params.append('make__icontains', filters.make);
      if (filters.car_type) params.append('car_type', filters.car_type);
      if (filters.min_price) params.append('daily_rate__gte', filters.min_price.toString());
      if (filters.max_price) params.append('daily_rate__lte', filters.max_price.toString());
      if (filters.seats) params.append('seats__gte', filters.seats.toString());
      if (filters.location) params.append('location__city', filters.location);
    }
    const response = await api.get<Car[]>(`/cars/?${params.toString()}`);
    return response.data;
  },

  getCar: async (id: number) => {
    const response = await api.get<Car>(`/cars/${id}/`);
    return response.data;
  },
  
  getLocations: async () => {
      const response = await api.get<Location[]>('/locations/');
      return response.data;
  }
};
