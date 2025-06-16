
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

-- Add RLS policies
ALTER TABLE public.amc_portfolio_files ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read and insert files
CREATE POLICY "Allow authenticated users to read files" ON public.amc_portfolio_files
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert files" ON public.amc_portfolio_files
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update files" ON public.amc_portfolio_files
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_amc_portfolio_files_amc_date ON public.amc_portfolio_files(amc_name, portfolio_date);
CREATE INDEX IF NOT EXISTS idx_amc_portfolio_files_status ON public.amc_portfolio_files(upload_status);
