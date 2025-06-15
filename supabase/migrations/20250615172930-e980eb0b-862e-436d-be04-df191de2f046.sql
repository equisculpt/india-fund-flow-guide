
-- Create table for investor reviews and testimonials
CREATE TABLE public.investor_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  investment_amount NUMERIC,
  monthly_sip_amount NUMERIC,
  is_featured BOOLEAN DEFAULT false,
  ai_enhanced_text TEXT, -- AI-enhanced version for featured reviews
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.investor_reviews ENABLE ROW LEVEL SECURITY;

-- Users can view all published reviews
CREATE POLICY "Users can view all reviews" 
  ON public.investor_reviews 
  FOR SELECT 
  USING (true);

-- Users can create their own reviews
CREATE POLICY "Users can create their own reviews" 
  ON public.investor_reviews 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update their own reviews" 
  ON public.investor_reviews 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create table for real investor statistics
CREATE TABLE public.investor_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_investors INTEGER DEFAULT 0,
  total_amount_invested NUMERIC DEFAULT 0,
  average_rating NUMERIC DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert initial stats row
INSERT INTO public.investor_stats (total_investors, total_amount_invested, average_rating, total_reviews)
VALUES (0, 0, 0, 0);

-- Create function to update investor stats
CREATE OR REPLACE FUNCTION update_investor_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update stats based on current data
  UPDATE public.investor_stats 
  SET 
    total_reviews = (SELECT COUNT(*) FROM public.investor_reviews),
    average_rating = (SELECT COALESCE(AVG(rating), 0) FROM public.investor_reviews),
    total_investors = (SELECT COUNT(DISTINCT user_id) FROM public.profiles WHERE user_type = 'customer'),
    total_amount_invested = (SELECT COALESCE(SUM(total_invested), 0) FROM public.investments),
    last_updated = now()
  WHERE id = (SELECT id FROM public.investor_stats LIMIT 1);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to auto-update stats
CREATE TRIGGER update_stats_on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON public.investor_reviews
  FOR EACH ROW EXECUTE FUNCTION update_investor_stats();

CREATE TRIGGER update_stats_on_investment_change
  AFTER INSERT OR UPDATE OR DELETE ON public.investments
  FOR EACH ROW EXECUTE FUNCTION update_investor_stats();

CREATE TRIGGER update_stats_on_profile_change
  AFTER INSERT OR UPDATE OR DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_investor_stats();
