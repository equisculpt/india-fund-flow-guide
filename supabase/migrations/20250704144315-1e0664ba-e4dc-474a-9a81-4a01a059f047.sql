-- BSE STAR MF Integration Tables

-- BSE Client Registration Table
CREATE TABLE public.bse_clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  client_code TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  pan_number TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT NOT NULL,
  bank_account_number TEXT,
  ifsc_code TEXT,
  registration_status TEXT DEFAULT 'pending' CHECK (registration_status IN ('pending', 'active', 'suspended', 'rejected')),
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  fatca_status TEXT DEFAULT 'pending' CHECK (fatca_status IN ('pending', 'completed', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- BSE Orders Table
CREATE TABLE public.bse_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  client_code TEXT NOT NULL,
  order_number TEXT UNIQUE,
  scheme_code TEXT NOT NULL,
  scheme_name TEXT,
  order_type TEXT NOT NULL CHECK (order_type IN ('PURCHASE', 'REDEMPTION', 'SIP', 'STP', 'SWP')),
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('NEW', 'ADDITIONAL')),
  amount DECIMAL(15,2),
  quantity DECIMAL(15,4),
  folio_number TEXT,
  dp_transaction TEXT DEFAULT 'P' CHECK (dp_transaction IN ('P', 'D')),
  all_redeem TEXT DEFAULT 'N' CHECK (all_redeem IN ('Y', 'N')),
  order_value DECIMAL(15,2),
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  settlement_type TEXT DEFAULT 'RTGS' CHECK (settlement_type IN ('RTGS', 'NEFT')),
  order_status TEXT DEFAULT 'PENDING' CHECK (order_status IN ('PENDING', 'ACCEPTED', 'REJECTED', 'PROCESSED', 'CANCELLED')),
  bse_order_id TEXT,
  remarks TEXT,
  rejection_reason TEXT,
  units_allotted DECIMAL(15,4),
  nav DECIMAL(10,4),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- BSE SIP Registration Table
CREATE TABLE public.bse_sips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  client_code TEXT NOT NULL,
  sip_reg_id TEXT UNIQUE,
  scheme_code TEXT NOT NULL,
  scheme_name TEXT,
  sip_amount DECIMAL(15,2) NOT NULL,
  installment_amount DECIMAL(15,2) NOT NULL,
  frequency TEXT NOT NULL CHECK (frequency IN ('MONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'YEARLY')),
  sip_date INTEGER NOT NULL CHECK (sip_date BETWEEN 1 AND 28),
  start_date DATE NOT NULL,
  end_date DATE,
  folio_number TEXT,
  mandate_id TEXT,
  bank_account_number TEXT,
  ifsc_code TEXT,
  sip_status TEXT DEFAULT 'PENDING' CHECK (sip_status IN ('PENDING', 'ACTIVE', 'PAUSED', 'CANCELLED', 'COMPLETED')),
  registration_date DATE DEFAULT CURRENT_DATE,
  first_order_today TEXT DEFAULT 'Y' CHECK (first_order_today IN ('Y', 'N')),
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- BSE Holdings Table
CREATE TABLE public.bse_holdings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  client_code TEXT NOT NULL,
  scheme_code TEXT NOT NULL,
  scheme_name TEXT,
  folio_number TEXT NOT NULL,
  holding_units DECIMAL(15,4) NOT NULL DEFAULT 0,
  available_units DECIMAL(15,4) NOT NULL DEFAULT 0,
  pledged_units DECIMAL(15,4) NOT NULL DEFAULT 0,
  price DECIMAL(10,4),
  nav_date DATE,
  market_value DECIMAL(15,2),
  invested_value DECIMAL(15,2),
  last_transaction_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(client_code, scheme_code, folio_number)
);

-- BSE Transaction History
CREATE TABLE public.bse_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  client_code TEXT NOT NULL,
  order_id TEXT,
  scheme_code TEXT NOT NULL,
  scheme_name TEXT,
  folio_number TEXT,
  transaction_date DATE NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('PURCHASE', 'REDEMPTION', 'DIVIDEND', 'SIP')),
  amount DECIMAL(15,2),
  units DECIMAL(15,4),
  nav DECIMAL(10,4),
  total_amount DECIMAL(15,2),
  balance_units DECIMAL(15,4) DEFAULT 0,
  settlement_date DATE,
  source TEXT DEFAULT 'BSE' CHECK (source IN ('BSE', 'DIRECT', 'MANUAL')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- BSE API Logs
CREATE TABLE public.bse_api_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  api_endpoint TEXT NOT NULL,
  request_method TEXT NOT NULL,
  request_payload JSONB,
  response_payload JSONB,
  response_status INTEGER,
  execution_time_ms INTEGER,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bse_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bse_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bse_sips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bse_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bse_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bse_api_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for BSE Clients
CREATE POLICY "Users can view their own BSE client data" 
ON public.bse_clients 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own BSE client data" 
ON public.bse_clients 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own BSE client data" 
ON public.bse_clients 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for BSE Orders
CREATE POLICY "Users can view their own BSE orders" 
ON public.bse_orders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own BSE orders" 
ON public.bse_orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own BSE orders" 
ON public.bse_orders 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for BSE SIPs
CREATE POLICY "Users can view their own BSE SIPs" 
ON public.bse_sips 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own BSE SIPs" 
ON public.bse_sips 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own BSE SIPs" 
ON public.bse_sips 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for BSE Holdings
CREATE POLICY "Users can view their own BSE holdings" 
ON public.bse_holdings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own BSE holdings" 
ON public.bse_holdings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own BSE holdings" 
ON public.bse_holdings 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for BSE Transactions
CREATE POLICY "Users can view their own BSE transactions" 
ON public.bse_transactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own BSE transactions" 
ON public.bse_transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for BSE API Logs (optional - for debugging)
CREATE POLICY "Users can view their own BSE API logs" 
ON public.bse_api_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own BSE API logs" 
ON public.bse_api_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_bse_clients_user_id ON public.bse_clients(user_id);
CREATE INDEX idx_bse_clients_client_code ON public.bse_clients(client_code);
CREATE INDEX idx_bse_orders_user_id ON public.bse_orders(user_id);
CREATE INDEX idx_bse_orders_client_code ON public.bse_orders(client_code);
CREATE INDEX idx_bse_orders_order_date ON public.bse_orders(order_date);
CREATE INDEX idx_bse_sips_user_id ON public.bse_sips(user_id);
CREATE INDEX idx_bse_sips_client_code ON public.bse_sips(client_code);
CREATE INDEX idx_bse_holdings_user_id ON public.bse_holdings(user_id);
CREATE INDEX idx_bse_holdings_client_code ON public.bse_holdings(client_code);
CREATE INDEX idx_bse_transactions_user_id ON public.bse_transactions(user_id);
CREATE INDEX idx_bse_transactions_date ON public.bse_transactions(transaction_date);

-- Triggers for updated_at
CREATE TRIGGER update_bse_clients_updated_at
BEFORE UPDATE ON public.bse_clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bse_orders_updated_at
BEFORE UPDATE ON public.bse_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bse_sips_updated_at
BEFORE UPDATE ON public.bse_sips
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bse_holdings_updated_at
BEFORE UPDATE ON public.bse_holdings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();