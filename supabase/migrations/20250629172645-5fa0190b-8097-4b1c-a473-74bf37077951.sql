
-- Enable RLS on referral_reward_slabs table (already done in your command)
ALTER TABLE public.referral_reward_slabs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read referral reward slabs
CREATE POLICY "Anyone can view referral reward slabs" 
  ON public.referral_reward_slabs 
  FOR SELECT 
  TO authenticated
  USING (is_active = true);

-- Create policy to allow only admins to insert/update/delete referral reward slabs
CREATE POLICY "Only admins can modify referral reward slabs" 
  ON public.referral_reward_slabs 
  FOR ALL 
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());
