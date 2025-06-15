
-- Enable Row Level Security on the investor_stats table
ALTER TABLE public.investor_stats ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows everyone to read the investor stats (since this is public information)
CREATE POLICY "Allow public read access to investor stats" 
  ON public.investor_stats 
  FOR SELECT 
  USING (true);

-- Create a policy that only allows authenticated users with admin role to modify stats
-- (assuming you have an admin role in your profiles table)
CREATE POLICY "Only admins can modify investor stats" 
  ON public.investor_stats 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND user_type = 'admin'
    )
  );
