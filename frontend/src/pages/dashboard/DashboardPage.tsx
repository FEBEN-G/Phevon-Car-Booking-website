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
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">My Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-8 border-b border-gray-200 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 px-4 font-medium transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
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
            className={`pb-3 px-4 font-medium transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
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
          <div className="animate-fade-in">
            {loading ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-gray-500">Loading bookings...</p>
              </div>
            ) : (
              <BookingList bookings={bookings} />
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <h2 className="text-xl font-bold mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Username</label>
                <div className="text-gray-900 font-bold text-lg">{user?.username}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Email</label>
                <div className="text-gray-900 font-bold text-lg break-all">{user?.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Phone</label>
                <div className="text-gray-900 font-bold text-lg">{user?.phone || 'Not provided'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
