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
        <div key={booking.id} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1 w-full">
              {booking.car.image && (
                <div className="w-full md:w-32 h-40 md:h-32 shrink-0">
                  <img 
                    src={booking.car.image} 
                    alt={booking.car.model} 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary">
                    {booking.car.make} {booking.car.model}
                    </h3>
                    <div className="md:hidden self-start">
                        <StatusBadge status={booking.status} />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5 backdrop-blur-sm bg-gray-50 px-2 py-1 rounded-lg">
                    <Calendar size={14} className="text-primary" />
                    <span className="font-medium">{booking.start_date} - {booking.end_date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{booking.car.location.city}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Total Paid</span>
                    <span className="text-2xl font-black text-primary">{booking.total_price.toLocaleString()} ETB</span>
                  </div>
                  <button className="text-sm font-bold text-gray-900 hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">
                    View Receipt
                  </button>
                </div>
              </div>
            </div>
            {/* Desktop Status Badge */}
            <div className="hidden md:block">
              <StatusBadge status={booking.status} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
