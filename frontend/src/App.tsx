import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import BrowsingPage from './pages/cars/BrowsingPage';
import CarDetailsPage from './pages/cars/CarDetailsPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import PaymentSuccessPage from './pages/checkout/PaymentSuccessPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
  
  return (
    <Router>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <Routes>
            
            {/* Auth Routes (No Layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Main Layout Routes */}
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cars" element={<BrowsingPage />} />
              <Route path="/cars/:id" element={<CarDetailsPage />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/payment/success" element={<PaymentSuccessPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/bookings" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>

          </Routes>
        </CartProvider>
      </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
