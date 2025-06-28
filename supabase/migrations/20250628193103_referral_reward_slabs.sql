
-- Create referral reward slabs configuration table
CREATE TABLE public.referral_reward_slabs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slab_min INTEGER NOT NULL,
  slab_max INTEGER,
  reward_amount DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the referral slab data
INSERT INTO public.referral_reward_slabs (slab_min, slab_max, reward_amount) VALUES
(1, 3, 100.00),
(4, 6, 200.00),
(7, 16, 300.00),
(17, 50, 400.00),
(51, NULL, 500.00);

-- Function to calculate referral slab reward
CREATE OR REPLACE FUNCTION public.get_referral_reward_amount(referral_count INTEGER)
RETURNS DECIMAL(10,2)
LANGUAGE plpgsql
AS $$
DECLARE
  reward_amount DECIMAL(10,2);
BEGIN
  SELECT reward_amount INTO reward_amount
  FROM public.referral_reward_slabs
  WHERE referral_count >= slab_min 
    AND (slab_max IS NULL OR referral_count <= slab_max)
    AND is_active = true
  ORDER BY slab_min DESC
  LIMIT 1;
  
  RETURN COALESCE(reward_amount, 0.00);
END;
$$;
