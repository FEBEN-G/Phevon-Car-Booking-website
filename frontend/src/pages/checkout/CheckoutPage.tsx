import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { paymentService } from '../../services/paymentService';

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/cars')}>Browse Cars</Button>
      </div>
    );
  }

  const handlePayment = async () => {
    // 1. Create bookings for all items
    // For simplicity MVP we initiate payment for the first item only or all?
    // Current backend payment model links to ONE booking. 
    // Let's assume we do 1 item for now or loop.
    
    // Improving for Cart: Ideally we create a 'Order' that contains multiple bookings
    // But for this MVP let's just pick the first item to demonstrate.
    if (items.length === 0) return;
    
    const item = items[0]; 
    
    try {
        // Create booking first
        const booking = await bookingService.createBooking({
            car: item.car.id,
            start_date: item.startDate,
            end_date: item.endDate
        });
        
        // Initiate Payment
        const payment = await paymentService.initiatePayment(booking.id, 'CHAPA');
        
        // Redirect
        if (payment.payment_url) {
            // Save tx_ref to verify later if needed
            window.location.href = payment.payment_url;
        } else {
             alert('Payment initiation failed');
        }

    } catch (error) {
        console.error(error);
        alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10 relative px-2">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-0"></div>
          {[1, 2, 3].map((s) => (
            <div 
                key={s}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10 font-bold transition-all ${
                    step >= s ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-gray-200 text-gray-500'
                }`}
            >
                {s}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Step 1: Review */}
                {step === 1 && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                        <h2 className="text-xl font-bold mb-4">Review Your Booking</h2>
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                    <h3 className="font-bold text-gray-900">{item.car.make} {item.car.model}</h3>
                                    <p className="text-sm text-gray-500">{item.startDate} to {item.endDate} ({item.days} days)</p>
                                    <p className="font-bold text-primary mt-1">{item.totalPrice.toLocaleString()} ETB</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Details */}
                {step === 2 && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 animate-fade-in">
                        <h2 className="text-xl font-bold mb-4">Driver Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Full Name" placeholder="John Doe" />
                            <Input label="Email Address" type="email" placeholder="john@example.com" />
                            <Input label="Phone Number" type="tel" placeholder="+251 9..." />
                            <Input label="Driver's License Number" placeholder="DL-123456" />
                        </div>
                    </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 animate-fade-in">
                        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                        <div className="space-y-3">
                             <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex items-center justify-between cursor-pointer">
                                <span className="font-bold text-primary">Chapa (Ethiopian)</span>
                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                             </div>
                             <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between opacity-50 cursor-not-allowed">
                                <span className="font-medium text-gray-500">PayPal (International) - Coming Soon</span>
                                <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                             </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mt-8">
                    {step > 1 ? (
                        <Button variant="outline" onClick={() => setStep(step - 1)} className="px-8">Back</Button>
                    ) : <div></div>}
                    
                    {step < 3 ? (
                        <Button onClick={() => setStep(step + 1)} className="px-8">Continue</Button>
                    ) : (
                        <Button onClick={handlePayment} className="px-10">Place Order</Button>
                    )}
                </div>

            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                     <h3 className="font-bold text-gray-900 mb-6 text-lg">Order Summary</h3>
                     <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-medium">{total.toLocaleString()} ETB</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-600">
                            <span>Tax (15%)</span>
                            <span className="font-medium">{(total * 0.15).toLocaleString()} ETB</span>
                        </div>
                     </div>
                     <div className="border-t border-gray-100 pt-4 mb-6">
                        <div className="flex justify-between items-center font-bold text-2xl text-primary">
                            <span>Total</span>
                            <span>{(total * 1.15).toLocaleString()} ETB</span>
                        </div>
                     </div>
                     <p className="text-xs text-gray-400 text-center">By placing an order, you agree to our Terms of Service.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
