
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  id: string;
  full_name: string;
  phone?: string;
  pan_number?: string;
  user_type: 'customer' | 'agent' | 'admin';
  kyc_status: 'pending' | 'verified' | 'rejected';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SupabaseAuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  twoFactorRequired: boolean;
  isKYCRequired: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, userData: { full_name: string; phone?: string; user_type?: 'customer' | 'agent' }) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  verifyPAN: (panNumber: string) => Promise<{ success: boolean; error?: string }>;
  completeTwoFactor: () => Promise<{ success: boolean; error?: string }>;
  updateKYCStatus: (status: 'pending' | 'verified' | 'rejected') => Promise<void>;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

export const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [isKYCRequired, setIsKYCRequired] = useState(false);
  const { toast } = useToast();

  // KYC Status Check
  const checkKYCStatus = (profile: UserProfile | null) => {
    if (!profile) return false;
    return profile.kyc_status === 'pending' || profile.kyc_status === 'rejected';
  };

  // Handle auth state changes and KYC redirection
  const handleAuthStateChange = async (session: Session | null) => {
    setSession(session);
    setUser(session?.user ?? null);
    
    if (session?.user) {
      await fetchProfile(session.user.id);
    } else {
      setProfile(null);
      setTwoFactorRequired(false);
      setIsKYCRequired(false);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await handleAuthStateChange(session);
        } else if (event === 'SIGNED_OUT') {
          await handleAuthStateChange(null);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthStateChange(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Update KYC required status when profile changes
  useEffect(() => {
    if (profile) {
      const kycRequired = checkKYCStatus(profile);
      setIsKYCRequired(kycRequired);
      
      if (kycRequired) {
        // Redirect to onboarding if KYC is required
        const currentPath = window.location.pathname;
        if (currentPath !== '/onboarding' && currentPath !== '/' && !currentPath.startsWith('/onboarding')) {
          window.location.href = '/onboarding';
        }
      }
    }
  }, [profile]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        
        // If profile doesn't exist, create one for new users
        if (error.code === 'PGRST116') {
          const { data: userData} = await supabase.auth.getUser();
          if (userData.user) {
            const newProfile = {
              id: userData.user.id,
              full_name: userData.user.user_metadata?.full_name || userData.user.user_metadata?.name || '',
              phone: userData.user.user_metadata?.phone || '',
              user_type: 'customer' as const,
              kyc_status: 'pending' as const,
              is_active: true
            };

            const { error: insertError } = await supabase
              .from('profiles')
              .insert(newProfile);

            if (!insertError) {
              setProfile(newProfile);
              return;
            }
          }
        }
        setProfile(null);
      } else if (data) {
        const typedProfile: UserProfile = {
          ...data,
          user_type: (data.user_type as 'customer' | 'agent' | 'admin') || 'customer',
          kyc_status: (data.kyc_status as 'pending' | 'verified' | 'rejected') || 'pending'
        };
        setProfile(typedProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  const checkTwoFactorStatus = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('pan_number')
        .eq('id', userId)
        .single();
      
      if (!profile?.pan_number) {
        setTwoFactorRequired(true);
      } else {
        setTwoFactorRequired(false);
      }
    } catch (error) {
      console.error('Error checking 2FA status:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) return { error };
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as AuthError };
    }
  };

  const signUp = async (email: string, password: string, userData: {
    full_name: string;
    phone?: string;
    user_type?: 'customer' | 'agent';
  }) => {
    try {
      const redirectUrl = `${window.location.origin}/onboarding`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: userData.full_name,
            phone: userData.phone,
            user_type: userData.user_type || 'customer',
          }
        }
      });

      if (error) return { error };

      toast({
        title: "Account Created",
        description: "Please check your email to verify your account.",
      });
      
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error as AuthError };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const redirectUrl = `${window.location.origin}/onboarding`;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });

      return { error };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      } else {
        toast({
          title: "Logged Out",
          description: "You have been successfully logged out.",
        });
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const verifyPAN = async (panNumber: string) => {
    if (!user) {
      return { success: false, error: 'No active session' };
    }

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ pan_number: panNumber })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setTwoFactorRequired(false);
      await fetchProfile(user.id);
      
      toast({
        title: "PAN Verified",
        description: "Your PAN number has been verified successfully.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('PAN verification error:', error);
      return { success: false, error: error.message };
    }
  };

  const completeTwoFactor = async () => {
    setTwoFactorRequired(false);
    
    toast({
      title: "Login Complete",
      description: "You are now fully authenticated.",
    });

    return { success: true };
  };

  const updateKYCStatus = async (status: 'pending' | 'verified' | 'rejected') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ kyc_status: status })
        .eq('id', user.id);

      if (error) throw error;

      await fetchProfile(user.id);
      
      if (status === 'verified') {
        toast({
          title: "KYC Completed",
          description: "Your KYC verification has been completed successfully!",
        });
        
        // Redirect to main app after successful KYC
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating KYC status:', error);
    }
  };

  return (
    <SupabaseAuthContext.Provider value={{
      user,
      profile,
      session,
      loading,
      twoFactorRequired,
      isKYCRequired,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      verifyPAN,
      completeTwoFactor,
      updateKYCStatus,
    }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext);
  if (!context) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};
