
-- Fix the infinite recursion in investor_stats and profiles policies
-- Remove problematic policies that cause circular references
DROP POLICY IF EXISTS "Public read access to investor stats" ON public.investor_stats;
DROP POLICY IF EXISTS "Public can view all reviews" ON public.investor_reviews;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public can view community questions" ON public.community_questions;
DROP POLICY IF EXISTS "Public can view community answers" ON public.community_answers;
DROP POLICY IF EXISTS "Authenticated users can create questions" ON public.community_questions;
DROP POLICY IF EXISTS "Authenticated users can create answers" ON public.community_answers;

-- Create security definer function to get current user safely
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT auth.uid();
$$;

-- Create simple, non-recursive policies for investor_stats
CREATE POLICY "Anyone can view investor stats" 
  ON public.investor_stats 
  FOR SELECT 
  USING (true);

-- Create simple policy for investor_reviews without profile references
CREATE POLICY "Anyone can view investor reviews" 
  ON public.investor_reviews 
  FOR SELECT 
  USING (true);

-- Create non-recursive policies for profiles
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

-- Fix community policies to avoid recursion
CREATE POLICY "Anyone can view community questions" 
  ON public.community_questions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can view community answers" 
  ON public.community_answers 
  FOR SELECT 
  USING (true);

CREATE POLICY "Auth users can create questions" 
  ON public.community_questions 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Auth users can create answers" 
  ON public.community_answers 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());
