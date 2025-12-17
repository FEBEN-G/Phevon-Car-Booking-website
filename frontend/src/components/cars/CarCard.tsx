import { Link, useNavigate } from 'react-router-dom';
import type { Car } from '../../types/car';
import { Users, Fuel, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const navigate = useNavigate();

  return (
    <Link to={`/cars/${car.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-60 bg-gray-200 overflow-hidden">
        {car.image ? (
            <img 
                src={car.image} 
                alt={car.model} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
            </div>
        )}
        
        {/* badges */}
        <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm uppercase tracking-wider">
                {car.car_type}
            </span>
        </div>
        
        <div className="absolute top-4 right-4">
             {car.is_available ? (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    Available
                </span>
             ) : (
                <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    Booked
                </span>
             )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
            <div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
                    {car.make} {car.model}
                </h3>
                <p className="text-gray-500 text-sm">{car.year}</p>
            </div>
            <div className="text-right">
                <span className="block text-xl font-bold text-primary">{car.daily_rate} ETB</span>
                <span className="text-xs text-gray-400">per day</span>
            </div>
        </div>

        {/* Features Row */}
        <div className="flex items-center gap-4 py-4 border-t border-gray-50">
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Users size={14} />
                <span>{car.seats}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Fuel size={14} />
                <span className="capitalize">{car.fuel_type}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Settings size={14} />
                <span className="capitalize">{car.transmission}</span>
            </div>
        </div>

        <button className="w-full py-3 mt-1 bg-gray-50 text-gray-900 font-semibold rounded-xl group-hover:bg-primary group-hover:text-white transition-colors text-sm">
            View Details
        </button>
      </div>
    </Link>
  );
}
