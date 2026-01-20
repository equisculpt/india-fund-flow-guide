
import { useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

// Mock admin users for prototype
const mockAdminUsers: AdminUser[] = [
  {
    id: 'admin-1',
    email: 'admin@sipbrewery.com',
    full_name: 'Admin User',
    is_active: true
  }
];

// Mock sessions storage
const mockAdminSessions: Record<string, { admin_user_id: string; expires_at: string }> = {};

export const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminSession();
  }, []);

  const checkAdminSession = async () => {
    try {
      const sessionToken = localStorage.getItem('admin_session_token');
      if (!sessionToken) {
        console.log('No admin session token found');
        setLoading(false);
        return;
      }

      console.log('Checking admin session with token:', sessionToken);

      // Check mock session
      const session = mockAdminSessions[sessionToken];
      if (!session || new Date(session.expires_at) < new Date()) {
        console.log('No valid admin session found, clearing token');
        localStorage.removeItem('admin_session_token');
        setAdminUser(null);
      } else {
        const user = mockAdminUsers.find(u => u.id === session.admin_user_id);
        if (user) {
          console.log('Valid admin session found:', user);
          setAdminUser(user);
        } else {
          setAdminUser(null);
        }
      }
    } catch (error) {
      console.error('Error checking admin session:', error);
      localStorage.removeItem('admin_session_token');
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting admin login for:', email);
      
      // Simple password check for demo
      if (email === 'admin@sipbrewery.com' && password === 'admin123') {
        const adminUser = mockAdminUsers.find(u => u.email === email && u.is_active);

        if (!adminUser) {
          console.error('Admin user not found');
          return { success: false, error: 'Admin user not found or inactive' };
        }

        const sessionToken = Math.random().toString(36) + Date.now().toString(36);
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour session

        console.log('Creating admin session with token:', sessionToken);

        // Store mock session
        mockAdminSessions[sessionToken] = {
          admin_user_id: adminUser.id,
          expires_at: expiresAt.toISOString()
        };

        localStorage.setItem('admin_session_token', sessionToken);
        
        // Immediately update state
        setAdminUser(adminUser);
        
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      const sessionToken = localStorage.getItem('admin_session_token');
      if (sessionToken) {
        delete mockAdminSessions[sessionToken];
      }
      localStorage.removeItem('admin_session_token');
      setAdminUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    adminUser,
    loading,
    login,
    logout,
    isAuthenticated: !!adminUser
  };
};
