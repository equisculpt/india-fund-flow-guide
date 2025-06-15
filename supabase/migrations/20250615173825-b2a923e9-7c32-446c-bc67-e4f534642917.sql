
-- Create referral_commissions table to track earnings
CREATE TABLE public.referral_commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  referee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  investment_id UUID REFERENCES public.investments(id) ON DELETE CASCADE,
  commission_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(4,2) DEFAULT 0.50, -- 0.5% rate
  max_commission DECIMAL(10,2) DEFAULT 500.00, -- ₹500 max per referral
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(referrer_id, referee_id) -- One commission per referral relationship
);

-- Add referral tracking to profiles if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'total_referral_earnings') THEN
    ALTER TABLE public.profiles ADD COLUMN total_referral_earnings DECIMAL(10,2) DEFAULT 0.00;
  END IF;
END $$;

-- Function to calculate referral commission on first investment
CREATE OR REPLACE FUNCTION calculate_referral_commission()
RETURNS TRIGGER AS $$
DECLARE
  referrer_profile RECORD;
  commission_amount DECIMAL(10,2);
  max_commission DECIMAL(10,2) := 500.00;
  commission_rate DECIMAL(4,2) := 0.50; -- 0.5%
BEGIN
  -- Only process if this is an INSERT (new investment)
  IF TG_OP = 'INSERT' THEN
    -- Get the referee's referrer information
    SELECT p.*, pr.id as referrer_id 
    INTO referrer_profile 
    FROM public.profiles p
    LEFT JOIN public.profiles pr ON pr.id = p.referred_by
    WHERE p.id = NEW.user_id AND p.referred_by IS NOT NULL;
    
    -- Check if referrer exists and this is the referee's first investment
    IF referrer_profile.referrer_id IS NOT NULL THEN
      -- Check if this is the first investment by this user
      IF (SELECT COUNT(*) FROM public.investments WHERE user_id = NEW.user_id AND id != NEW.id) = 0 THEN
        -- Calculate commission (0.5% of investment amount, max ₹500)
        commission_amount := LEAST(NEW.amount * commission_rate / 100, max_commission);
        
        -- Insert referral commission record
        INSERT INTO public.referral_commissions (
          referrer_id,
          referee_id,
          investment_id,
          commission_amount,
          commission_rate,
          max_commission,
          status
        ) VALUES (
          referrer_profile.referrer_id,
          NEW.user_id,
          NEW.id,
          commission_amount,
          commission_rate,
          max_commission,
          'earned'
        );
        
        -- Update referrer's total earnings
        UPDATE public.profiles 
        SET total_referral_earnings = COALESCE(total_referral_earnings, 0) + commission_amount
        WHERE id = referrer_profile.referrer_id;
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for referral commission calculation
DROP TRIGGER IF EXISTS referral_commission_trigger ON public.investments;
CREATE TRIGGER referral_commission_trigger
  AFTER INSERT ON public.investments
  FOR EACH ROW
  EXECUTE FUNCTION calculate_referral_commission();

-- Enable RLS on new table
ALTER TABLE public.referral_commissions ENABLE ROW LEVEL SECURITY;

-- RLS policies for referral_commissions
CREATE POLICY "Users can view their own referral commissions" ON public.referral_commissions 
FOR SELECT USING (auth.uid() = referrer_id);

CREATE POLICY "System can insert referral commissions" ON public.referral_commissions 
FOR INSERT WITH CHECK (true);
