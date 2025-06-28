
-- Create loyalty rewards tracking table
CREATE TABLE public.loyalty_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  investment_id UUID REFERENCES public.investments(id),
  platform_commission DECIMAL(12,2) NOT NULL,
  reward_percentage DECIMAL(5,2) DEFAULT 30.00, -- 20-40% of platform commission
  reward_amount DECIMAL(12,2) NOT NULL,
  reward_year INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'credited', 'cancelled'
  credited_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.loyalty_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own loyalty rewards" ON public.loyalty_rewards FOR SELECT USING (auth.uid() = user_id);
