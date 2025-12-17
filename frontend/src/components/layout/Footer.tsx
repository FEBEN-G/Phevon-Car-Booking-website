import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-display font-bold text-white tracking-tight">
              Phevon
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Experience the thrill of the drive with our premium fleet of vehicles. 
              Luxury, comfort, and style for every journey.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-display">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-primary transition-colors hover:pl-2 duration-300 block">Browse Cars</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors hover:pl-2 duration-300 block">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors hover:pl-2 duration-300 block">Contact Support</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors hover:pl-2 duration-300 block">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-display">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone size={18} className="text-primary" />
                </div>
                <span className="mt-1.5">+251 93 731 8894</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail size={18} className="text-primary" />
                </div>
                <span className="mt-1.5">phevondigitalsolutions@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <MapPin size={18} className="text-primary" />
                </div>
                <span className="mt-1.5">Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-display">Newsletter</h3>
            <p className="text-gray-400 mb-4 text-sm">Subscribe to get the latest offers and updates.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                />
                <button type="submit" className="absolute right-2 top-2 bg-primary p-1.5 rounded-lg text-white hover:bg-primary-hover transition-colors shadow-lg hover:shadow-primary/25">
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Phevon Car Rental. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
