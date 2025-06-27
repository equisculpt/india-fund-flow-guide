import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
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
  signup: (email: string, password: string, userData: { full_name: string; phone: string; user_type: 'customer' | 'agent' }) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithFacebook: () => Promise<boolean>;
  logout: () => Promise<void>;
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
      console.log('Firebase auth state changed:', firebaseUser?.email);
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
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            type: 'customer',
            avatar: firebaseUser.photoURL || undefined,
            isOnboardingComplete: false,
            kycStatus: 'pending'
          };
          setUser(userProfile);
          localStorage.setItem(`user_${firebaseUser.uid}`, JSON.stringify(userProfile));
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
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email login successful:', result.user.email);
      
      // Create or update user profile
      const userProfile: User = {
        id: result.user.uid,
        email: result.user.email || '',
        name: result.user.displayName || email.split('@')[0],
        type,
        isOnboardingComplete: true,
        kycStatus: 'verified'
      };
      
      setUser(userProfile);
      localStorage.setItem(`user_${result.user.uid}`, JSON.stringify(userProfile));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userProfile.name}!`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (email: string, password: string, userData: { 
    full_name: string; 
    phone: string; 
    user_type: 'customer' | 'agent' 
  }): Promise<boolean> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Email signup successful:', result.user.email);
      
      // Create user profile
      const userProfile: User = {
        id: result.user.uid,
        email: result.user.email || '',
        name: userData.full_name,
        type: userData.user_type,
        phoneNumber: userData.phone,
        isOnboardingComplete: true,
        kycStatus: 'pending'
      };
      
      setUser(userProfile);
      localStorage.setItem(`user_${result.user.uid}`, JSON.stringify(userProfile));
      
      toast({
        title: "Account Created",
        description: `Welcome to SIP Brewery, ${userProfile.name}!`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithGoogle();
      console.log('Google login result:', result.user.email);
      
      toast({
        title: "Google Login Successful",
        description: "Welcome to SIP Brewery!",
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
      console.log('Facebook login result:', result.user.email);
      
      toast({
        title: "Facebook Login Successful", 
        description: "Welcome to SIP Brewery!",
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
        kycStatus: 'verified' as const
      };
      setUser(updatedUser);
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
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <EnhancedAuthContext.Provider value={{
      user,
      firebaseUser,
      login,
      signup,
      loginWithGoogle,
      loginWithFacebook,
      logout,
      completeOnboarding,
      isAuthenticated: !!user && (user.isOnboardingComplete ?? false),
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
