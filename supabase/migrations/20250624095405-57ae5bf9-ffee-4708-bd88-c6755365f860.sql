
-- Fix the infinite recursion in profiles policies
-- First, drop the problematic policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- The get_current_user_id function already exists and is safe to use
-- Create new non-recursive policies for profiles
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (id = get_current_user_id());

CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (id = get_current_user_id());

CREATE POLICY "Users can insert own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (id = get_current_user_id());

-- Also ensure investor_stats policies don't cause recursion
DROP POLICY IF EXISTS "Anyone can view investor stats" ON public.investor_stats;
CREATE POLICY "Public read access to investor stats" 
  ON public.investor_stats 
  FOR SELECT 
  USING (true);
