
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

-- Create wallet system for direct customers only
CREATE TABLE public.user_wallets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  balance DECIMAL(15,2) DEFAULT 0.00,
  total_earned DECIMAL(15,2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create wallet transactions table
CREATE TABLE public.wallet_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50) NOT NULL, -- 'referral_bonus', 'loyalty_reward', 'festival_payout'
  amount DECIMAL(12,2) NOT NULL,
  description TEXT,
  referral_id UUID,
  investment_id UUID,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'credited', 'failed'
  credited_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced referral commissions table
ALTER TABLE public.referral_commissions 
ADD COLUMN slab_number INTEGER,
ADD COLUMN is_direct_customer BOOLEAN DEFAULT true,
ADD COLUMN wallet_credited BOOLEAN DEFAULT false;

-- Create loyalty rewards tracking table
CREATE TABLE public.loyalty_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  investment_id UUID REFERENCES public.investments(id),
  platform_commission DECIMAL(12,2) NOT NULL,
  reward_percentage DECIMAL(5,2) DEFAULT 30.00, -- 20-40% of platform commission
  reward_amount DECIMAL(12,2) NOT NULL,
  reward_year INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'credited', 'cancelled'
  credited_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add user type tracking to profiles
ALTER TABLE public.profiles 
ADD COLUMN is_direct_customer BOOLEAN DEFAULT true,
ADD COLUMN onboarding_source VARCHAR(50) DEFAULT 'direct'; -- 'direct', 'agent', 'ifa', 'distributor'

-- RLS Policies
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wallet" ON public.user_wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own wallet transactions" ON public.wallet_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own loyalty rewards" ON public.loyalty_rewards FOR SELECT USING (auth.uid() = user_id);

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

-- Enhanced referral commission calculation function
CREATE OR REPLACE FUNCTION public.calculate_enhanced_referral_commission()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  referrer_profile RECORD;
  referral_count INTEGER;
  slab_reward DECIMAL(10,2);
  is_direct BOOLEAN;
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Get referrer information
    SELECT p.*, pr.id as referrer_id 
    INTO referrer_profile 
    FROM public.profiles p
    LEFT JOIN public.profiles pr ON pr.id = p.referred_by
    WHERE p.id = NEW.user_id AND p.referred_by IS NOT NULL;
    
    IF referrer_profile.referrer_id IS NOT NULL THEN
      -- Check if this is first investment
      IF (SELECT COUNT(*) FROM public.investments WHERE user_id = NEW.user_id AND id != NEW.id) = 0 THEN
        
        -- Check if referee is direct customer
        SELECT is_direct_customer INTO is_direct
        FROM public.profiles 
        WHERE id = NEW.user_id;
        
        -- Count current referrals for slab calculation
        SELECT COUNT(*) INTO referral_count
        FROM public.referral_commissions
        WHERE referrer_id = referrer_profile.referrer_id AND status = 'earned';
        
        -- Get reward amount based on slab
        slab_reward := public.get_referral_reward_amount(referral_count + 1);
        
        -- Insert referral commission
        INSERT INTO public.referral_commissions (
          referrer_id,
          referee_id,
          investment_id,
          commission_amount,
          commission_rate,
          max_commission,
          slab_number,
          is_direct_customer,
          status
        ) VALUES (
          referrer_profile.referrer_id,
          NEW.user_id,
          NEW.id,
          slab_reward,
          0.00, -- Not percentage based anymore
          slab_reward,
          CASE 
            WHEN referral_count + 1 BETWEEN 1 AND 3 THEN 1
            WHEN referral_count + 1 BETWEEN 4 AND 6 THEN 2
            WHEN referral_count + 1 BETWEEN 7 AND 16 THEN 3
            WHEN referral_count + 1 BETWEEN 17 AND 50 THEN 4
            ELSE 5
          END,
          COALESCE(is_direct, true),
          'earned'
        );
        
        -- Create wallet transaction for direct customers only
        IF COALESCE(is_direct, true) THEN
          INSERT INTO public.wallet_transactions (
            user_id,
            transaction_type,
            amount,
            description,
            referral_id,
            status
          ) VALUES (
            referrer_profile.referrer_id,
            'referral_bonus',
            slab_reward,
            FORMAT('Referral bonus for referring %s (Slab %s)', 
              referrer_profile.full_name,
              CASE 
                WHEN referral_count + 1 BETWEEN 1 AND 3 THEN '1 (₹100)'
                WHEN referral_count + 1 BETWEEN 4 AND 6 THEN '2 (₹200)'
                WHEN referral_count + 1 BETWEEN 7 AND 16 THEN '3 (₹300)'
                WHEN referral_count + 1 BETWEEN 17 AND 50 THEN '4 (₹400)'
                ELSE '5 (₹500)'
              END
            ),
            NEW.user_id,
            'pending'
          );
          
          -- Update referrer's total earnings
          UPDATE public.profiles 
          SET total_referral_earnings = COALESCE(total_referral_earnings, 0) + slab_reward
          WHERE id = referrer_profile.referrer_id;
        END IF;
        
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Replace the old trigger
DROP TRIGGER IF EXISTS calculate_referral_commission_trigger ON public.investments;
CREATE TRIGGER calculate_enhanced_referral_commission_trigger
  AFTER INSERT ON public.investments
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_enhanced_referral_commission();

-- Function to create wallet for direct customers
CREATE OR REPLACE FUNCTION public.create_user_wallet()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Only create wallet for direct customers
  IF NEW.is_direct_customer = true AND NEW.onboarding_source = 'direct' THEN
    INSERT INTO public.user_wallets (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to auto-create wallet for direct customers
CREATE TRIGGER create_wallet_for_direct_customers
  AFTER INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_user_wallet();
