
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

  console.log('Created test user session:', testUser);
  return testUser;
};

export const simulateTestLogin = async (email: string, password: string) => {
  console.log('Attempting test login with:', { email, password });
  
  if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
    const testUser = await createTestUserSession();
    
    // Store test session in localStorage for persistence
    const sessionData = {
      user: testUser,
      expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    
    localStorage.setItem('test_session', JSON.stringify(sessionData));
    console.log('Test session stored:', sessionData);
    
    return { user: testUser, error: null };
  }
  
  console.log('Invalid test credentials provided');
  return { user: null, error: { message: 'Invalid test credentials' } };
};

export const getTestSession = () => {
  const stored = localStorage.getItem('test_session');
  if (!stored) {
    console.log('No test session found in localStorage');
    return null;
  }
  
  const session = JSON.parse(stored);
  if (Date.now() > session.expires_at) {
    localStorage.removeItem('test_session');
    console.log('Test session expired, removed from localStorage');
    return null;
  }
  
  console.log('Retrieved valid test session:', session);
  return session;
};

export const clearTestSession = () => {
  localStorage.removeItem('test_session');
  console.log('Test session cleared from localStorage');
};
