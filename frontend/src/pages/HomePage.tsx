import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carService } from '../services/carService';
import type { Car, CarFilters } from '../types/car';
import CarCard from '../components/cars/CarCard';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const categories = ['All', 'SUV', 'Sedan', 'Luxury', 'Electric', 'Truck'];

  useEffect(() => {
    fetchCars();
  }, [activeCategory]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const filters: CarFilters = {};
      if (activeCategory !== 'All') {
        filters.car_type = activeCategory.toUpperCase();
      }
      const data = await carService.getCars(filters);
      setCars(data);
    } catch (error) {
      console.error('Failed to fetch cars', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-dark overflow-hidden">
        {/* Abstract Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
             <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
             <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20 animate-fade-in-up">
                <Sparkles size={16} className="text-yellow-400" />
                <span className="text-sm font-medium">Premium Car Rental Service</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight animate-fade-in-up delay-100">
              Drive Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Dream Car</span> Today
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg animate-fade-in-up delay-200">
              Experience the customized thrill of the road with our premium fleet. From luxury sedans to rugged SUVs, we have the perfect ride for your journey.
            </p>
            <div className="flex gap-4 animate-fade-in-up delay-300">
              {!isAuthenticated ? (
                <Button 
                    onClick={() => navigate('/cars')}
                    className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/30 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
                  <span className="relative flex items-center">
                    Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              ) : (
                <Button 
                    onClick={() => {
                        const element = document.getElementById('car-grid');
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="h-14 px-8 text-lg rounded-full"
                >
                  Browse Cars
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <Shield size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Secure Payments</h3>
                    <p className="text-sm text-gray-500">100% secure checkout with Chapa</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                    <Zap size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Instant Booking</h3>
                    <p className="text-sm text-gray-500">Book and confirm in minutes</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Premium Quality</h3>
                    <p className="text-sm text-gray-500">Maintained to agency standards</p>
                </div>
            </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div id="car-grid" className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
                <p className="text-gray-500 mt-2">Discover our most popular models</p>
            </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                        activeCategory === cat
                            ? 'bg-black text-white shadow-lg scale-105'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Car Grid */}
        {loading ? (
             <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500">Loading fleet...</p>
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        )}

        {cars.length === 0 && !loading && (
             <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No vehicles found in this category.</p>
                <Button 
                    variant="ghost" 
                    onClick={() => setActiveCategory('All')} 
                    className="mt-4 text-primary"
                >
                    View All Cars
                </Button>
            </div>
        )}
      </div>
    </div>
  );
}
