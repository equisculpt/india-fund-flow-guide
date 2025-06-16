
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

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
        setLoading(false);
        return;
      }

      console.log('Checking admin session with token:', sessionToken);

      const { data, error } = await supabase.rpc('execute_sql' as any, {
        sql: `
          SELECT au.id, au.email, au.full_name, au.is_active
          FROM admin_users au
          JOIN admin_sessions ads ON au.id = ads.admin_user_id
          WHERE ads.session_token = $1 AND ads.expires_at > NOW()
        `,
        params: [sessionToken]
      });

      console.log('Admin session check result:', { data, error });

      if (error || !data || data.length === 0) {
        console.log('No valid admin session found, clearing token');
        localStorage.removeItem('admin_session_token');
        setAdminUser(null);
      } else {
        console.log('Valid admin session found:', data[0]);
        setAdminUser(data[0]);
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
      
      // Simple password check for demo (in production, use proper hashing)
      if (email === 'admin@sipbrewery.com' && password === 'admin123') {
        const sessionToken = Math.random().toString(36) + Date.now().toString(36);
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour session

        console.log('Creating admin session with token:', sessionToken);

        // Create session
        const { data, error } = await supabase.rpc('execute_sql' as any, {
          sql: `
            INSERT INTO admin_sessions (admin_user_id, session_token, expires_at)
            SELECT id, $1, $2 FROM admin_users WHERE email = $3
            RETURNING admin_user_id
          `,
          params: [sessionToken, expiresAt.toISOString(), email]
        });

        console.log('Session creation result:', { data, error });

        if (error) {
          console.error('Failed to create admin session:', error);
          return { success: false, error: 'Failed to create session' };
        }

        localStorage.setItem('admin_session_token', sessionToken);
        
        // Immediately check session to update state
        await checkAdminSession();
        
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
        await supabase.rpc('execute_sql' as any, {
          sql: 'DELETE FROM admin_sessions WHERE session_token = $1',
          params: [sessionToken]
        });
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
