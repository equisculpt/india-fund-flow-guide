
-- First, let's drop ALL existing policies on profiles table to start fresh
DO $$ 
DECLARE
    policy_name TEXT;
BEGIN
    FOR policy_name IN 
        SELECT pol.polname 
        FROM pg_policy pol 
        JOIN pg_class cls ON pol.polrelid = cls.oid 
        WHERE cls.relname = 'profiles'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles', policy_name);
    END LOOP;
END $$;

-- Also drop policies on investments and commissions tables
DO $$ 
DECLARE
    policy_name TEXT;
BEGIN
    FOR policy_name IN 
        SELECT pol.polname 
        FROM pg_policy pol 
        JOIN pg_class cls ON pol.polrelid = cls.oid 
        WHERE cls.relname = 'investments'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.investments', policy_name);
    END LOOP;
END $$;

DO $$ 
DECLARE
    policy_name TEXT;
BEGIN
    FOR policy_name IN 
        SELECT pol.polname 
        FROM pg_policy pol 
        JOIN pg_class cls ON pol.polrelid = cls.oid 
        WHERE cls.relname = 'commissions'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.commissions', policy_name);
    END LOOP;
END $$;

-- Create a simple function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users au
    INNER JOIN public.admin_sessions as2 ON au.id = as2.admin_user_id
    WHERE as2.expires_at > NOW()
    AND au.is_active = true
  );
$$;

-- Create new non-recursive policies for profiles
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (is_admin_user() OR id = auth.uid());

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile or admins can update any" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id OR is_admin_user());

-- Create policies for investments table
CREATE POLICY "Admins and users can view investments" 
  ON public.investments 
  FOR SELECT 
  USING (is_admin_user() OR user_id = auth.uid());

-- Create policies for commissions table  
CREATE POLICY "Admins and agents can view commissions" 
  ON public.commissions 
  FOR SELECT 
  USING (is_admin_user() OR agent_id = auth.uid());
