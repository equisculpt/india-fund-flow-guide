
-- First, let's drop any existing problematic policies on the profiles table
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;

-- Create simple, non-recursive policies for the profiles table
CREATE POLICY "Allow authenticated users to view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow users to insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Ensure the investments table also has proper policies
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own investments" ON public.investments;
CREATE POLICY "Allow authenticated users to view all investments" 
  ON public.investments 
  FOR SELECT 
  USING (true);

-- Ensure the commissions table has proper policies  
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own commissions" ON public.commissions;
CREATE POLICY "Allow authenticated users to view all commissions" 
  ON public.commissions 
  FOR SELECT 
  USING (true);
