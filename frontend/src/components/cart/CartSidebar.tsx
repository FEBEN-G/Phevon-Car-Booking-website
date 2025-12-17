import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
  const { isOpen, toggleCart, items, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={toggleCart}
      />
      
      {/* Sidebar panel */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full flex flex-col bg-white shadow-xl animate-in slide-in-from-right duration-300">
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Your Cart ({items.length})</h2>
            <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                    <p>Your cart is empty.</p>
                </div>
            ) : (
                items.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        {item.car.image && (
                            <img src={item.car.image} alt={item.car.model} className="w-20 h-20 object-cover rounded-lg" />
                        )}
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{item.car.make} {item.car.model}</h4>
                            <p className="text-sm text-gray-500">{item.startDate} - {item.endDate}</p>
                            <p className="text-xs text-gray-400 mt-1">{item.days} days x {item.car.daily_rate} ETB</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-bold text-primary">{item.totalPrice} ETB</span>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-400 hover:text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Total</span>
                <span className="text-2xl font-bold text-gray-900">{total} ETB</span>
              </div>
              <Button className="w-full py-3 flex items-center justify-center gap-2" onClick={handleCheckout}>
                Checkout <ArrowRight size={18} />
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
