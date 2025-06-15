
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PortfolioAnalytics {
  id: string;
  user_id: string;
  portfolio_value: number;
  total_returns: number;
  return_percentage: number;
  risk_score: number;
  benchmark_comparison: number;
  peer_percentile: number;
  volatility: number;
  sharpe_ratio: number;
  analysis_date: string;
  created_at: string;
}

export interface AIInsight {
  id: string;
  user_id: string;
  insight_type: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  action_required: boolean;
  data_points: any;
  is_read: boolean;
  is_sent: boolean;
  created_at: string;
  expires_at: string | null;
}

export interface PeerComparison {
  id: string;
  user_id: string;
  risk_category: string;
  user_returns: number;
  peer_average_returns: number;
  top_10_percent_returns: number;
  bottom_10_percent_returns: number;
  total_peers: number;
  user_rank: number;
  comparison_period: string;
  analysis_date: string;
  created_at: string;
}

export const usePortfolioAnalytics = () => {
  return useQuery({
    queryKey: ['portfolio-analytics'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('portfolio_analytics')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) throw error;
      return data as PortfolioAnalytics[];
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

export const useAIInsights = () => {
  return useQuery({
    queryKey: ['ai-insights'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('ai_portfolio_insights')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as AIInsight[];
    },
    refetchInterval: 60000, // Refetch every minute for real-time updates
  });
};

export const usePeerComparisons = () => {
  return useQuery({
    queryKey: ['peer-comparisons'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('peer_comparisons')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data as PeerComparison[];
    },
  });
};

export const useCalculatePortfolioAnalytics = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.rpc('calculate_portfolio_analytics', {
        target_user_id: user.id
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-analytics'] });
    },
  });
};

export const useGenerateAIInsights = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.rpc('generate_ai_insights', {
        target_user_id: user.id
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-insights'] });
    },
  });
};

export const useMarkInsightAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (insightId: string) => {
      const { error } = await supabase
        .from('ai_portfolio_insights')
        .update({ is_read: true })
        .eq('id', insightId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-insights'] });
    },
  });
};
