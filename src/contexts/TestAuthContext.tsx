
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TEST_CREDENTIALS, simulateTestLogin, getTestSession, clearTestSession, TestUser } from '@/services/testAuth';
import { TEST_USER_DATA } from '@/services/testData';
import { useToast } from '@/hooks/use-toast';

interface TestAuthContextType {
  user: TestUser | null;
  profile: any | null;
  loading: boolean;
  isTestMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  testCredentials: typeof TEST_CREDENTIALS;
}

const TestAuthContext = createContext<TestAuthContextType | undefined>(undefined);

export const TestAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TestUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing test session
    const session = getTestSession();
    if (session) {
      setUser(session.user);
      setProfile(TEST_USER_DATA.profile);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { user: testUser, error } = await simulateTestLogin(email, password);
      
      if (error) {
        return { error };
      }

      setUser(testUser);
      setProfile(TEST_USER_DATA.profile);
      
      toast({
        title: "Test Login Successful",
        description: "Welcome to the test environment!",
      });
      
      return { error: null };
    } catch (error) {
      console.error('Test login error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    clearTestSession();
    setUser(null);
    setProfile(null);
    
    toast({
      title: "Logged Out",
      description: "Test session ended.",
    });
  };

  return (
    <TestAuthContext.Provider value={{
      user,
      profile,
      loading,
      isTestMode: true,
      signIn,
      signOut,
      testCredentials: TEST_CREDENTIALS,
    }}>
      {children}
    </TestAuthContext.Provider>
  );
};

export const useTestAuth = () => {
  const context = useContext(TestAuthContext);
  if (!context) {
    throw new Error('useTestAuth must be used within a TestAuthProvider');
  }
  return context;
};
