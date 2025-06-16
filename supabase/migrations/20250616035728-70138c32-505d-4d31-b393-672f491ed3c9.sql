
-- Create table for storing daily NAV history
CREATE TABLE mutual_fund_nav_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fund_id UUID REFERENCES mutual_funds(id) ON DELETE CASCADE,
  nav_date DATE NOT NULL,
  nav_value DECIMAL(10,4) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(fund_id, nav_date)
);

-- Create index for faster queries
CREATE INDEX idx_nav_history_fund_date ON mutual_fund_nav_history(fund_id, nav_date DESC);

-- Create table for SIP transactions and tracking
CREATE TABLE sip_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  fund_id UUID REFERENCES mutual_funds(id) ON DELETE CASCADE,
  sip_amount DECIMAL(10,2) NOT NULL,
  transaction_date DATE NOT NULL,
  nav_on_date DECIMAL(10,4) NOT NULL,
  units_allocated DECIMAL(12,6) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for SIP transactions
CREATE INDEX idx_sip_transactions_user_fund ON sip_transactions(user_id, fund_id, transaction_date DESC);

-- Function to calculate IRR for a given time period
CREATE OR REPLACE FUNCTION calculate_fund_irr(
  p_fund_id UUID,
  p_start_date DATE,
  p_end_date DATE
) RETURNS DECIMAL(8,4) AS $$
DECLARE
  start_nav DECIMAL(10,4);
  end_nav DECIMAL(10,4);
  days_diff INTEGER;
  annual_return DECIMAL(8,4);
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
  
  IF start_nav IS NULL OR end_nav IS NULL OR start_nav = 0 THEN
    RETURN 0;
  END IF;
  
  days_diff := p_end_date - p_start_date;
  
  IF days_diff <= 0 THEN
    RETURN 0;
  END IF;
  
  -- Calculate annualized return
  annual_return := (POWER(end_nav / start_nav, 365.0 / days_diff) - 1) * 100;
  
  RETURN annual_return;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate SIP returns
CREATE OR REPLACE FUNCTION calculate_sip_returns(
  p_user_id UUID,
  p_fund_id UUID,
  p_start_date DATE,
  p_end_date DATE
) RETURNS TABLE(
  total_invested DECIMAL(15,2),
  total_units DECIMAL(15,6),
  current_value DECIMAL(15,2),
  absolute_returns DECIMAL(15,2),
  percentage_returns DECIMAL(8,4),
  xirr DECIMAL(8,4)
) AS $$
DECLARE
  current_nav DECIMAL(10,4);
BEGIN
  -- Get current NAV
  SELECT nav_value INTO current_nav
  FROM mutual_fund_nav_history
  WHERE fund_id = p_fund_id
  ORDER BY nav_date DESC
  LIMIT 1;
  
  RETURN QUERY
  SELECT 
    SUM(st.sip_amount) as total_invested,
    SUM(st.units_allocated) as total_units,
    SUM(st.units_allocated) * current_nav as current_value,
    (SUM(st.units_allocated) * current_nav) - SUM(st.sip_amount) as absolute_returns,
    (((SUM(st.units_allocated) * current_nav) - SUM(st.sip_amount)) / SUM(st.sip_amount)) * 100 as percentage_returns,
    calculate_fund_irr(p_fund_id, p_start_date, p_end_date) as xirr
  FROM sip_transactions st
  WHERE st.user_id = p_user_id 
    AND st.fund_id = p_fund_id
    AND st.transaction_date BETWEEN p_start_date AND p_end_date;
END;
$$ LANGUAGE plpgsql;

-- Insert sample NAV history data for demonstration
INSERT INTO mutual_fund_nav_history (fund_id, nav_date, nav_value)
SELECT 
  mf.id,
  generate_series(
    CURRENT_DATE - INTERVAL '365 days',
    CURRENT_DATE,
    INTERVAL '1 day'
  )::DATE as nav_date,
  mf.nav * (1 + (RANDOM() - 0.5) * 0.1) as nav_value
FROM mutual_funds mf
WHERE mf.nav IS NOT NULL;
