
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

interface SecurityContext {
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

export const useEnhancedAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    checkAdminSession();
    checkRateLimit();
  }, []);

  const getSecurityContext = (): SecurityContext => {
    return {
      ipAddress: 'unknown', // In production, you'd get this from server
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
  };

  const logSecurityEvent = async (
    eventType: string,
    userEmail?: string,
    success: boolean = true,
    details?: any
  ) => {
    try {
      const context = getSecurityContext();
      await supabase.rpc('log_security_event', {
        event_type_param: eventType,
        user_email_param: userEmail,
        ip_address_param: context.ipAddress,
        user_agent_param: context.userAgent,
        success_param: success,
        details_param: details ? JSON.stringify(details) : null
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  const checkRateLimit = async () => {
    const attempts = localStorage.getItem('admin_login_attempts');
    const lastAttempt = localStorage.getItem('admin_last_attempt');
    
    if (attempts && lastAttempt) {
      const attemptCount = parseInt(attempts);
      const timeDiff = Date.now() - parseInt(lastAttempt);
      
      // Block for 15 minutes after 5 failed attempts
      if (attemptCount >= 5 && timeDiff < 15 * 60 * 1000) {
        setIsBlocked(true);
        return;
      }
      
      // Reset if more than 1 hour has passed
      if (timeDiff > 60 * 60 * 1000) {
        localStorage.removeItem('admin_login_attempts');
        localStorage.removeItem('admin_last_attempt');
      }
    }
  };

  const validateAdminWhitelist = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('validate_admin_access', {
        admin_email: email
      });
      
      if (error) {
        console.error('Whitelist validation error:', error);
        return false;
      }
      
      return data === true;
    } catch (error) {
      console.error('Failed to validate admin whitelist:', error);
      return false;
    }
  };

  const checkAdminSession = async () => {
    try {
      const sessionToken = localStorage.getItem('admin_session_token');
      if (!sessionToken) {
        setLoading(false);
        return;
      }

      // Clean expired sessions first
      await supabase.rpc('cleanup_expired_sessions');

      const { data: sessionData, error: sessionError } = await supabase
        .from('admin_sessions')
        .select(`
          admin_user_id,
          expires_at,
          ip_address,
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

      if (sessionError || !sessionData) {
        localStorage.removeItem('admin_session_token');
        setAdminUser(null);
        await logSecurityEvent('SESSION_VALIDATION', undefined, false, { 
          reason: 'Invalid or expired session' 
        });
      } else {
        const context = getSecurityContext();
        
        // Validate IP address if stored (basic security check)
        if (sessionData.ip_address && sessionData.ip_address !== context.ipAddress) {
          localStorage.removeItem('admin_session_token');
          setAdminUser(null);
          await logSecurityEvent('SESSION_VALIDATION', sessionData.admin_users.email, false, { 
            reason: 'IP address mismatch' 
          });
          return;
        }

        setAdminUser(sessionData.admin_users as AdminUser);
        await logSecurityEvent('SESSION_VALIDATION', sessionData.admin_users.email, true);
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
    if (isBlocked) {
      return { 
        success: false, 
        error: 'Too many failed attempts. Please try again in 15 minutes.' 
      };
    }

    try {
      // First validate against whitelist
      const isWhitelisted = await validateAdminWhitelist(email);
      if (!isWhitelisted) {
        await logSecurityEvent('LOGIN_ATTEMPT', email, false, { 
          reason: 'Email not in whitelist' 
        });
        
        // Increment failed attempts
        const currentAttempts = parseInt(localStorage.getItem('admin_login_attempts') || '0') + 1;
        localStorage.setItem('admin_login_attempts', currentAttempts.toString());
        localStorage.setItem('admin_last_attempt', Date.now().toString());
        
        return { 
          success: false, 
          error: 'Access denied. Contact system administrator.' 
        };
      }

      // Simple password check for demo (in production, use proper hashing)
      if (email === 'admin@sipbrewery.com' && password === 'SecureAdmin2024!') {
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('id, email, full_name, is_active')
          .eq('email', email)
          .eq('is_active', true)
          .single();

        if (adminError || !adminUser) {
          await logSecurityEvent('LOGIN_ATTEMPT', email, false, { 
            reason: 'Admin user not found or inactive' 
          });
          return { success: false, error: 'Invalid credentials' };
        }

        const sessionToken = Math.random().toString(36) + Date.now().toString(36);
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 2); // 2 hour session for security

        const context = getSecurityContext();

        const { data: sessionData, error: sessionError } = await supabase
          .from('admin_sessions')
          .insert({
            admin_user_id: adminUser.id,
            session_token: sessionToken,
            expires_at: expiresAt.toISOString(),
            ip_address: context.ipAddress,
            user_agent: context.userAgent
          })
          .select()
          .single();

        if (sessionError) {
          await logSecurityEvent('LOGIN_ATTEMPT', email, false, { 
            reason: 'Failed to create session' 
          });
          return { success: false, error: 'Failed to create session' };
        }

        localStorage.setItem('admin_session_token', sessionToken);
        localStorage.removeItem('admin_login_attempts');
        localStorage.removeItem('admin_last_attempt');
        
        setAdminUser(adminUser);
        
        // Update last login time
        await supabase
          .from('admin_whitelist')
          .update({ last_login: new Date().toISOString() })
          .eq('email', email);

        await logSecurityEvent('LOGIN_SUCCESS', email, true, { 
          session_duration: '2 hours' 
        });
        
        return { success: true };
      } else {
        // Increment failed attempts
        const currentAttempts = parseInt(localStorage.getItem('admin_login_attempts') || '0') + 1;
        localStorage.setItem('admin_login_attempts', currentAttempts.toString());
        localStorage.setItem('admin_last_attempt', Date.now().toString());
        
        if (currentAttempts >= 5) {
          setIsBlocked(true);
        }
        
        await logSecurityEvent('LOGIN_ATTEMPT', email, false, { 
          reason: 'Invalid credentials',
          attempt_count: currentAttempts
        });
        
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      await logSecurityEvent('LOGIN_ERROR', email, false, { 
        error: error.message 
      });
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
      
      if (adminUser) {
        await logSecurityEvent('LOGOUT', adminUser.email, true);
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
    isBlocked,
    login,
    logout,
    isAuthenticated: !!adminUser
  };
};
