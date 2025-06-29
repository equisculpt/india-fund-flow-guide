
import { supabase } from '@/integrations/supabase/client';

export interface TestUser {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
    phone: string;
    user_type: string;
  };
}

export const TEST_CREDENTIALS = {
  email: 'test@sipbrewery.com',
  password: 'Test123456'
};

export const createTestUserSession = async (): Promise<TestUser> => {
  // Create a mock user session for testing
  const testUser: TestUser = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: TEST_CREDENTIALS.email,
    user_metadata: {
      full_name: 'Test User',
      phone: '+91-9876543210',
      user_type: 'customer'
    }
  };

  return testUser;
};

export const simulateTestLogin = async (email: string, password: string) => {
  if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
    const testUser = await createTestUserSession();
    
    // Store test session in localStorage for persistence
    localStorage.setItem('test_session', JSON.stringify({
      user: testUser,
      expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    
    return { user: testUser, error: null };
  }
  
  return { user: null, error: { message: 'Invalid test credentials' } };
};

export const getTestSession = () => {
  const stored = localStorage.getItem('test_session');
  if (!stored) return null;
  
  const session = JSON.parse(stored);
  if (Date.now() > session.expires_at) {
    localStorage.removeItem('test_session');
    return null;
  }
  
  return session;
};

export const clearTestSession = () => {
  localStorage.removeItem('test_session');
};
