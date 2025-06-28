
-- Create commission rates table to store fund-specific trail commission rates
CREATE TABLE public.commission_rates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fund_id UUID REFERENCES public.mutual_funds(id) ON DELETE CASCADE,
  scheme_code TEXT NOT NULL,
  annual_commission_rate DECIMAL(5,2) NOT NULL, -- e.g., 1.00 for 1% per annum
  effective_from DATE NOT NULL,
  effective_to DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create monthly commission ledger to track actual commissions earned per user per fund
CREATE TABLE public.monthly_commission_ledger (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  fund_id UUID REFERENCES public.mutual_funds(id),
  scheme_code TEXT NOT NULL,
  commission_month DATE NOT NULL, -- First day of the month for which commission is calculated
  outstanding_investment_value DECIMAL(15,2) NOT NULL, -- Total value of user's units in this fund during this month
  monthly_commission_earned DECIMAL(10,2) NOT NULL, -- Actual commission earned by platform for this user/fund/month
  user_reward_percentage DECIMAL(5,2) DEFAULT 30.00, -- User's share percentage (20-40%)
  user_reward_amount DECIMAL(10,2) NOT NULL, -- User's reward for this month
  commission_status VARCHAR(20) DEFAULT 'earned', -- 'earned', 'received', 'disputed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user reward wallet to track accumulated rewards
CREATE TABLE public.user_reward_wallet (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_pending_rewards DECIMAL(15,2) DEFAULT 0.00,
  total_lifetime_rewards DECIMAL(15,2) DEFAULT 0.00,
  last_payout_date DATE,
  last_payout_amount DECIMAL(15,2) DEFAULT 0.00,
  next_payout_eligible_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create annual payout history
CREATE TABLE public.annual_reward_payouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  payout_year INTEGER NOT NULL,
  total_commission_earned DECIMAL(15,2) NOT NULL,
  user_reward_amount DECIMAL(15,2) NOT NULL,
  payout_date DATE NOT NULL,
  payout_status VARCHAR(20) DEFAULT 'completed',
  pan_verified BOOLEAN DEFAULT false,
  tds_deducted DECIMAL(10,2) DEFAULT 0.00,
  net_payout_amount DECIMAL(15,2) NOT NULL,
  statement_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_monthly_commission_user_month ON public.monthly_commission_ledger(user_id, commission_month);
CREATE INDEX idx_monthly_commission_fund_month ON public.monthly_commission_ledger(fund_id, commission_month);
CREATE INDEX idx_commission_rates_fund_date ON public.commission_rates(fund_id, effective_from, effective_to);

-- RLS Policies
ALTER TABLE public.commission_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_commission_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reward_wallet ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.annual_reward_payouts ENABLE ROW LEVEL SECURITY;

-- Users can view their own commission ledger and wallet
CREATE POLICY "Users can view own commission ledger" ON public.monthly_commission_ledger FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own reward wallet" ON public.user_reward_wallet FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own payout history" ON public.annual_reward_payouts FOR SELECT USING (auth.uid() = user_id);

-- Commission rates are publicly viewable (for transparency)
CREATE POLICY "Anyone can view commission rates" ON public.commission_rates FOR SELECT USING (true);

-- Function to calculate monthly trail commission for a user
CREATE OR REPLACE FUNCTION public.calculate_monthly_trail_commission(
  p_user_id UUID,
  p_fund_id UUID,
  p_commission_month DATE
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  user_investment_value DECIMAL(15,2);
  commission_rate DECIMAL(5,2);
  monthly_commission DECIMAL(10,2);
  user_reward_pct DECIMAL(5,2) := 30.00; -- Default 30% reward
  user_reward DECIMAL(10,2);
BEGIN
  -- Get user's total investment value in this fund for this month
  -- This should be calculated based on units owned * current NAV
  SELECT COALESCE(SUM(total_invested), 0) INTO user_investment_value
  FROM public.investments
  WHERE user_id = p_user_id 
    AND fund_id = p_fund_id 
    AND status = 'active'
    AND start_date <= p_commission_month;
  
  -- Get applicable commission rate for this fund and month
  SELECT annual_commission_rate INTO commission_rate
  FROM public.commission_rates
  WHERE fund_id = p_fund_id
    AND p_commission_month >= effective_from
    AND (effective_to IS NULL OR p_commission_month <= effective_to)
    AND is_active = true
  ORDER BY effective_from DESC
  LIMIT 1;
  
  -- Calculate monthly commission (annual rate / 12)
  IF user_investment_value > 0 AND commission_rate > 0 THEN
    monthly_commission := (user_investment_value * commission_rate / 100) / 12;
    user_reward := monthly_commission * user_reward_pct / 100;
    
    -- Insert commission ledger entry
    INSERT INTO public.monthly_commission_ledger (
      user_id, fund_id, 
      scheme_code,
      commission_month, 
      outstanding_investment_value,
      monthly_commission_earned,
      user_reward_percentage,
      user_reward_amount
    )
    SELECT 
      p_user_id, p_fund_id,
      mf.scheme_code,
      p_commission_month,
      user_investment_value,
      monthly_commission,
      user_reward_pct,
      user_reward
    FROM public.mutual_funds mf
    WHERE mf.id = p_fund_id;
    
    -- Update user's reward wallet
    INSERT INTO public.user_reward_wallet (user_id, total_pending_rewards)
    VALUES (p_user_id, user_reward)
    ON CONFLICT (user_id)
    DO UPDATE SET
      total_pending_rewards = user_reward_wallet.total_pending_rewards + user_reward,
      updated_at = NOW();
  END IF;
END;
$$;

-- Function to process annual reward payout
CREATE OR REPLACE FUNCTION public.process_annual_payout(p_user_id UUID, p_payout_year INTEGER)
RETURNS DECIMAL(15,2)
LANGUAGE plpgsql
AS $$
DECLARE
  total_rewards DECIMAL(15,2);
  net_payout DECIMAL(15,2);
  tds_amount DECIMAL(10,2) := 0.00;
BEGIN
  -- Get total pending rewards for the user
  SELECT total_pending_rewards INTO total_rewards
  FROM public.user_reward_wallet
  WHERE user_id = p_user_id;
  
  -- Calculate TDS if applicable (simplified - actual TDS rules are complex)
  IF total_rewards > 10000 THEN
    tds_amount := total_rewards * 0.10; -- 10% TDS for amounts > 10,000
  END IF;
  
  net_payout := total_rewards - tds_amount;
  
  -- Record the payout
  INSERT INTO public.annual_reward_payouts (
    user_id, payout_year, total_commission_earned,
    user_reward_amount, payout_date, tds_deducted, net_payout_amount
  ) VALUES (
    p_user_id, p_payout_year, total_rewards * 100 / 30, -- Reverse calculate total commission
    total_rewards, CURRENT_DATE, tds_amount, net_payout
  );
  
  -- Update wallet - reset pending rewards and update totals
  UPDATE public.user_reward_wallet
  SET 
    total_pending_rewards = 0.00,
    total_lifetime_rewards = total_lifetime_rewards + total_rewards,
    last_payout_date = CURRENT_DATE,
    last_payout_amount = net_payout,
    next_payout_eligible_date = CURRENT_DATE + INTERVAL '1 year',
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN net_payout;
END;
$$;

-- Insert sample commission rates for major fund categories
INSERT INTO public.commission_rates (scheme_code, annual_commission_rate, effective_from) VALUES
('EQUITY_LARGE_CAP', 1.00, '2024-01-01'),
('EQUITY_MID_CAP', 1.25, '2024-01-01'),
('EQUITY_SMALL_CAP', 1.50, '2024-01-01'),
('DEBT_LIQUID', 0.25, '2024-01-01'),
('DEBT_ULTRA_SHORT', 0.50, '2024-01-01'),
('HYBRID_AGGRESSIVE', 1.00, '2024-01-01'),
('HYBRID_CONSERVATIVE', 0.75, '2024-01-01');
