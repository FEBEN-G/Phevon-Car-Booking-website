import { Link } from 'react-router-dom';
import type { Car } from '../../types/car';
import { Users, Fuel, Settings } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {

  return (
    <Link to={`/cars/${car.id}`} className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-52 md:h-60 bg-gray-200 overflow-hidden">
        {car.image ? (
            <img 
                src={car.image} 
                alt={car.model} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
            </div>
        )}
        
        {/* badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] md:text-xs font-black text-gray-900 shadow-sm uppercase tracking-widest border border-white/20">
                {car.car_type}
            </span>
        </div>
        
        <div className="absolute top-4 right-4">
             {car.is_available ? (
                <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-black shadow-lg border border-white/20">
                    Available
                </span>
             ) : (
                <span className="bg-gray-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-black shadow-lg border border-white/20">
                    Booked
                </span>
             )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-4">
            <div className="flex-1 min-w-0 pr-2">
                <h3 className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-primary transition-colors truncate">
                    {car.make} {car.model}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wide">{car.year} &bull; {car.location.city}</p>
            </div>
            <div className="text-right shrink-0">
                <span className="block text-lg md:text-xl font-black text-primary leading-none">{car.daily_rate.toLocaleString()}</span>
                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tighter">ETB / day</span>
            </div>
        </div>

        {/* Features Row */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 py-4 border-t border-gray-50">
            <div className="flex items-center gap-1.5 text-gray-500">
                <div className="p-1.5 bg-gray-50 rounded-lg text-primary">
                    <Users size={14} />
                </div>
                <span className="text-xs md:text-sm font-medium">{car.seats} Seats</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
                <div className="p-1.5 bg-gray-50 rounded-lg text-primary">
                    <Fuel size={14} />
                </div>
                <span className="text-xs md:text-sm font-medium capitalize">{car.fuel_type}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
                <div className="p-1.5 bg-gray-50 rounded-lg text-primary">
                    <Settings size={14} />
                </div>
                <span className="text-xs md:text-sm font-medium capitalize truncate">{car.transmission}</span>
            </div>
        </div>

        <button className="w-full py-3.5 mt-2 bg-black text-white font-bold rounded-2xl group-hover:bg-primary shadow-lg shadow-black/5 hover:shadow-primary/20 transition-all duration-300 text-sm tracking-wide">
            Book Now
        </button>
      </div>
    </Link>
  );
}
