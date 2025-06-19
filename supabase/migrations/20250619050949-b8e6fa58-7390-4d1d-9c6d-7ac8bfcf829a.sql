
-- Fix Supabase security warnings by improving RLS policies and constraints

-- 1. Fix admin_users table security
DROP POLICY IF EXISTS "Allow all operations on admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow all operations on admin_sessions" ON public.admin_sessions;

-- Create more restrictive policies for admin tables
CREATE POLICY "Admin users can view their own data" 
  ON public.admin_users 
  FOR SELECT 
  USING (auth.uid()::text = id::text OR auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "System can insert admin users" 
  ON public.admin_users 
  FOR INSERT 
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Admin sessions restricted access" 
  ON public.admin_sessions 
  FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- 2. Add proper constraints and security to existing tables
ALTER TABLE public.profiles ADD CONSTRAINT check_user_type 
  CHECK (user_type IN ('customer', 'agent', 'admin'));

ALTER TABLE public.profiles ADD CONSTRAINT check_kyc_status 
  CHECK (kyc_status IN ('pending', 'verified', 'rejected'));

-- 3. Create admin whitelist table for enhanced security
CREATE TABLE IF NOT EXISTS public.admin_whitelist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on admin whitelist
ALTER TABLE public.admin_whitelist ENABLE ROW LEVEL SECURITY;

-- Only service role can manage whitelist
CREATE POLICY "Service role can manage admin whitelist" 
  ON public.admin_whitelist 
  FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Insert default admin email to whitelist
INSERT INTO public.admin_whitelist (email, created_by, is_active)
VALUES ('admin@sipbrewery.com', 'system', true)
ON CONFLICT (email) DO NOTHING;

-- 4. Create audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  success BOOLEAN NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only service role can write to audit log
CREATE POLICY "Service role can write audit log" 
  ON public.security_audit_log 
  FOR INSERT 
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- 5. Create function to validate admin access
CREATE OR REPLACE FUNCTION public.validate_admin_access(admin_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if email is in whitelist and active
  RETURN EXISTS (
    SELECT 1 FROM public.admin_whitelist 
    WHERE email = admin_email AND is_active = true
  );
END;
$$;

-- 6. Add session timeout constraints
ALTER TABLE public.admin_sessions 
ADD CONSTRAINT check_session_expiry 
CHECK (expires_at > created_at);

-- 7. Create function to clean expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.admin_sessions 
  WHERE expires_at < NOW();
END;
$$;

-- 8. Add IP restriction capability to admin sessions
ALTER TABLE public.admin_sessions 
ADD COLUMN IF NOT EXISTS ip_address TEXT,
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- 9. Create function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type_param TEXT,
  user_email_param TEXT DEFAULT NULL,
  ip_address_param TEXT DEFAULT NULL,
  user_agent_param TEXT DEFAULT NULL,
  success_param BOOLEAN DEFAULT true,
  details_param JSONB DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type, user_email, ip_address, user_agent, success, details
  ) VALUES (
    event_type_param, user_email_param, ip_address_param, 
    user_agent_param, success_param, details_param
  );
END;
$$;

-- 10. Add rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_blocked BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS on rate limit log
ALTER TABLE public.rate_limit_log ENABLE ROW LEVEL SECURITY;

-- Only service role can manage rate limiting
CREATE POLICY "Service role can manage rate limits" 
  ON public.rate_limit_log 
  FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');
