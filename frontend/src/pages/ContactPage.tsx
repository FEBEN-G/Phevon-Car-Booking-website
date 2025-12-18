import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import api from '../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        await api.post('auth/contact/', formData);
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
        console.error(err);
        setError('Failed to send message. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Have questions about our fleet or services? We're here to help you 24/7.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Call Us</p>
                                <a href="tel:+251937318894" className="font-semibold text-gray-900 hover:text-primary transition-colors">
                                    +251 937 318 894
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Email Us</p>
                                <a href="mailto:phevondigitalsolutions@gmail.com" className="font-semibold text-gray-900 hover:text-primary transition-colors break-all">
                                    phevondigitalsolutions@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Visit Us</p>
                                <p className="font-semibold text-gray-900">
                                    Bole, Addis Ababa<br />Ethiopia
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
                    
                    {success ? (
                        <div className="bg-green-50 text-green-700 p-6 rounded-xl border border-green-200 text-center py-12">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <Send size={32} />
                            </div>
                            <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                            <p>Thank you for contacting us. We will get back to you shortly.</p>
                            <button 
                                onClick={() => setSuccess(false)}
                                className="mt-6 text-sm font-semibold hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <Input 
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <Input 
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <Input 
                                    required
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea 
                                    required
                                    rows={6}
                                    className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <Button 
                                type="submit" 
                                className="w-full md:w-auto px-10 py-4 text-lg"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
