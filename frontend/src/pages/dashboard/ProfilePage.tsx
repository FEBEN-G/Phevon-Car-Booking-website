import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { User, Mail, Shield, X, Edit2 } from 'lucide-react';
import api from '../../services/api';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    first_name: '',
    last_name: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        // @ts-ignore
        phone: user.phone || '', 
        // @ts-ignore
        first_name: user.first_name || '',
        // @ts-ignore
        last_name: user.last_name || ''
      });
    }
  }, [user]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('avatar', file);
      
      setUploading(true);
      try {
        const response = await api.patch('auth/me/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log("Upload success:", response.data);
        window.location.reload(); 
      } catch (error: any) {
        console.error("Failed to upload image. URL called:", `${api.defaults.baseURL}auth/me/`);
        console.error("Error details:", error.response || error);
        alert(`Failed to upload image (Status: ${error.response?.status}). Please check the console for details.`);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.patch('auth/me/', formData);
      console.log("Profile update success:", response.data);
      window.location.reload(); 
    } catch (error: any) {
      console.error("Failed to update profile. Details:", error.response || error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  if (!user) return <div className="pt-32 text-center">Please log in to view your profile.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 h-32 md:h-48 relative">
            <div className="absolute -bottom-12 md:-bottom-16 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
              <div className="relative group w-28 h-28 md:w-40 md:h-40 bg-white rounded-full p-1.5 md:p-2 shadow-2xl">
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-primary overflow-hidden relative">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                        <User size={48} className="md:w-16 md:h-16" />
                    )}
                    
                    {/* Upload Overlay */}
                    <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                        <Input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange}
                            disabled={uploading}
                        />
                        <div className="flex flex-col items-center gap-1">
                            <Edit2 size={16} className="text-white" />
                            <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                {uploading ? '...' : 'Edit'}
                            </span>
                        </div>
                    </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-16 md:pt-20 pb-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-center gap-6 text-center md:text-left">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900">{user.username}</h1>
              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1 font-medium">
                <Mail size={14} className="text-primary" /> {user.email}
              </p>
            </div>
            
            {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="flex items-center gap-2 rounded-full px-8 border-gray-200">
                    <Edit2 size={16} /> Edit Profile
                </Button>
            ) : (
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 p-2">
                    <X size={24} />
                </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Stats/Info */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                        <Shield className="text-primary" size={16} /> Account Security
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-gray-500 text-sm">Status</span>
                            <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">Verified</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-gray-500 text-sm">Auth</span>
                            <span className="text-gray-900 font-bold text-xs">Standard / Google</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Form/Details */}
            <div className="md:col-span-2">
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Personal Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Username</label>
                                <Input 
                                    disabled={!isEditing} 
                                    value={formData.username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, username: e.target.value})}
                                    className="bg-gray-50/50 border-gray-100 rounded-xl"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                <Input 
                                    disabled={true}
                                    value={formData.email}
                                    className="bg-gray-100/50 cursor-not-allowed border-gray-100 rounded-xl text-gray-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">First Name</label>
                                <Input 
                                    disabled={!isEditing} 
                                    placeholder="Not set"
                                    value={formData.first_name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, first_name: e.target.value})}
                                    className="bg-gray-50/50 border-gray-100 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Last Name</label>
                                <Input 
                                    disabled={!isEditing} 
                                    placeholder="Not set"
                                    value={formData.last_name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, last_name: e.target.value})}
                                    className="bg-gray-50/50 border-gray-100 rounded-xl"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                                <Input 
                                    disabled={!isEditing} 
                                    placeholder="Add phone number"
                                    value={formData.phone}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, phone: e.target.value})}
                                    className="bg-gray-50/50 border-gray-100 rounded-xl"
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
                                <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="sm:w-32 rounded-xl">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="sm:w-48 rounded-xl shadow-lg shadow-primary/20">
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
