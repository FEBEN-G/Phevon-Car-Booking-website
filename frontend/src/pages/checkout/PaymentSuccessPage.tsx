import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import { Button } from '../../components/ui/Button';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [error, setError] = useState('');

  // Chapa returns ?tx_ref=... param on success
  const txRef = searchParams.get('tx_ref');

  useEffect(() => {
    if (txRef) {
      verify(txRef);
    } else {
        // Just for demo if no ref
        setStatus('success');
    }
  }, [txRef]);

  const verify = async (ref: string) => {
    try {
      await paymentService.verifyChapaPayment(ref);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setError('Payment verification failed.');
      setStatus('failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      {status === 'verifying' && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Verifying Payment...</h2>
          <p className="text-gray-500">Please wait while we confirm your transaction.</p>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-500 mb-6">Your booking has been confirmed. A receipt has been sent to your email.</p>
          <div className="space-y-3">
             <Button className="w-full" onClick={() => navigate('/bookings')}>View My Bookings</Button>
             <Button variant="outline" className="w-full" onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      )}

      {status === 'failed' && (
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="text-red-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-500 mb-6">{error || 'Something went wrong with your payment.'}</p>
          <Button onClick={() => navigate('/checkout')}>Try Again</Button>
        </div>
      )}
    </div>
  );
}
