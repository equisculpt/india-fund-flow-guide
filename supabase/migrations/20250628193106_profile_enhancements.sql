
-- Add user type tracking to profiles
ALTER TABLE public.profiles 
ADD COLUMN is_direct_customer BOOLEAN DEFAULT true,
ADD COLUMN onboarding_source VARCHAR(50) DEFAULT 'direct'; -- 'direct', 'agent', 'ifa', 'distributor'
