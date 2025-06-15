
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface InvestorStats {
  total_investors: number;
  total_amount_invested: number;
  average_rating: number;
  total_reviews: number;
  last_updated: string;
}

export interface InvestorReview {
  id: string;
  user_id: string;
  rating: number;
  review_text: string;
  investment_amount: number | null;
  monthly_sip_amount: number | null;
  is_featured: boolean;
  ai_enhanced_text: string | null;
  created_at: string;
  profiles?: {
    full_name: string;
  } | null;
}

export const useInvestorStats = () => {
  return useQuery({
    queryKey: ['investor-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investor_stats')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as InvestorStats;
    },
    refetchInterval: 30000, // Refetch every 30 seconds for live data
  });
};

export const useFeaturedReviews = () => {
  return useQuery({
    queryKey: ['featured-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investor_reviews')
        .select(`
          *,
          profiles(full_name)
        `)
        .eq('rating', 5)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as InvestorReview[];
    },
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useAllReviews = () => {
  return useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investor_reviews')
        .select(`
          *,
          profiles(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data as InvestorReview[];
    },
  });
};
