export interface Location {
  id: number;
  name: string;
  city: string;
  address: string;
}

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  car_type: 'SEDAN' | 'SUV' | 'LUXURY' | 'HATCHBACK' | 'VAN';
  transmission: 'MANUAL' | 'AUTOMATIC';
  fuel_type: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
  seats: number;
  daily_rate: number;
  image: string | null;
  location: Location;
  is_available: boolean;
  description?: string;
  features?: string[];
}

export interface CarFilters {
  make?: string;
  car_type?: string;
  min_price?: number;
  max_price?: number;
  seats?: number;
  location?: string;
}
