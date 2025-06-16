
-- Enable Row Level Security on mutual_fund_nav_history table
ALTER TABLE public.mutual_fund_nav_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read NAV history (public data)
CREATE POLICY "NAV history is publicly readable" 
ON public.mutual_fund_nav_history 
FOR SELECT 
USING (true);

-- Enable Row Level Security on sip_transactions table
ALTER TABLE public.sip_transactions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view only their own SIP transactions
CREATE POLICY "Users can view their own SIP transactions" 
ON public.sip_transactions 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own SIP transactions
CREATE POLICY "Users can create their own SIP transactions" 
ON public.sip_transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own SIP transactions
CREATE POLICY "Users can update their own SIP transactions" 
ON public.sip_transactions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own SIP transactions
CREATE POLICY "Users can delete their own SIP transactions" 
ON public.sip_transactions 
FOR DELETE 
USING (auth.uid() = user_id);
