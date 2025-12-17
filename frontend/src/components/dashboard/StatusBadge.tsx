import type { Booking } from '../../services/bookingService';

interface StatusBadgeProps {
  status: Booking['status'];
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    CONFIRMED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
    COMPLETED: 'bg-blue-100 text-blue-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
      {status}
    </span>
  );
}
