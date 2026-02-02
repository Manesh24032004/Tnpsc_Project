import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '@/services/api/authService';

interface User {
  _id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isDemoMode: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const userId = authService.getUserId();
      if (userId) {
        try {
          const response = await authService.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
            // Check if admin
            const adminStatus = await authService.isAdmin(userId);
            setIsAdmin(adminStatus);
          } else {
            authService.clearUserData();
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          authService.clearUserData();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await authService.register({ email, password, name });
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAdmin(false); // New users are not admin by default
        return { error: null };
      }
      return { error: response.error || 'Registration failed' };
    } catch (error: any) {
      return { error: error.message || 'Registration failed' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        setUser(response.data.user);
        // Check if admin
        const adminStatus = await authService.isAdmin(response.data.user._id);
        setIsAdmin(adminStatus);
        return { error: null };
      }
      return { error: response.error || 'Login failed' };
    } catch (error: any) {
      return { error: error.message || 'Login failed' };
    }
  };

  const signOut = async () => {
    await authService.logout();
    setUser(null);
    setIsAdmin(false);
    setIsDemoMode(false);
  };

  const demoLogin = () => {
    setIsDemoMode(true);
    setIsAdmin(true);
    setUser({
      _id: 'demo-admin',
      email: 'admin@demo.com',
      name: 'Demo Admin'
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, isDemoMode, signUp, signIn, signOut, demoLogin }}>
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
