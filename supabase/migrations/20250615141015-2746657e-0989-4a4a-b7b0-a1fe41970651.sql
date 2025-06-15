
-- Create tables for comprehensive admin system

-- First, let's create the profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  user_type VARCHAR(20) CHECK (user_type IN ('customer', 'agent', 'admin')) NOT NULL,
  full_name TEXT NOT NULL,
  phone VARCHAR(15),
  pan_number VARCHAR(10),
  kyc_status VARCHAR(20) DEFAULT 'pending',
  referral_code VARCHAR(10) UNIQUE,
  referred_by UUID REFERENCES public.profiles(id),
  agent_id UUID REFERENCES public.profiles(id), -- For customers under an agent
  commission_rate DECIMAL(4,2) DEFAULT 80.00, -- Default 80% commission share for agents
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mutual fund schemes with commission tracking
CREATE TABLE IF NOT EXISTS public.mutual_funds (
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
  commission_rate DECIMAL(5,2) DEFAULT 0.00, -- Commission rate for this fund
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User investments with commission tracking
CREATE TABLE IF NOT EXISTS public.investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  fund_id UUID REFERENCES public.mutual_funds(id),
  agent_id UUID REFERENCES public.profiles(id), -- Agent who facilitated this investment
  investment_type VARCHAR(20) CHECK (investment_type IN ('SIP', 'LUMPSUM')),
  amount DECIMAL(12,2) NOT NULL,
  frequency VARCHAR(20), -- For SIP: monthly, quarterly, yearly
  status VARCHAR(20) DEFAULT 'active', -- active, paused, stopped
  units_allotted DECIMAL(15,6),
  nav_price DECIMAL(10,4),
  start_date DATE,
  next_installment_date DATE,
  total_invested DECIMAL(15,2) DEFAULT 0.00,
  current_value DECIMAL(15,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Commission tracking with live calculation
CREATE TABLE IF NOT EXISTS public.commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  investment_id UUID REFERENCES public.investments(id) ON DELETE CASCADE,
  fund_id UUID REFERENCES public.mutual_funds(id),
  commission_type VARCHAR(20) DEFAULT 'investment', -- investment, referral
  base_commission_rate DECIMAL(5,2), -- Fund's base commission rate
  agent_share_percentage DECIMAL(5,2), -- Agent's share percentage (e.g., 80%)
  calculated_commission DECIMAL(10,2), -- Final commission amount
  investment_amount DECIMAL(12,2),
  status VARCHAR(20) DEFAULT 'pending', -- pending, paid, cancelled
  payment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin settings for global configurations
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value, description) 
VALUES 
  ('default_commission_share', '80.00', 'Default commission share percentage for new agents'),
  ('platform_commission_share', '20.00', 'Platform commission share percentage')
ON CONFLICT (setting_key) DO NOTHING;

-- Create function to automatically calculate commission
CREATE OR REPLACE FUNCTION calculate_agent_commission()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate commission when a new investment is made
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.commissions (
      agent_id,
      investment_id,
      fund_id,
      base_commission_rate,
      agent_share_percentage,
      calculated_commission,
      investment_amount
    )
    SELECT 
      NEW.agent_id,
      NEW.id,
      NEW.fund_id,
      mf.commission_rate,
      p.commission_rate,
      (NEW.amount * mf.commission_rate * p.commission_rate / 10000), -- Calculate final commission
      NEW.amount
    FROM public.mutual_funds mf, public.profiles p
    WHERE mf.id = NEW.fund_id 
    AND p.id = NEW.agent_id
    AND NEW.agent_id IS NOT NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic commission calculation
DROP TRIGGER IF EXISTS trigger_calculate_commission ON public.investments;
CREATE TRIGGER trigger_calculate_commission
  AFTER INSERT ON public.investments
  FOR EACH ROW EXECUTE FUNCTION calculate_agent_commission();

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mutual_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
  );

-- RLS Policies for mutual funds (public read, admin write)
CREATE POLICY "Anyone can view active mutual funds" ON public.mutual_funds 
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage mutual funds" ON public.mutual_funds 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
  );

-- RLS Policies for investments
CREATE POLICY "Users can view own investments" ON public.investments 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Agents can view client investments" ON public.investments 
  FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Admins can view all investments" ON public.investments 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
  );

-- RLS Policies for commissions
CREATE POLICY "Agents can view own commissions" ON public.commissions 
  FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Admins can manage all commissions" ON public.commissions 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
  );

-- RLS Policies for admin settings
CREATE POLICY "Admins can manage settings" ON public.admin_settings 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
  );

-- Function to generate referral code
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
