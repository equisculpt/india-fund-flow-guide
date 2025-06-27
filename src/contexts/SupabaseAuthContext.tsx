
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, userData: { full_name: string; phone?: string; user_type?: 'customer' | 'agent' }) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  verifyPAN: (panNumber: string) => Promise<{ success: boolean; error?: string }>;
  completeTwoFactor: () => Promise<{ success: boolean; error?: string }>;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

export const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check if 2FA is required
          await checkTwoFactorStatus(session.user.id);
          // Fetch user profile
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setTwoFactorRequired(false);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkTwoFactorStatus(session.user.id);
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else if (data) {
        // Type cast the user_type to ensure it matches our union type
        const typedProfile: UserProfile = {
          ...data,
          user_type: data.user_type as 'customer' | 'agent' | 'admin',
          kyc_status: data.kyc_status as 'pending' | 'verified' | 'rejected'
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
      // Check if user has a verified PAN number
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
      const redirectUrl = `${window.location.origin}/`;
      
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
      const redirectUrl = `${window.location.origin}/`;
      
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
      // Update profile with PAN number
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ pan_number: panNumber })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setTwoFactorRequired(false);
      
      // Refresh profile
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

  return (
    <SupabaseAuthContext.Provider value={{
      user,
      profile,
      session,
      loading,
      twoFactorRequired,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      verifyPAN,
      completeTwoFactor,
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
