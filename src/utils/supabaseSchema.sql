
-- Supabase Database Schema for SIP Brewery Platform

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  user_type VARCHAR(20) CHECK (user_type IN ('customer', 'agent')) NOT NULL,
  full_name TEXT,
  phone VARCHAR(15),
  pan_number VARCHAR(10),
  kyc_status VARCHAR(20) DEFAULT 'pending',
  referral_code VARCHAR(10) UNIQUE,
  referred_by UUID REFERENCES public.profiles(id),
  agent_id UUID REFERENCES public.profiles(id), -- For customers under an agent
  commission_rate DECIMAL(4,2) DEFAULT 0.00, -- For agents
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Referral tracking
CREATE TABLE public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  referee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- pending, active, inactive
  total_commission DECIMAL(12,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referrer_id, referee_id)
);

-- Mutual Fund schemes
CREATE TABLE public.mutual_funds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_code VARCHAR(20) UNIQUE NOT NULL,
  scheme_name TEXT NOT NULL,
  amc_name TEXT NOT NULL,
  category VARCHAR(50),
  sub_category VARCHAR(50),
  nav DECIMAL(10,4),
  returns_1y DECIMAL(5,2),
  returns_3y DECIMAL(5,2),
  returns_5y DECIMAL(5,2),
  risk_level VARCHAR(20) CHECK (risk_level IN ('Low', 'Moderate', 'High')),
  min_sip_amount DECIMAL(10,2) DEFAULT 500.00,
  min_lumpsum_amount DECIMAL(10,2) DEFAULT 5000.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User investments
CREATE TABLE public.investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  fund_id UUID REFERENCES public.mutual_funds(id),
  investment_type VARCHAR(20) CHECK (investment_type IN ('SIP', 'LUMPSUM')),
  amount DECIMAL(12,2) NOT NULL,
  frequency VARCHAR(20), -- For SIP: monthly, quarterly, yearly
  status VARCHAR(20) DEFAULT 'active', -- active, paused, stopped
  bse_order_id VARCHAR(50), -- BSE Star MF order reference
  units_allotted DECIMAL(15,6),
  nav_price DECIMAL(10,4),
  start_date DATE,
  next_installment_date DATE,
  total_invested DECIMAL(15,2) DEFAULT 0.00,
  current_value DECIMAL(15,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Commission tracking
CREATE TABLE public.commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  investment_id UUID REFERENCES public.investments(id) ON DELETE CASCADE,
  commission_type VARCHAR(20), -- referral, agent_commission
  commission_rate DECIMAL(4,2),
  commission_amount DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending', -- pending, paid, cancelled
  payment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BSE Star MF integration logs
CREATE TABLE public.bse_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  investment_id UUID REFERENCES public.investments(id),
  bse_order_id VARCHAR(50),
  transaction_type VARCHAR(20), -- purchase, redemption
  amount DECIMAL(12,2),
  status VARCHAR(30), -- success, failed, pending
  response_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own referrals" ON public.referrals FOR SELECT USING (
  auth.uid() = referrer_id OR auth.uid() = referee_id
);

CREATE POLICY "Users can view own investments" ON public.investments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Agents can view client investments" ON public.investments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'agent'
    AND investments.user_id IN (
      SELECT id FROM public.profiles WHERE agent_id = auth.uid()
    )
  )
);

-- Functions for referral code generation
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
BEGIN
  RETURN 'SB' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code
CREATE OR REPLACE FUNCTION auto_generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_referral_code
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_referral_code();
