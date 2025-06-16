
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
        console.log('No admin session token found');
        setLoading(false);
        return;
      }

      console.log('Checking admin session with token:', sessionToken);

      // Check if session exists and is valid
      const { data: sessionData, error: sessionError } = await supabase
        .from('admin_sessions')
        .select(`
          admin_user_id,
          expires_at,
          admin_users!admin_sessions_admin_user_id_fkey (
            id,
            email,
            full_name,
            is_active
          )
        `)
        .eq('session_token', sessionToken)
        .gt('expires_at', new Date().toISOString())
        .single();

      console.log('Admin session check result:', { sessionData, sessionError });

      if (sessionError || !sessionData) {
        console.log('No valid admin session found, clearing token');
        localStorage.removeItem('admin_session_token');
        setAdminUser(null);
      } else {
        console.log('Valid admin session found:', sessionData);
        setAdminUser(sessionData.admin_users as AdminUser);
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
        // Check if admin user exists
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('id, email, full_name, is_active')
          .eq('email', email)
          .eq('is_active', true)
          .single();

        if (adminError || !adminUser) {
          console.error('Admin user not found:', adminError);
          return { success: false, error: 'Admin user not found or inactive' };
        }

        const sessionToken = Math.random().toString(36) + Date.now().toString(36);
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour session

        console.log('Creating admin session with token:', sessionToken);

        // Create session
        const { data: sessionData, error: sessionError } = await supabase
          .from('admin_sessions')
          .insert({
            admin_user_id: adminUser.id,
            session_token: sessionToken,
            expires_at: expiresAt.toISOString()
          })
          .select()
          .single();

        console.log('Session creation result:', { sessionData, sessionError });

        if (sessionError) {
          console.error('Failed to create admin session:', sessionError);
          return { success: false, error: 'Failed to create session' };
        }

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
        await supabase
          .from('admin_sessions')
          .delete()
          .eq('session_token', sessionToken);
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
