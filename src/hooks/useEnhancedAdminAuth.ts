
import { useState, useEffect } from 'react';

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

// Mock admin users for prototype
const mockAdminUsers: AdminUser[] = [
  {
    id: 'admin-1',
    email: 'admin@sipbrewery.com',
    full_name: 'Admin User',
    is_active: true
  }
];

// Mock whitelisted emails
const mockAdminWhitelist = ['admin@sipbrewery.com'];

// Mock sessions storage
const mockAdminSessions: Record<string, { admin_user_id: string; expires_at: string; ip_address: string; user_agent: string }> = {};

// Mock security logs
const mockSecurityLogs: any[] = [];

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
      mockSecurityLogs.push({
        event_type: eventType,
        user_email: userEmail,
        ip_address: context.ipAddress,
        user_agent: context.userAgent,
        success,
        details,
        timestamp: context.timestamp
      });
      console.log('Security event logged:', eventType, success);
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
      return mockAdminWhitelist.includes(email);
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

      console.log('Checking admin session with token:', sessionToken);

      // Check mock session
      const session = mockAdminSessions[sessionToken];
      if (!session || new Date(session.expires_at) < new Date()) {
        console.log('Session validation failed');
        localStorage.removeItem('admin_session_token');
        setAdminUser(null);
        await logSecurityEvent('SESSION_VALIDATION', undefined, false, { 
          reason: 'Invalid or expired session' 
        });
      } else {
        const user = mockAdminUsers.find(u => u.id === session.admin_user_id);
        if (user) {
          console.log('Session validated successfully:', user);
          setAdminUser(user);
          await logSecurityEvent('SESSION_VALIDATION', user.email, true);
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
    if (isBlocked) {
      return { 
        success: false, 
        error: 'Too many failed attempts. Please try again in 15 minutes.' 
      };
    }

    try {
      console.log('Attempting login for:', email);
      
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

      // Simple password check for demo
      if (email === 'admin@sipbrewery.com' && password === 'SecureAdmin2024!') {
        const adminUser = mockAdminUsers.find(u => u.email === email && u.is_active);

        if (!adminUser) {
          console.error('Admin user lookup failed');
          await logSecurityEvent('LOGIN_ATTEMPT', email, false, { 
            reason: 'Admin user not found or inactive' 
          });
          return { success: false, error: 'Invalid credentials' };
        }

        const sessionToken = Math.random().toString(36) + Date.now().toString(36);
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 2); // 2 hour session for security

        const context = getSecurityContext();

        // Store mock session
        mockAdminSessions[sessionToken] = {
          admin_user_id: adminUser.id,
          expires_at: expiresAt.toISOString(),
          ip_address: context.ipAddress,
          user_agent: context.userAgent
        };

        console.log('Session created successfully');
        localStorage.setItem('admin_session_token', sessionToken);
        localStorage.removeItem('admin_login_attempts');
        localStorage.removeItem('admin_last_attempt');
        
        // Set the admin user state immediately
        setAdminUser(adminUser);

        await logSecurityEvent('LOGIN_SUCCESS', email, true, { 
          session_duration: '2 hours' 
        });
        
        console.log('Login successful for:', email);
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
    } catch (error: any) {
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
        delete mockAdminSessions[sessionToken];
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
