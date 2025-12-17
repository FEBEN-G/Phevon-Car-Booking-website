import { type ReactNode } from 'react';
import Navbar from './Navbar';
import TopBar from './TopBar';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';
import ChatWidget from '../chat/ChatWidget';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <TopBar />
        <Navbar />
      </header>
      <CartSidebar />
      <ChatWidget />
      <main className="pt-32 pb-10 min-h-screen flex flex-col">
        <div className="flex-grow">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
