
import React, { createContext, useContext, useState } from 'react';
import { mockProfiles } from '@/services/mockDatabase';

interface UserProfile {
  id: string;
  user_type: 'customer' | 'agent' | 'admin';
  full_name: string;
  phone?: string;
  pan_number?: string;
  kyc_status: string;
  referral_code?: string;
  commission_rate?: number;
  is_active: boolean;
  created_at: string;
}

interface MockUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: MockUser | null;
  profile: UserProfile | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: { full_name: string; phone: string; user_type: 'customer' | 'agent' }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: any | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading] = useState(false);

  const signIn = async (email: string, password: string) => {
    // Mock sign in for prototype
    const mockUser = mockProfiles.find(p => p.email === email);
    if (mockUser) {
      setUser({ id: mockUser.id, email: mockUser.email || '' });
      setProfile({
        id: mockUser.id,
        user_type: mockUser.user_type,
        full_name: mockUser.full_name,
        phone: mockUser.phone,
        kyc_status: mockUser.kyc_status,
        referral_code: mockUser.referral_code,
        commission_rate: mockUser.commission_rate,
        is_active: mockUser.is_active,
        created_at: mockUser.created_at
      });
      setSession({ user: mockUser });
      return { error: null };
    }
    return { error: { message: 'Invalid credentials' } };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    // Mock sign up for prototype
    const newUser = {
      id: `user-${Date.now()}`,
      email
    };
    setUser(newUser);
    setProfile({
      id: newUser.id,
      user_type: userData.user_type,
      full_name: userData.full_name,
      phone: userData.phone,
      kyc_status: 'pending',
      is_active: true,
      created_at: new Date().toISOString()
    });
    return { error: null };
  };

  const signInWithGoogle = async () => {
    // Mock Google sign in for prototype
    const mockUser = mockProfiles[0];
    setUser({ id: mockUser.id, email: mockUser.email || '' });
    setProfile({
      id: mockUser.id,
      user_type: mockUser.user_type,
      full_name: mockUser.full_name,
      phone: mockUser.phone,
      kyc_status: mockUser.kyc_status,
      is_active: mockUser.is_active,
      created_at: mockUser.created_at
    });
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
