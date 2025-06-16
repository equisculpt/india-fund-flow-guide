
-- Create table for storing daily fund analysis results
CREATE TABLE public.daily_fund_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_code TEXT NOT NULL,
  scheme_name TEXT NOT NULL,
  nav NUMERIC(12,4) NOT NULL,
  nav_date DATE NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  amc_name TEXT NOT NULL,
  ai_score NUMERIC(3,1) NOT NULL,
  confidence NUMERIC(3,2) NOT NULL,
  predicted_3month_return NUMERIC(5,2) NOT NULL,
  historical_3month_data JSONB,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH')),
  volatility_score NUMERIC(3,1) NOT NULL,
  sharpe_ratio NUMERIC(4,2) NOT NULL,
  performance_rank INTEGER NOT NULL,
  total_schemes_in_category INTEGER NOT NULL,
  analysis_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_daily_fund_analysis_scheme_code ON public.daily_fund_analysis(scheme_code);
CREATE INDEX idx_daily_fund_analysis_ai_score ON public.daily_fund_analysis(ai_score DESC);
CREATE INDEX idx_daily_fund_analysis_category ON public.daily_fund_analysis(category);
CREATE INDEX idx_daily_fund_analysis_analysis_date ON public.daily_fund_analysis(analysis_date DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE public.daily_fund_analysis ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for fund analysis data
CREATE POLICY "Allow public read access to daily fund analysis" 
  ON public.daily_fund_analysis 
  FOR SELECT 
  USING (true);

-- Create table for storing extended NAV history for charts
CREATE TABLE public.extended_nav_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_code TEXT NOT NULL,
  nav_date DATE NOT NULL,
  nav_value NUMERIC(12,4) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(scheme_code, nav_date)
);

-- Create indexes for extended NAV history
CREATE INDEX idx_extended_nav_history_scheme_code ON public.extended_nav_history(scheme_code);
CREATE INDEX idx_extended_nav_history_date ON public.extended_nav_history(nav_date DESC);

-- Enable RLS for extended NAV history
ALTER TABLE public.extended_nav_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for NAV history
CREATE POLICY "Allow public read access to extended nav history" 
  ON public.extended_nav_history 
  FOR SELECT 
  USING (true);

-- Create a function to calculate IRR (Internal Rate of Return)
CREATE OR REPLACE FUNCTION calculate_irr_for_period(
  start_nav NUMERIC,
  end_nav NUMERIC,
  days_period INTEGER
) RETURNS NUMERIC AS $$
BEGIN
  IF start_nav <= 0 OR end_nav <= 0 OR days_period <= 0 THEN
    RETURN 0;
  END IF;
  
  -- Calculate annualized return (IRR)
  RETURN (POWER(end_nav / start_nav, 365.0 / days_period) - 1) * 100;
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate SIP returns for a given period
CREATE OR REPLACE FUNCTION calculate_sip_irr(
  scheme_code_param TEXT,
  start_date_param DATE,
  end_date_param DATE,
  monthly_sip_amount NUMERIC DEFAULT 10000
) RETURNS TABLE(
  total_invested NUMERIC,
  final_value NUMERIC,
  absolute_return NUMERIC,
  irr_percentage NUMERIC
) AS $$
DECLARE
  current_date_iter DATE;
  nav_on_date NUMERIC;
  units_bought NUMERIC;
  total_units NUMERIC := 0;
  total_investment NUMERIC := 0;
  final_nav NUMERIC;
BEGIN
  -- Get final NAV
  SELECT nav_value INTO final_nav
  FROM extended_nav_history
  WHERE scheme_code = scheme_code_param 
    AND nav_date <= end_date_param
  ORDER BY nav_date DESC
  LIMIT 1;
  
  IF final_nav IS NULL THEN
    RETURN;
  END IF;
  
  -- Calculate SIP investments month by month
  current_date_iter := start_date_param;
  
  WHILE current_date_iter <= end_date_param LOOP
    -- Get NAV for this date (or closest previous date)
    SELECT nav_value INTO nav_on_date
    FROM extended_nav_history
    WHERE scheme_code = scheme_code_param 
      AND nav_date <= current_date_iter
    ORDER BY nav_date DESC
    LIMIT 1;
    
    IF nav_on_date IS NOT NULL AND nav_on_date > 0 THEN
      units_bought := monthly_sip_amount / nav_on_date;
      total_units := total_units + units_bought;
      total_investment := total_investment + monthly_sip_amount;
    END IF;
    
    -- Move to next month
    current_date_iter := current_date_iter + INTERVAL '1 month';
  END LOOP;
  
  -- Calculate returns
  total_invested := total_investment;
  final_value := total_units * final_nav;
  absolute_return := final_value - total_investment;
  
  -- Calculate IRR
  IF total_investment > 0 THEN
    irr_percentage := calculate_irr_for_period(
      total_investment / total_units, -- Average buy price
      final_nav,
      end_date_param - start_date_param
    );
  ELSE
    irr_percentage := 0;
  END IF;
  
  RETURN QUERY SELECT total_invested, final_value, absolute_return, irr_percentage;
END;
$$ LANGUAGE plpgsql;
