
-- Create table to store AMFI portfolio links and metadata
CREATE TABLE IF NOT EXISTS public.amfi_portfolio_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amc_name TEXT NOT NULL,
  portfolio_url TEXT NOT NULL,
  portfolio_date DATE NOT NULL,
  file_type TEXT NOT NULL, -- 'XLS', 'XLSX', 'PDF'
  scrape_status TEXT DEFAULT 'pending', -- 'pending', 'downloaded', 'parsed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table to store detailed portfolio data
CREATE TABLE IF NOT EXISTS public.amfi_portfolio_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_code TEXT NOT NULL,
  scheme_name TEXT NOT NULL,
  amc_name TEXT NOT NULL,
  portfolio_date DATE NOT NULL,
  portfolio_data JSONB NOT NULL, -- Structured portfolio holdings
  scrape_status TEXT DEFAULT 'success',
  scrape_source TEXT DEFAULT 'amfi_disclosure',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table to track scraping logs and errors
CREATE TABLE IF NOT EXISTS public.amfi_scrape_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_code TEXT,
  amc_name TEXT,
  status TEXT NOT NULL, -- 'success', 'failed', 'partial'
  error_message TEXT,
  file_url TEXT,
  attempt_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  additional_data JSONB
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_amfi_portfolio_data_scheme_code ON public.amfi_portfolio_data(scheme_code);
CREATE INDEX IF NOT EXISTS idx_amfi_portfolio_data_amc_name ON public.amfi_portfolio_data(amc_name);
CREATE INDEX IF NOT EXISTS idx_amfi_portfolio_data_date ON public.amfi_portfolio_data(portfolio_date);
CREATE INDEX IF NOT EXISTS idx_amfi_portfolio_links_amc ON public.amfi_portfolio_links(amc_name);
CREATE INDEX IF NOT EXISTS idx_amfi_portfolio_links_status ON public.amfi_portfolio_links(scrape_status);
CREATE INDEX IF NOT EXISTS idx_amfi_scrape_logs_status ON public.amfi_scrape_logs(status);

-- Enable RLS (Row Level Security) but allow public access for this read-only data
ALTER TABLE public.amfi_portfolio_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amfi_portfolio_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amfi_scrape_logs ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (since this is public AMFI data)
CREATE POLICY "Allow public read access to portfolio links" ON public.amfi_portfolio_links FOR SELECT USING (true);
CREATE POLICY "Allow public read access to portfolio data" ON public.amfi_portfolio_data FOR SELECT USING (true);
CREATE POLICY "Allow public read access to scrape logs" ON public.amfi_scrape_logs FOR SELECT USING (true);

-- Create policies to allow service role to insert/update
CREATE POLICY "Allow service role to manage portfolio links" ON public.amfi_portfolio_links FOR ALL USING (true);
CREATE POLICY "Allow service role to manage portfolio data" ON public.amfi_portfolio_data FOR ALL USING (true);
CREATE POLICY "Allow service role to manage scrape logs" ON public.amfi_scrape_logs FOR ALL USING (true);
