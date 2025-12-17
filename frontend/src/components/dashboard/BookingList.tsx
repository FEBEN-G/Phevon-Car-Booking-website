import type { Booking } from '../../services/bookingService';
import StatusBadge from './StatusBadge';
import { Calendar, MapPin } from 'lucide-react';

interface BookingListProps {
  bookings: Booking[];
}

export default function BookingList({ bookings }: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">No bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex gap-4 flex-1">
              {booking.car.image && (
                <img 
                  src={booking.car.image} 
                  alt={booking.car.model} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">
                  {booking.car.make} {booking.car.model}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{booking.start_date} - {booking.end_date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{booking.car.location.city}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-bold text-primary">{booking.total_price} ETB</span>
                </div>
              </div>
            </div>
            <div>
              <StatusBadge status={booking.status} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
