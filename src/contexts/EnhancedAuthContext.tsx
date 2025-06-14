
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signInWithFacebook, logout as firebaseLogout } from '@/services/firebase';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'customer' | 'agent' | 'admin';
  avatar?: string;
  phoneNumber?: string;
  companyName?: string;
  licenseNumber?: string;
  whitelabelConfig?: {
    domain: string;
    companyName: string;
    logo: string;
    primaryColor: string;
  };
}

interface EnhancedAuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, password: string, type: 'customer' | 'agent') => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithFacebook: () => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const EnhancedAuthContext = createContext<EnhancedAuthContextType | undefined>(undefined);

export const EnhancedAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Create or fetch user profile
        const userProfile: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
          type: 'customer', // Default type, can be updated based on database
          avatar: firebaseUser.photoURL || undefined,
        };
        setUser(userProfile);
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, type: 'customer' | 'agent'): Promise<boolean> => {
    try {
      // For now, we'll simulate login since Firebase email/password needs setup
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        type
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithGoogle();
      toast({
        title: "Login Successful",
        description: "Welcome! You're now logged in with Google.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to login with Google",
        variant: "destructive",
      });
      return false;
    }
  };

  const loginWithFacebook = async (): Promise<boolean> => {
    try {
      const result = await signInWithFacebook();
      toast({
        title: "Login Successful",
        description: "Welcome! You're now logged in with Facebook.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to login with Facebook",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await firebaseLogout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <EnhancedAuthContext.Provider value={{
      user,
      firebaseUser,
      login,
      loginWithGoogle,
      loginWithFacebook,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </EnhancedAuthContext.Provider>
  );
};

export const useEnhancedAuth = () => {
  const context = useContext(EnhancedAuthContext);
  if (!context) {
    throw new Error('useEnhancedAuth must be used within an EnhancedAuthProvider');
  }
  return context;
};
