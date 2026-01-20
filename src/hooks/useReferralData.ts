
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ReferralCommission {
  id: string;
  referrer_id: string;
  referee_id: string;
  investment_id: string;
  commission_amount: number;
  commission_rate: number;
  max_commission: number;
  status: string;
  created_at: string;
  paid_at: string | null;
  referee_profile?: {
    full_name: string;
  };
}

export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingCommission: number;
  referralCode: string;
}

// Mock referral data for prototype
const mockReferralStats: ReferralStats = {
  totalReferrals: 12,
  activeReferrals: 8,
  totalEarnings: 15000,
  pendingCommission: 3500,
  referralCode: 'SIPREF2024'
};

const mockReferralCommissions: ReferralCommission[] = [
  {
    id: 'rc-1',
    referrer_id: 'user-1',
    referee_id: 'ref-1',
    investment_id: 'inv-1',
    commission_amount: 2500,
    commission_rate: 1.5,
    max_commission: 5000,
    status: 'earned',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    paid_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    referee_profile: { full_name: 'Rahul Sharma' }
  },
  {
    id: 'rc-2',
    referrer_id: 'user-1',
    referee_id: 'ref-2',
    investment_id: 'inv-2',
    commission_amount: 1500,
    commission_rate: 1.5,
    max_commission: 5000,
    status: 'pending',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    paid_at: null,
    referee_profile: { full_name: 'Priya Patel' }
  },
  {
    id: 'rc-3',
    referrer_id: 'user-1',
    referee_id: 'ref-3',
    investment_id: 'inv-3',
    commission_amount: 2000,
    commission_rate: 1.5,
    max_commission: 5000,
    status: 'pending',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    paid_at: null,
    referee_profile: { full_name: 'Amit Kumar' }
  }
];

export const useReferralStats = () => {
  return useQuery({
    queryKey: ['referral-stats'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockReferralStats;
    },
    enabled: true,
  });
};

export const useReferralCommissions = () => {
  return useQuery({
    queryKey: ['referral-commissions'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockReferralCommissions;
    },
    enabled: true,
  });
};
