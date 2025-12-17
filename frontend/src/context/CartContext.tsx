import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Car } from '../types/car';

export interface CartItem {
  id: string; // unique id for the cart item (e.g. carId + dates)
  car: Car;
  startDate: string;
  endDate: string;
  days: number;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const id = `${newItem.car.id}-${newItem.startDate}-${newItem.endDate}`;
    // Check if already exists? For now, we allow adding duplicates or we could just alert
    if (items.find(i => i.id === id)) {
      alert("Item already in cart!");
      setIsOpen(true);
      return;
    }
    
    setItems([...items, { ...newItem, id }]);
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, addToCart, removeFromCart, clearCart, toggleCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
