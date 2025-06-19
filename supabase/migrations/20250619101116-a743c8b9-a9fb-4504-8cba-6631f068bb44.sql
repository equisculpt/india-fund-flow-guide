
-- Create table for storing uploaded AMC portfolio files
CREATE TABLE IF NOT EXISTS public.amc_portfolio_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amc_name TEXT NOT NULL,
  portfolio_date DATE NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_data TEXT NOT NULL, -- Base64 encoded file content
  upload_status TEXT DEFAULT 'uploaded' CHECK (upload_status IN ('uploaded', 'processing', 'processed', 'error')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(amc_name, portfolio_date, file_name)
);

-- Create table for parsed portfolio holdings data
CREATE TABLE IF NOT EXISTS public.portfolio_holdings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_code TEXT NOT NULL,
  scheme_name TEXT NOT NULL,
  amc_name TEXT NOT NULL,
  portfolio_date DATE NOT NULL,
  security_name TEXT NOT NULL,
  isin_code TEXT,
  sector TEXT,
  industry TEXT,
  market_value DECIMAL(15,2),
  percentage_holding DECIMAL(5,2) NOT NULL,
  quantity BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(scheme_code, portfolio_date, security_name)
);

-- Create table for tracking portfolio changes
CREATE TABLE IF NOT EXISTS public.portfolio_changes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  scheme_code TEXT NOT NULL,
  amc_name TEXT NOT NULL,
  security_name TEXT NOT NULL,
  change_date DATE NOT NULL,
  change_type TEXT NOT NULL CHECK (change_type IN ('added', 'removed', 'increased', 'decreased')),
  old_percentage DECIMAL(5,2),
  new_percentage DECIMAL(5,2),
  percentage_change DECIMAL(5,2),
  impact_analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for user portfolio consolidation
CREATE TABLE IF NOT EXISTS public.user_consolidated_holdings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  security_name TEXT NOT NULL,
  isin_code TEXT,
  total_value DECIMAL(15,2) NOT NULL,
  total_percentage DECIMAL(5,2) NOT NULL,
  scheme_breakdown JSONB NOT NULL, -- Array of {scheme_code, scheme_name, percentage, value}
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, security_name)
);

-- Add RLS policies
ALTER TABLE public.amc_portfolio_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_consolidated_holdings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read and insert files
CREATE POLICY "Allow authenticated users to read portfolio files" ON public.amc_portfolio_files
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert portfolio files" ON public.amc_portfolio_files
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update portfolio files" ON public.amc_portfolio_files
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Portfolio holdings policies
CREATE POLICY "Allow authenticated users to read portfolio holdings" ON public.portfolio_holdings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view their own consolidated holdings" ON public.user_consolidated_holdings
  FOR SELECT USING (auth.uid() = user_id);

-- Portfolio changes policies  
CREATE POLICY "Allow authenticated users to read portfolio changes" ON public.portfolio_changes
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_amc_portfolio_files_amc_date ON public.amc_portfolio_files(amc_name, portfolio_date);
CREATE INDEX IF NOT EXISTS idx_portfolio_holdings_scheme_date ON public.portfolio_holdings(scheme_code, portfolio_date);
CREATE INDEX IF NOT EXISTS idx_portfolio_holdings_security ON public.portfolio_holdings(security_name, amc_name);
CREATE INDEX IF NOT EXISTS idx_user_consolidated_holdings_user ON public.user_consolidated_holdings(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_changes_scheme_date ON public.portfolio_changes(scheme_code, change_date);
