
-- Complete fix for infinite recursion in profiles and related tables
-- Drop all existing problematic policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public read access to investor stats" ON public.investor_stats;

-- Ensure the get_current_user_id function exists and is properly defined
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT auth.uid();
$$;

-- Create clean, non-recursive policies for profiles
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

-- Fix investor_stats policies to avoid any potential recursion
CREATE POLICY "Public read access to investor stats" 
  ON public.investor_stats 
  FOR SELECT 
  USING (true);

-- Also check and fix any other tables that might reference profiles
DROP POLICY IF EXISTS "Users can view their own files" ON public.uploaded_files;
CREATE POLICY "Users can view their own files" 
  ON public.uploaded_files 
  FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can upload their own files" ON public.uploaded_files;
CREATE POLICY "Users can upload their own files" 
  ON public.uploaded_files 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own files" ON public.uploaded_files;
CREATE POLICY "Users can update their own files" 
  ON public.uploaded_files 
  FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own files" ON public.uploaded_files;
CREATE POLICY "Users can delete their own files" 
  ON public.uploaded_files 
  FOR DELETE 
  USING (auth.uid() = user_id);
