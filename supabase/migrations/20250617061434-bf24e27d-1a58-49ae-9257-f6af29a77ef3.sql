
-- Fix the infinite recursion in investor_stats policies
-- Remove any existing policies that might be causing circular references
DROP POLICY IF EXISTS "Allow public read access to investor stats" ON public.investor_stats;
DROP POLICY IF EXISTS "Public can view investor stats" ON public.investor_stats;

-- Create a simple policy that allows public read access without referencing profiles
CREATE POLICY "Public read access to investor stats" 
  ON public.investor_stats 
  FOR SELECT 
  USING (true);

-- Also ensure investor_reviews has proper policies without circular references
DROP POLICY IF EXISTS "Public can view featured reviews with profiles" ON public.investor_reviews;

-- Create a simple policy for investor_reviews that doesn't cause recursion
CREATE POLICY "Public can view all reviews" 
  ON public.investor_reviews 
  FOR SELECT 
  USING (true);
