
-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_sessions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default admin user if not exists
INSERT INTO public.admin_users (email, password_hash, full_name, is_active)
SELECT 'admin@sipbrewery.com', 'admin123', 'Admin User', true
WHERE NOT EXISTS (
  SELECT 1 FROM public.admin_users WHERE email = 'admin@sipbrewery.com'
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations on admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow all operations on admin_sessions" ON public.admin_sessions;

-- Create policies for admin tables
CREATE POLICY "Allow all operations on admin_users" 
  ON public.admin_users 
  FOR ALL 
  USING (true);

CREATE POLICY "Allow all operations on admin_sessions" 
  ON public.admin_sessions 
  FOR ALL 
  USING (true);
