import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { toggleCart, items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      setIsMenuOpen(false);
      navigate('/');
    }
  };

  const navLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Browse Cars', path: '/cars' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50 h-20 transition-all duration-300 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <Link 
            to="/" 
            className="text-2xl md:text-3xl font-display font-bold text-primary tracking-tight"
            onClick={() => setIsMenuOpen(false)}
        >
          Phevon
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
                key={link.path} 
                to={link.path} 
                className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={toggleCart} className="relative p-2 text-gray-600 hover:text-primary transition-colors">
            <ShoppingBag size={22} />
            {items.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                {items.length}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/bookings" className="hidden md:block text-sm font-medium text-gray-600 hover:text-primary">
                My Bookings
              </Link>
              <div className="flex items-center gap-2 pl-2 md:pl-4 md:border-l border-gray-200">
                <Link to="/profile" className="flex items-center gap-2 hover:bg-gray-50 rounded-full pr-3 py-1 transition-colors group">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors overflow-hidden">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon size={16} />
                        )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:block group-hover:text-primary transition-colors">{user.username}</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="hidden sm:flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors ml-4 font-medium"
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
             <div className="flex items-center gap-2 md:gap-3">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-primary">
                    Log in
                </Link>
                <Button className="scale-90 md:scale-100" onClick={() => navigate('/register')}>
                    Sign up
                </Button>
             </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 animate-slide-in">
          <div className="flex flex-col p-6 gap-6">
            {navLinks.map(link => (
                <Link 
                    key={link.path} 
                    to={link.path} 
                    className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {link.label}
                </Link>
            ))}
            {user && (
                <>
                    <Link 
                        to="/bookings" 
                        className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        My Bookings
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="text-2xl font-bold text-red-500 flex items-center gap-3"
                    >
                        <LogOut size={24} />
                        Logout
                    </button>
                </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
