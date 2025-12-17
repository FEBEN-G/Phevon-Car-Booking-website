import type { CarFilters } from "../../types/car";

interface FilterSidebarProps {
  filters: CarFilters;
  onFilterChange: (filters: CarFilters) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  
  const handleChange = (key: keyof CarFilters, value: any) => {
      onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-900">Filters</h3>
        <button 
            onClick={() => onFilterChange({})}
            className="text-sm text-primary hover:underline"
        >
            Reset
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Car Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Car Type</label>
          <div className="space-y-2">
            {['SEDAN', 'SUV', 'LUXURY', 'HATCHBACK'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="car_type"
                  checked={filters.car_type === type}
                  onChange={() => handleChange('car_type', type)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-600 capitalize">{type.toLowerCase()}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (ETB)</label>
          <input 
            type="range" 
            min="0" 
            max="200000" 
            step="1000"
            value={filters.max_price || 200000}
            onChange={(e) => handleChange('max_price', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>{filters.max_price || 200000}</span>
          </div>
        </div>

        {/* Transmission */}
         {/* Add more filters as needed */}
      </div>
    </div>
  );
}
