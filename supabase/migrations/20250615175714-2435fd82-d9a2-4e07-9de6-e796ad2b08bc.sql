
-- Create table for portfolio performance analytics
CREATE TABLE public.portfolio_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  portfolio_value DECIMAL(15,2) NOT NULL,
  total_returns DECIMAL(10,2) NOT NULL,
  return_percentage DECIMAL(5,2) NOT NULL,
  risk_score DECIMAL(3,2) NOT NULL,
  benchmark_comparison DECIMAL(5,2) NOT NULL, -- vs benchmark index
  peer_percentile INTEGER NOT NULL, -- percentile rank among peers
  volatility DECIMAL(5,2) NOT NULL,
  sharpe_ratio DECIMAL(5,2) NOT NULL,
  analysis_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for AI-generated portfolio insights
CREATE TABLE public.ai_portfolio_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  insight_type VARCHAR(50) NOT NULL, -- 'performance_alert', 'peer_comparison', 'risk_analysis', 'rebalancing_suggestion'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  action_required BOOLEAN DEFAULT false,
  data_points JSONB, -- Store structured data for charts/comparisons
  is_read BOOLEAN DEFAULT false,
  is_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create table for peer performance comparisons
CREATE TABLE public.peer_comparisons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  risk_category VARCHAR(20) NOT NULL, -- 'Conservative', 'Moderate', 'Aggressive'
  user_returns DECIMAL(5,2) NOT NULL,
  peer_average_returns DECIMAL(5,2) NOT NULL,
  top_10_percent_returns DECIMAL(5,2) NOT NULL,
  bottom_10_percent_returns DECIMAL(5,2) NOT NULL,
  total_peers INTEGER NOT NULL,
  user_rank INTEGER NOT NULL,
  comparison_period VARCHAR(20) NOT NULL, -- '1M', '3M', '6M', '1Y'
  analysis_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE public.portfolio_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_portfolio_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.peer_comparisons ENABLE ROW LEVEL SECURITY;

-- RLS policies for portfolio_analytics
CREATE POLICY "Users can view own portfolio analytics" 
  ON public.portfolio_analytics FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all portfolio analytics" 
  ON public.portfolio_analytics FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- RLS policies for ai_portfolio_insights
CREATE POLICY "Users can view own insights" 
  ON public.ai_portfolio_insights FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own insights read status" 
  ON public.ai_portfolio_insights FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS policies for peer_comparisons
CREATE POLICY "Users can view own peer comparisons" 
  ON public.peer_comparisons FOR SELECT 
  USING (auth.uid() = user_id);

-- Create function to calculate portfolio analytics
CREATE OR REPLACE FUNCTION calculate_portfolio_analytics(target_user_id UUID)
RETURNS VOID AS $$
DECLARE
  user_portfolio RECORD;
  total_investment DECIMAL(15,2);
  current_value DECIMAL(15,2);
  total_returns DECIMAL(10,2);
  return_pct DECIMAL(5,2);
  risk_profile VARCHAR(20);
BEGIN
  -- Get user's portfolio data
  SELECT 
    SUM(total_invested) as total_invested,
    SUM(current_value) as current_value
  INTO user_portfolio
  FROM public.investments 
  WHERE user_id = target_user_id AND status = 'active';
  
  -- Get user's risk profile
  SELECT user_type INTO risk_profile
  FROM public.profiles
  WHERE id = target_user_id;
  
  -- Calculate returns
  total_investment := COALESCE(user_portfolio.total_invested, 0);
  current_value := COALESCE(user_portfolio.current_value, 0);
  total_returns := current_value - total_investment;
  
  IF total_investment > 0 THEN
    return_pct := (total_returns / total_investment) * 100;
  ELSE
    return_pct := 0;
  END IF;
  
  -- Insert/Update analytics
  INSERT INTO public.portfolio_analytics (
    user_id,
    portfolio_value,
    total_returns,
    return_percentage,
    risk_score,
    benchmark_comparison,
    peer_percentile,
    volatility,
    sharpe_ratio
  ) VALUES (
    target_user_id,
    current_value,
    total_returns,
    return_pct,
    CASE 
      WHEN risk_profile = 'Conservative' THEN 3.5
      WHEN risk_profile = 'Moderate' THEN 6.5
      ELSE 8.5
    END,
    return_pct - 12.5, -- Assuming 12.5% benchmark
    FLOOR(RANDOM() * 100) + 1, -- Mock percentile for now
    ABS(RANDOM() * 15) + 5, -- Mock volatility
    return_pct / 10 -- Simple Sharpe ratio calculation
  )
  ON CONFLICT (user_id, analysis_date) 
  DO UPDATE SET
    portfolio_value = EXCLUDED.portfolio_value,
    total_returns = EXCLUDED.total_returns,
    return_percentage = EXCLUDED.return_percentage,
    updated_at = NOW();
    
END;
$$ LANGUAGE plpgsql;

-- Create function to generate AI insights
CREATE OR REPLACE FUNCTION generate_ai_insights(target_user_id UUID)
RETURNS VOID AS $$
DECLARE
  analytics RECORD;
  peer_data RECORD;
  insight_message TEXT;
BEGIN
  -- Get latest analytics
  SELECT * INTO analytics
  FROM public.portfolio_analytics
  WHERE user_id = target_user_id
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- Generate performance comparison insight
  IF analytics.peer_percentile > 75 THEN
    insight_message := FORMAT('Congratulations! Your portfolio is outperforming %s%% of similar investors with returns of %s%%. Keep up the great work!', 
      analytics.peer_percentile, analytics.return_percentage);
    
    INSERT INTO public.ai_portfolio_insights (
      user_id, insight_type, title, message, priority
    ) VALUES (
      target_user_id, 'performance_alert', 'Excellent Performance!', insight_message, 'high'
    );
    
  ELSIF analytics.peer_percentile < 25 THEN
    insight_message := FORMAT('Your portfolio is currently in the bottom %s%% with returns of %s%%. Consider reviewing your investment strategy or rebalancing your portfolio.', 
      100 - analytics.peer_percentile, analytics.return_percentage);
    
    INSERT INTO public.ai_portfolio_insights (
      user_id, insight_type, title, message, priority, action_required
    ) VALUES (
      target_user_id, 'performance_alert', 'Portfolio Review Recommended', insight_message, 'high', true
    );
  END IF;
  
  -- Generate risk analysis insight
  IF analytics.volatility > 20 THEN
    INSERT INTO public.ai_portfolio_insights (
      user_id, insight_type, title, message, priority
    ) VALUES (
      target_user_id, 'risk_analysis', 'High Volatility Detected', 
      FORMAT('Your portfolio volatility is %s%%, which is higher than recommended. Consider diversifying into more stable assets.', analytics.volatility),
      'medium'
    );
  END IF;
  
END;
$$ LANGUAGE plpgsql;
