
-- Enhanced referral commissions table
ALTER TABLE public.referral_commissions 
ADD COLUMN slab_number INTEGER,
ADD COLUMN is_direct_customer BOOLEAN DEFAULT true,
ADD COLUMN wallet_credited BOOLEAN DEFAULT false;

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
