import { useState, useEffect } from 'react';
import { bookingService, type Booking } from '../../services/bookingService';
import BookingList from '../../components/dashboard/BookingList';
import { useAuth } from '../../context/AuthContext';
import { User, Calendar } from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [activeTab]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 px-4 font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar size={18} />
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User size={18} />
            Profile
          </button>
        </div>

        {/* Content */}
        {activeTab === 'bookings' && (
          <div>
            {loading ? (
              <div className="text-center py-12">Loading bookings...</div>
            ) : (
              <BookingList bookings={bookings} />
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="text-gray-900">{user?.username}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="text-gray-900">{user?.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="text-gray-900">{user?.phone || 'Not provided'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
