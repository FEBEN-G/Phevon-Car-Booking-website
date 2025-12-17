import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carService } from '../../services/carService';
import type { Car } from '../../types/car';
import BookingWidget from '../../components/cars/BookingWidget';
import Car3DViewer from '../../components/cars/Car3DViewer';
import { MapPin, Settings, Fuel, Users, ArrowLeft, Calendar, Shield, Zap, Wind } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
       fetchCar(parseInt(id));
    }
  }, [id]);

  const fetchCar = async (carId: number) => {
    try {
      const data = await carService.getCar(carId);
      setCar(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }
  
  if (!car) return <div className="p-10 text-center">Car not found</div>;

  // Default features if not provided
  const defaultFeatures = [
    'Air Conditioning',
    'Bluetooth Connectivity',
    'USB Charging Ports',
    'Power Windows',
    'Central Locking',
    'Airbags',
    'ABS Brakes',
    'Backup Camera'
  ];

  const features = car.features && car.features.length > 0 ? car.features : defaultFeatures;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/cars')} className="mb-6 pl-0">
            <ArrowLeft size={20} className="mr-2" /> Back to Browse
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Images & Info */}
            <div className="lg:col-span-2 space-y-6">
                {/* 3D Viewer */}
                <Car3DViewer imageUrl={car.image || ''} carName={`${car.make} ${car.model}`} />

                {/* Info Header */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.make} {car.model}</h1>
                            <div className="flex items-center text-gray-500 gap-2">
                                <MapPin size={18} className="text-primary" />
                                <span>{car.location?.city}, {car.location?.address}</span>
                            </div>
                        </div>
                        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                            {car.car_type}
                        </div>
                    </div>
                    
                    <div className="flex items-baseline gap-2 pt-4 border-t border-gray-100">
                        <span className="text-4xl font-bold text-primary">{car.daily_rate} ETB</span>
                        <span className="text-gray-500">/ day</span>
                    </div>
                </div>

                {/* Key Specs Grid */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Key Specifications</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                            <Settings className="text-blue-600 mb-2" size={24} />
                            <span className="text-xs text-gray-600 mb-1">Transmission</span>
                            <span className="font-bold text-gray-900 capitalize">{car.transmission.toLowerCase()}</span>
                        </div>
                         <div className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                            <Fuel className="text-green-600 mb-2" size={24} />
                            <span className="text-xs text-gray-600 mb-1">Fuel Type</span>
                            <span className="font-bold text-gray-900 capitalize">{car.fuel_type.toLowerCase()}</span>
                        </div>
                         <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                            <Users className="text-purple-600 mb-2" size={24} />
                            <span className="text-xs text-gray-600 mb-1">Capacity</span>
                            <span className="font-bold text-gray-900">{car.seats} People</span>
                        </div>
                         <div className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                            <Calendar className="text-orange-600 mb-2" size={24} />
                            <span className="text-xs text-gray-600 mb-1">Year</span>
                            <span className="font-bold text-gray-900">{car.year}</span>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Features & Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Description */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold mb-4">About This Car</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {car.description || `Experience the perfect blend of comfort and performance with the ${car.year} ${car.make} ${car.model}. This ${car.car_type.toLowerCase()} is equipped with ${car.transmission.toLowerCase()} transmission and runs on ${car.fuel_type.toLowerCase()}, making it ideal for both city driving and long journeys. With seating for ${car.seats} passengers, it's perfect for families or groups looking for a reliable and comfortable ride.`}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="text-center">
                            <Shield className="mx-auto text-primary mb-2" size={24} />
                            <p className="text-xs text-gray-500">Fully Insured</p>
                        </div>
                        <div className="text-center">
                            <Zap className="mx-auto text-primary mb-2" size={24} />
                            <p className="text-xs text-gray-500">24/7 Support</p>
                        </div>
                        <div className="text-center">
                            <Wind className="mx-auto text-primary mb-2" size={24} />
                            <p className="text-xs text-gray-500">Clean & Sanitized</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Booking Widget */}
            <div className="lg:col-span-1">
                <BookingWidget car={car} />
            </div>
        </div>
      </div>
    </div>
  );
}
