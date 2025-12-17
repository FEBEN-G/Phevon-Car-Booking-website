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
        await api.patch('/auth/me/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        window.location.reload(); 
      } catch (error) {
        console.error("Failed to upload image", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch('/auth/me/', formData);
      window.location.reload(); 
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  if (!user) return <div className="pt-32 text-center">Please log in to view your profile.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="bg-primary/10 h-32 md:h-48 relative">
            <div className="absolute -bottom-16 left-8 md:left-12">
              <div className="relative group w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center text-primary overflow-hidden relative">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                        <User size={64} />
                    )}
                    
                    {/* Upload Overlay */}
                    <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange}
                            disabled={uploading}
                        />
                        <span className="text-white text-xs font-medium px-2 py-1 bg-black/20 rounded-full">
                            {uploading ? 'Uploading...' : 'Change Photo'}
                        </span>
                    </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-8 px-8 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <Mail size={14} /> {user.email}
              </p>
            </div>
            
            {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="flex items-center gap-2">
                    <Edit2 size={16} /> Edit Profile
                </Button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Stats/Info */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="text-primary" size={18} /> Account Status
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Member Since</span>
                            <span className="font-medium">Dec 2024</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Verification</span>
                            <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full text-xs">Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Form/Details */}
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                        {isEditing && (
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                <Input 
                                    disabled={!isEditing} 
                                    value={formData.username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <Input 
                                    disabled={true}
                                    value={formData.email}
                                    className="bg-gray-50 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                <Input 
                                    disabled={!isEditing} 
                                    placeholder="Not set"
                                    value={formData.first_name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, first_name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                <Input 
                                    disabled={!isEditing} 
                                    placeholder="Not set"
                                    value={formData.last_name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, last_name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <Input 
                                    disabled={!isEditing} 
                                    placeholder="Add phone number"
                                    value={formData.phone}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
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
