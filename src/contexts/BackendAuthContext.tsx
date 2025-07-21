import * as React from 'react';
import { authService } from '@/services/api/authService';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  riskProfile: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  riskProfile: string;
  investmentGoals: string[];
  timeHorizon: string;
  kycStatus: string;
  isActive: boolean;
  createdAt: string;
}

interface BackendAuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isKYCRequired: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    riskProfile: 'conservative' | 'moderate' | 'aggressive';
    investmentGoals: string[];
    timeHorizon: 'short-term' | 'medium-term' | 'long-term';
  }) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateKYCStatus: (status: 'PENDING' | 'APPROVED' | 'REJECTED') => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const BackendAuthContext = React.createContext<BackendAuthContextType | undefined>(undefined);

export const BackendAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isKYCRequired, setIsKYCRequired] = React.useState(false);
  const { toast } = useToast();

  const checkKYCStatus = (user: User | null) => {
    if (!user) return false;
    return user.kycStatus === 'PENDING' || user.kycStatus === 'REJECTED';
  };

  const handleAuthError = (error: any) => {
    if (error?.status === 401) {
      // Token expired, redirect to login
      authService.clearAuthToken();
      setUser(null);
      setProfile(null);
      window.location.href = '/';
      return;
    }
    
    if (error?.status === 403) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this resource.",
        variant: "destructive",
      });
      return;
    }
    
    if (error?.status === 429) {
      toast({
        title: "Rate Limit Reached",
        description: "Too many requests. Please try again later.",
        variant: "destructive",
      });
      return;
    }
  };

  const fetchUserProfile = async () => {
    try {
      const profile = await authService.getProfile();
      setProfile(profile);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      handleAuthError(error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      if (!authService.isAuthenticated()) {
        setLoading(false);
        return;
      }

      const authCheck = await authService.checkAuth();
      if (authCheck.success && authCheck.data) {
        setUser(authCheck.data);
        await fetchUserProfile();
      } else {
        authService.clearAuthToken();
        setUser(null);
        setProfile(null);
      }
    } catch (error: any) {
      console.error('Auth check failed:', error);
      handleAuthError(error);
      authService.clearAuthToken();
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  React.useEffect(() => {
    if (user) {
      const kycRequired = checkKYCStatus(user);
      setIsKYCRequired(kycRequired);
      
      if (kycRequired) {
        const currentPath = window.location.pathname;
        if (currentPath !== '/onboarding' && currentPath !== '/' && !currentPath.startsWith('/onboarding')) {
          window.location.href = '/onboarding';
        }
      }
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      
      setUser(response.user);
      await fetchUserProfile();
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      handleAuthError(error);
      return { error: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    riskProfile: 'conservative' | 'moderate' | 'aggressive';
    investmentGoals: string[];
    timeHorizon: 'short-term' | 'medium-term' | 'long-term';
  }) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      setUser(response.user);
      await fetchUserProfile();
      
      toast({
        title: "Account Created",
        description: "Welcome to SIP Brewery!",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      handleAuthError(error);
      return { error: error.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
      setUser(null);
      setProfile(null);
      setIsKYCRequired(false);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const updateKYCStatus = async (status: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    try {
      await authService.updateKYCStatus(status);
      
      // Update user state
      if (user) {
        setUser({ ...user, kycStatus: status });
      }
      
      if (status === 'APPROVED') {
        toast({
          title: "KYC Completed",
          description: "Your KYC verification has been completed successfully!",
        });
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    } catch (error: any) {
      console.error('Error updating KYC status:', error);
      handleAuthError(error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile();
    }
  };

  return (
    <BackendAuthContext.Provider value={{
      user,
      profile,
      loading,
      isKYCRequired,
      isAuthenticated: !!user,
      signIn,
      signUp,
      signOut,
      updateKYCStatus,
      refreshProfile,
    }}>
      {children}
    </BackendAuthContext.Provider>
  );
};

export const useBackendAuth = () => {
  const context = React.useContext(BackendAuthContext);
  if (!context) {
    throw new Error('useBackendAuth must be used within a BackendAuthProvider');
  }
  return context;
};