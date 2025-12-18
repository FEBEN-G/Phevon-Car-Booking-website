import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';
import type { User, AuthResponse } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email?: string, password?: string, googleToken?: string) => Promise<void>;
  register: (username?: string, email?: string, password?: string, phone?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await api.get('auth/me/');
        setUser(response.data);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('accessToken');
      }
    }
    setIsLoading(false);
  };

  const login = async (email?: string, password?: string, googleToken?: string) => {
    // Standard login
    if (email && password) {
        const response = await api.post<AuthResponse>('auth/login/', { 
            username: email, 
            password 
        });
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
    } 
    // Google Login
    else if (googleToken) {
        try {
            const response = await api.post<AuthResponse>('auth/google/', { 
                token: googleToken 
            });
            const { access, refresh } = response.data;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            
            // Wait a moment for logic to settle if needed, then check auth
        } catch (error) {
            console.error("Google Login failed on backend:", error);
            throw error;
        }
    }
    
    await checkAuth();
  };

  const register = async (username?: string, email?: string, password?: string, phone?: string) => {
    const data = { username, email, password, phone };
    await api.post('auth/register/', data);
    // No auto-login because activation is required
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
