import { useState, useEffect } from 'react';
import { carService } from '../../services/carService';
import type { Car, CarFilters } from '../../types/car';
import CarCard from '../../components/cars/CarCard';
import FilterSidebar from '../../components/cars/FilterSidebar';
import { Input } from '../../components/ui/Input';
import { Search } from 'lucide-react';

export default function BrowsingPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CarFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      // Merge text search into filters make for simplicity for now
      const activeFilters = { ...filters };
      if (searchTerm) activeFilters.make = searchTerm; 
      
      const data = await carService.getCars(activeFilters);
      setCars(data);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCars();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-r from-dark to-gray-800 text-white pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Find Your Perfect Ride</h1>
            <p className="text-gray-300 text-lg">Explore our fleet of premium vehicles across Ethiopia</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-6 mb-8">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2 bg-white p-2 rounded-xl shadow-lg">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <Input 
                    placeholder="Search by make or model..." 
                    className="pl-10 border-0 focus:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button type="submit" className="bg-primary hover:bg-primary-hover px-6 rounded-lg font-semibold transition-colors text-white">
                Search
            </button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 hidden lg:block">
                <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>

            {/* Car Grid */}
            <div className="lg:col-span-3">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading amazing cars...</p>
                    </div>
                ) : cars.length > 0 ? (
                    <>
                        <div className="mb-4 text-gray-600">
                            <span className="font-semibold">{cars.length}</span> cars available
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {cars.map(car => (
                                <CarCard key={car.id} car={car} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
                        <button 
                            onClick={() => { setFilters({}); setSearchTerm(''); }}
                            className="mt-4 text-primary hover:underline font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
