
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signInWithFacebook, logout as firebaseLogout } from '@/services/firebase';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'customer' | 'agent' | 'admin';
  avatar?: string;
  phoneNumber?: string;
  companyName?: string;
  licenseNumber?: string;
  isOnboardingComplete?: boolean;
  kycStatus?: 'pending' | 'processing' | 'verified' | 'failed';
  riskProfile?: 'Conservative' | 'Moderate' | 'Aggressive';
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
  completeOnboarding: (userData: Partial<User>) => void;
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
        // Check if user profile exists in localStorage
        const existingUser = localStorage.getItem(`user_${firebaseUser.uid}`);
        
        if (existingUser) {
          const userProfile = JSON.parse(existingUser);
          setUser(userProfile);
        } else {
          // New user from social login - create incomplete profile
          const userProfile: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
            type: 'customer',
            avatar: firebaseUser.photoURL || undefined,
            isOnboardingComplete: false,
            kycStatus: 'pending'
          };
          setUser(userProfile);
          
          // Redirect to onboarding for new users
          setTimeout(() => {
            window.location.href = '/onboard';
          }, 1000);
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
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
        type,
        isOnboardingComplete: true,
        kycStatus: 'verified'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem(`user_${mockUser.id}`, JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithGoogle();
      console.log('Google login result:', result);
      
      toast({
        title: "Google Login Successful",
        description: "Redirecting to complete your profile...",
      });
      return true;
    } catch (error: any) {
      console.error('Google login error:', error);
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
      console.log('Facebook login result:', result);
      
      toast({
        title: "Facebook Login Successful", 
        description: "Redirecting to complete your profile...",
      });
      return true;
    } catch (error: any) {
      console.error('Facebook login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Failed to login with Facebook",
        variant: "destructive",
      });
      return false;
    }
  };

  const completeOnboarding = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...userData,
        isOnboardingComplete: true,
        kycStatus: 'verified' as const // Auto-verify KYC for demo
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem(`user_${updatedUser.id}`, JSON.stringify(updatedUser));
      
      toast({
        title: "Onboarding Complete",
        description: "Your account has been verified successfully!",
      });
    }
  };

  const logout = async () => {
    try {
      await firebaseLogout();
      setUser(null);
      localStorage.removeItem('user');
      if (firebaseUser) {
        localStorage.removeItem(`user_${firebaseUser.uid}`);
      }
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
      completeOnboarding,
      isAuthenticated: !!user && user.isOnboardingComplete,
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
