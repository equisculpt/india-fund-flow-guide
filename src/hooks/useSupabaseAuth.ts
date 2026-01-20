
import { useEffect, useState } from 'react';
import { mockDb, mockProfiles } from '@/services/mockDatabase';

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

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock: simulate getting session from localStorage
    const mockSession = localStorage.getItem('mock_auth_session');
    if (mockSession) {
      try {
        const parsed = JSON.parse(mockSession);
        setUser(parsed.user);
        if (parsed.user) {
          fetchProfile(parsed.user.id);
        }
      } catch {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      // Use mock profiles data directly
      const data = mockProfiles.find(p => p.id === userId);

      if (data) {
        const typedProfile: UserProfile = {
          id: data.id,
          user_type: data.user_type as 'customer' | 'agent' | 'admin',
          full_name: data.full_name,
          phone: data.phone,
          pan_number: undefined,
          kyc_status: data.kyc_status,
          referral_code: data.referral_code,
          commission_rate: data.commission_rate,
          is_active: data.is_active,
          created_at: data.created_at
        };
        setProfile(typedProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Mock sign in - find user by email in mock data
    const matchingProfile = mockProfiles.find(p => 
      p.full_name.toLowerCase().includes(email.split('@')[0].toLowerCase())
    );
    
    if (matchingProfile) {
      const mockUser = { id: matchingProfile.id, email };
      setUser(mockUser);
      localStorage.setItem('mock_auth_session', JSON.stringify({ user: mockUser }));
      await fetchProfile(matchingProfile.id);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signUp = async (email: string, password: string, userData: {
    full_name: string;
    phone: string;
    user_type: 'customer' | 'agent' | 'admin';
  }) => {
    // Mock sign up
    const newId = `user-${Date.now()}`;
    const newProfile = {
      id: newId,
      full_name: userData.full_name,
      phone: userData.phone,
      user_type: userData.user_type,
      kyc_status: 'pending',
      is_active: true,
      created_at: new Date().toISOString()
    };

    await mockDb.insert('profiles', newProfile);
    
    const mockUser = { id: newId, email };
    setUser(mockUser);
    localStorage.setItem('mock_auth_session', JSON.stringify({ user: mockUser }));
    
    return { user: mockUser };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('mock_auth_session');
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin: profile?.user_type === 'admin',
    isAgent: profile?.user_type === 'agent',
    isCustomer: profile?.user_type === 'customer',
  };
};
