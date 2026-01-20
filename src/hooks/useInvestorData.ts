import { useQuery } from "@tanstack/react-query";

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

// Mock investor stats for prototype
const mockInvestorStats: InvestorStats = {
  total_investors: 5000,
  total_amount_invested: 50000000,
  average_rating: 4.8,
  total_reviews: 1250,
  last_updated: new Date().toISOString()
};

// Mock reviews for prototype
const mockReviews: InvestorReview[] = [
  {
    id: '1',
    user_id: 'user-1',
    rating: 5,
    review_text: 'Excellent platform for mutual fund investments. The AI recommendations are spot on!',
    investment_amount: 500000,
    monthly_sip_amount: 10000,
    is_featured: true,
    ai_enhanced_text: null,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    profiles: { full_name: 'Rahul Sharma' }
  },
  {
    id: '2',
    user_id: 'user-2',
    rating: 5,
    review_text: 'Very user-friendly interface. My portfolio has grown significantly since I started using SIP Brewery.',
    investment_amount: 250000,
    monthly_sip_amount: 5000,
    is_featured: true,
    ai_enhanced_text: null,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    profiles: { full_name: 'Priya Patel' }
  },
  {
    id: '3',
    user_id: 'user-3',
    rating: 5,
    review_text: 'The best investment platform I have used. Highly recommend for beginners and experts alike.',
    investment_amount: 1000000,
    monthly_sip_amount: 25000,
    is_featured: true,
    ai_enhanced_text: null,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    profiles: { full_name: 'Amit Kumar' }
  },
  {
    id: '4',
    user_id: 'user-4',
    rating: 4,
    review_text: 'Good service and support. The fund comparison tool is very helpful.',
    investment_amount: 150000,
    monthly_sip_amount: 3000,
    is_featured: false,
    ai_enhanced_text: null,
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    profiles: { full_name: 'Sneha Reddy' }
  }
];

export const useInvestorStats = () => {
  return useQuery({
    queryKey: ['investor-stats'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockInvestorStats;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false
  });
};

export const useFeaturedReviews = () => {
  return useQuery({
    queryKey: ['featured-reviews'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockReviews.filter(r => r.is_featured && r.rating === 5);
    },
    refetchInterval: 60000,
  });
};

export const useAllReviews = () => {
  return useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockReviews;
    },
  });
};
