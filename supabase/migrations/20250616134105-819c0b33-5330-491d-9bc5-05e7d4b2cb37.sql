
-- Create admin users table for login
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create AMC management table
CREATE TABLE IF NOT EXISTS public.amc_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amc_name TEXT UNIQUE NOT NULL,
  amc_code TEXT UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default AMC names
INSERT INTO public.amc_list (amc_name, amc_code) VALUES
('HDFC Mutual Fund', 'HDFC'),
('SBI Mutual Fund', 'SBI'),
('ICICI Prudential Mutual Fund', 'ICICI'),
('Axis Mutual Fund', 'AXIS'),
('Nippon India Mutual Fund', 'NIPPON'),
('Aditya Birla Sun Life Mutual Fund', 'ABSL'),
('Kotak Mutual Fund', 'KOTAK'),
('UTI Mutual Fund', 'UTI'),
('DSP Mutual Fund', 'DSP'),
('Franklin Templeton Mutual Fund', 'FRANKLIN'),
('Invesco Mutual Fund', 'INVESCO'),
('L&T Mutual Fund', 'LT'),
('Mirae Asset Mutual Fund', 'MIRAE'),
('Motilal Oswal Mutual Fund', 'MOTILAL'),
('PGIM India Mutual Fund', 'PGIM'),
('Quantum Mutual Fund', 'QUANTUM'),
('Tata Mutual Fund', 'TATA'),
('Sundaram Mutual Fund', 'SUNDARAM'),
('WhiteOak Capital Mutual Fund', 'WHITEOAK'),
('Edelweiss Mutual Fund', 'EDELWEISS')
ON CONFLICT (amc_name) DO NOTHING;

-- Create NAV update tracking table
CREATE TABLE IF NOT EXISTS public.nav_update_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_code TEXT NOT NULL,
  nav_date DATE NOT NULL,
  nav_value NUMERIC(10,4) NOT NULL,
  update_source TEXT DEFAULT 'manual',
  updated_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(scheme_code, nav_date)
);

-- Create admin sessions table
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES public.admin_users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amc_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nav_update_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Admin users can manage everything
CREATE POLICY "Admin users can manage admin_users" ON public.admin_users
  FOR ALL USING (true);

-- Everyone can read AMC list
CREATE POLICY "Everyone can read AMC list" ON public.amc_list
  FOR SELECT USING (true);

-- Admin users can manage AMC list
CREATE POLICY "Admin users can manage AMC list" ON public.amc_list
  FOR ALL USING (true);

-- Everyone can read NAV history
CREATE POLICY "Everyone can read NAV history" ON public.nav_update_history
  FOR SELECT USING (true);

-- Admin users can manage NAV history
CREATE POLICY "Admin users can manage NAV history" ON public.nav_update_history
  FOR ALL USING (true);

-- Admin sessions policies
CREATE POLICY "Admin users can manage their sessions" ON public.admin_sessions
  FOR ALL USING (true);

-- Create function to calculate proper IRR
CREATE OR REPLACE FUNCTION public.calculate_proper_irr(
  start_nav NUMERIC,
  end_nav NUMERIC,
  days_period INTEGER
) RETURNS NUMERIC AS $$
BEGIN
  -- Handle edge cases
  IF start_nav IS NULL OR end_nav IS NULL OR start_nav <= 0 OR end_nav <= 0 OR days_period <= 0 THEN
    RETURN 0;
  END IF;
  
  -- If less than 30 days, return simple percentage
  IF days_period < 30 THEN
    RETURN ((end_nav - start_nav) / start_nav) * 100;
  END IF;
  
  -- Calculate annualized return with proper bounds checking
  DECLARE
    ratio NUMERIC;
    power_factor NUMERIC;
    irr_result NUMERIC;
  BEGIN
    ratio := end_nav / start_nav;
    power_factor := 365.0 / days_period;
    
    -- Ensure ratio is positive and reasonable
    IF ratio <= 0 THEN
      RETURN -100;
    END IF;
    
    -- Calculate IRR with bounds
    irr_result := (POWER(ratio, power_factor) - 1) * 100;
    
    -- Cap extreme values
    IF irr_result > 1000 THEN
      RETURN 1000;
    ELSIF irr_result < -100 THEN
      RETURN -100;
    END IF;
    
    RETURN ROUND(irr_result, 2);
  END;
END;
$$ LANGUAGE plpgsql;

-- Update existing IRR calculation function
CREATE OR REPLACE FUNCTION public.calculate_fund_irr(p_fund_id uuid, p_start_date date, p_end_date date)
RETURNS numeric
LANGUAGE plpgsql
AS $$
DECLARE
  start_nav DECIMAL(10,4);
  end_nav DECIMAL(10,4);
  days_diff INTEGER;
BEGIN
  -- Get NAV at start date (or closest previous date)
  SELECT nav_value INTO start_nav
  FROM mutual_fund_nav_history
  WHERE fund_id = p_fund_id AND nav_date <= p_start_date
  ORDER BY nav_date DESC
  LIMIT 1;
  
  -- Get NAV at end date (or closest previous date)
  SELECT nav_value INTO end_nav
  FROM mutual_fund_nav_history
  WHERE fund_id = p_fund_id AND nav_date <= p_end_date
  ORDER BY nav_date DESC
  LIMIT 1;
  
  days_diff := p_end_date - p_start_date;
  
  RETURN calculate_proper_irr(start_nav, end_nav, days_diff);
END;
$$;

-- Create default admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash, full_name) VALUES
('admin@sipbrewery.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'SIP Brewery Admin')
ON CONFLICT (email) DO NOTHING;
