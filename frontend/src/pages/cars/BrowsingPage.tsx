import { useState, useEffect } from 'react';
import { carService } from '../../services/carService';
import type { Car, CarFilters } from '../../types/car';
import CarCard from '../../components/cars/CarCard';
import FilterSidebar from '../../components/cars/FilterSidebar';
import { Input } from '../../components/ui/Input';
import { Search, Filter, X } from 'lucide-react';

export default function BrowsingPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CarFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    setLoading(true);
    try {
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
    <div className="min-h-screen bg-gray-50 pb-12 pt-20">
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">Find Your Perfect Ride</h1>
            <p className="text-gray-400 text-base md:text-lg">Explore our fleet of premium vehicles across Ethiopia</p>
        </div>
      </div>

      {/* Search Bar & Mobile Filter Toggle */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <Input 
                        placeholder="Search by make or model..." 
                        className="pl-10 border-0 focus:ring-0 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-primary hover:bg-primary-hover px-4 md:px-6 rounded-lg font-semibold transition-colors text-white text-sm md:text-base">
                    Search
                </button>
            </form>
            
            <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center justify-center gap-2 bg-white px-6 py-3 rounded-xl shadow-md border border-gray-100 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <Filter size={20} />
                Filters
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <div className="lg:col-span-1 hidden lg:block">
                <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>

            {/* Mobile Filter Drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl animate-slide-in p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 font-display">Refine Search</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <FilterSidebar 
                            filters={filters} 
                            onFilterChange={(f) => {
                                setFilters(f);
                                // Optional: auto-close on filter change on mobile if desired
                            }} 
                        />
                        <button 
                            onClick={() => setIsFilterOpen(false)}
                            className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold shadow-lg"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}

            {/* Car Grid */}
            <div className="lg:col-span-3">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading amazing cars...</p>
                    </div>
                ) : cars.length > 0 ? (
                    <>
                        <div className="mb-4 text-gray-600 flex justify-between items-center">
                            <span className="text-sm"><span className="font-semibold">{cars.length}</span> vehicles available</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {cars.map(car => (
                                <CarCard key={car.id} car={car} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg font-medium">No cars found matching your criteria.</p>
                        <button 
                            onClick={() => { setFilters({}); setSearchTerm(''); }}
                            className="mt-4 text-primary hover:underline font-bold"
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
