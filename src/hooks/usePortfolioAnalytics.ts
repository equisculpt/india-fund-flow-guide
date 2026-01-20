
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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

// Generate mock portfolio analytics
const generateMockPortfolioAnalytics = (userId: string): PortfolioAnalytics[] => {
  const analytics: PortfolioAnalytics[] = [];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const baseValue = 500000 + Math.random() * 500000;
    const returns = (Math.random() - 0.3) * 20;
    
    analytics.push({
      id: `analytics-${i}`,
      user_id: userId,
      portfolio_value: baseValue * (1 + i * 0.002),
      total_returns: baseValue * returns / 100,
      return_percentage: returns,
      risk_score: 3 + Math.random() * 4,
      benchmark_comparison: (Math.random() - 0.5) * 5,
      peer_percentile: 50 + (Math.random() - 0.5) * 40,
      volatility: 10 + Math.random() * 10,
      sharpe_ratio: 0.5 + Math.random() * 1.5,
      analysis_date: date.toISOString(),
      created_at: date.toISOString()
    });
  }
  
  return analytics;
};

// Generate mock AI insights
const generateMockAIInsights = (userId: string): AIInsight[] => {
  return [
    {
      id: 'insight-1',
      user_id: userId,
      insight_type: 'rebalance',
      title: 'Portfolio Rebalancing Recommended',
      message: 'Your equity allocation has increased to 75%. Consider rebalancing to maintain your target 60-40 allocation.',
      priority: 'high',
      action_required: true,
      data_points: { current_equity: 75, target_equity: 60 },
      is_read: false,
      is_sent: true,
      created_at: new Date().toISOString(),
      expires_at: null
    },
    {
      id: 'insight-2',
      user_id: userId,
      insight_type: 'opportunity',
      title: 'New Fund Opportunity',
      message: 'Based on your risk profile, the new HDFC Small Cap Fund might be a good addition to diversify your portfolio.',
      priority: 'medium',
      action_required: false,
      data_points: { fund_name: 'HDFC Small Cap Fund', expected_returns: 15 },
      is_read: false,
      is_sent: true,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      expires_at: null
    },
    {
      id: 'insight-3',
      user_id: userId,
      insight_type: 'performance',
      title: 'Strong Q3 Performance',
      message: 'Your portfolio outperformed the benchmark by 3.2% this quarter. Great job staying invested!',
      priority: 'low',
      action_required: false,
      data_points: { outperformance: 3.2, benchmark: 'Nifty 50' },
      is_read: true,
      is_sent: true,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      expires_at: null
    }
  ];
};

// Generate mock peer comparisons
const generateMockPeerComparisons = (userId: string): PeerComparison[] => {
  return [
    {
      id: 'peer-1',
      user_id: userId,
      risk_category: 'Moderate',
      user_returns: 12.5,
      peer_average_returns: 10.2,
      top_10_percent_returns: 18.5,
      bottom_10_percent_returns: 3.2,
      total_peers: 5420,
      user_rank: 1250,
      comparison_period: '1Y',
      analysis_date: new Date().toISOString(),
      created_at: new Date().toISOString()
    }
  ];
};

export const usePortfolioAnalytics = () => {
  return useQuery({
    queryKey: ['portfolio-analytics'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      return generateMockPortfolioAnalytics('mock-user');
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

export const useAIInsights = () => {
  return useQuery({
    queryKey: ['ai-insights'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      return generateMockAIInsights('mock-user');
    },
    refetchInterval: 60000, // Refetch every minute for real-time updates
  });
};

export const usePeerComparisons = () => {
  return useQuery({
    queryKey: ['peer-comparisons'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      return generateMockPeerComparisons('mock-user');
    },
  });
};

export const useCalculatePortfolioAnalytics = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      // Simulate calculation
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Portfolio analytics calculated');
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
      // Simulate AI insight generation
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('AI insights generated');
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
      // Simulate marking as read
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log('Insight marked as read:', insightId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-insights'] });
    },
  });
};
