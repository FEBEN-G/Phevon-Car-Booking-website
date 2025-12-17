import { useState } from 'react';
import type { Car } from '../../types/car';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services/bookingService';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface BookingWidgetProps {
  car: Car;
}

export default function BookingWidget({ car }: BookingWidgetProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * car.daily_rate;
  };

  const total = calculateTotal();
  const diffDays = total > 0 ? total / car.daily_rate : 0;

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const booking = await bookingService.createBooking({
        car: car.id,
        start_date: startDate,
        end_date: endDate
      });
      console.log("Booking created:", booking);
      // alert('Booking created successfully!');
      // Navigate to checkout/payment page, potentially passing booking ID via state or URL
      // Assuming /checkout might handle it or we go directly to a payment initiation
      // For now, let's go to /checkout
      navigate('/checkout'); // Or use a specific payment route if available
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.non_field_errors?.[0] || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
     if (total <= 0) return;
     addToCart({
         car,
         startDate,
         endDate,
         days: diffDays,
         totalPrice: total
     });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
      <h3 className="text-xl font-bold mb-4">Book this Car</h3>
      <div className="text-3xl font-bold text-primary mb-6">
        {car.daily_rate} ETB <span className="text-sm text-gray-400 font-normal">/ day</span>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pick-up Date</label>
          <input 
            type="date" 
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
          <input 
            type="date" 
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {total > 0 && (
        <div className="flex justify-between items-center mb-6 py-4 border-t border-b border-gray-100">
          <span className="font-semibold text-gray-700">Total Price</span>
          <span className="font-bold text-xl">{total} ETB</span>
        </div>
      )}

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <div className="grid grid-cols-1 gap-3">
        <Button 
            className="w-full py-3" 
            onClick={handleBooking}
            disabled={loading || total <= 0}
        >
            {loading ? 'Processing...' : 'Book Now'}
        </Button>
        <Button 
            variant="outline"
            className="w-full py-3" 
            onClick={handleAddToCart}
            disabled={loading || total <= 0}
        >
            Add to Cart
        </Button>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        You won't be charged yet
      </p>
    </div>
  );
}
