import { Phone, Mail } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-dark text-white py-2 px-6 text-sm font-medium z-50 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <a href="tel:+251937318894" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone size={14} className="text-primary" />
            <span>+251 937 318 894</span>
          </a>
          <a href="mailto:phevondigitalsolutions@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail size={14} className="text-primary" />
            <span>phevondigitalsolutions@gmail.com</span>
          </a>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs text-gray-400">
           <span>Addis Ababa, Ethiopia</span>
        </div>
      </div>
    </div>
  );
}
