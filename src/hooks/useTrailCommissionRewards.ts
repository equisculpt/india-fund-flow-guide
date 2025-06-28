
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MockCommissionRecord {
  id: string;
  commission_month: string;
  fund_name: string;
  scheme_code: string;
  outstanding_investment_value: number;
  monthly_commission_earned: number;
  user_reward_amount: number;
  user_reward_percentage: number;
}

export interface MockWalletSummary {
  total_pending_rewards: number;
  total_lifetime_rewards: number;
  last_payout_date: string | null;
  last_payout_amount: number;
  next_payout_eligible_date: string | null;
}

export interface MockPayoutRecord {
  id: string;
  payout_year: number;
  total_commission_earned: number;
  user_reward_amount: number;
  payout_date: string;
  tds_deducted: number;
  net_payout_amount: number;
  statement_generated: boolean;
}

export interface MockCommissionRate {
  id: string;
  scheme_code: string;
  annual_commission_rate: number;
  effective_from: string;
}

export const useRewardWalletSummary = () => {
  return useQuery({
    queryKey: ['reward-wallet-summary'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Mock data for demonstration - replace with actual implementation once DB is set up
      const mockSummary: MockWalletSummary = {
        total_pending_rewards: 1250.50,
        total_lifetime_rewards: 3450.75,
        last_payout_date: '2023-10-15',
        last_payout_amount: 2200.25,
        next_payout_eligible_date: '2024-10-15'
      };

      return mockSummary;
    }
  });
};

export const useMonthlyCommissionHistory = () => {
  return useQuery({
    queryKey: ['monthly-commission-history'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Mock data for demonstration - replace with actual implementation once DB is set up
      const mockHistory: MockCommissionRecord[] = [
        {
          id: '1',
          commission_month: '2024-01-01',
          fund_name: 'SBI Blue Chip Fund',
          scheme_code: 'SBI001',
          outstanding_investment_value: 50000,
          monthly_commission_earned: 41.67,
          user_reward_amount: 12.50,
          user_reward_percentage: 30
        },
        {
          id: '2',
          commission_month: '2024-02-01',
          fund_name: 'HDFC Top 100 Fund',
          scheme_code: 'HDFC001',
          outstanding_investment_value: 75000,
          monthly_commission_earned: 62.50,
          user_reward_amount: 18.75,
          user_reward_percentage: 30
        }
      ];

      return mockHistory;
    }
  });
};

export const useAnnualPayoutHistory = () => {
  return useQuery({
    queryKey: ['annual-payout-history'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Mock data for demonstration - replace with actual implementation once DB is set up
      const mockPayouts: MockPayoutRecord[] = [
        {
          id: '1',
          payout_year: 2023,
          total_commission_earned: 7500,
          user_reward_amount: 2250,
          payout_date: '2023-10-15',
          tds_deducted: 225,
          net_payout_amount: 2025,
          statement_generated: true
        }
      ];

      return mockPayouts;
    }
  });
};

export const useCommissionRates = () => {
  return useQuery({
    queryKey: ['commission-rates'],
    queryFn: async () => {
      // Mock data for demonstration - replace with actual implementation once DB is set up
      const mockRates: MockCommissionRate[] = [
        {
          id: '1',
          scheme_code: 'EQUITY_LARGE_CAP',
          annual_commission_rate: 1.00,
          effective_from: '2024-01-01'
        },
        {
          id: '2',
          scheme_code: 'EQUITY_MID_CAP',
          annual_commission_rate: 1.25,
          effective_from: '2024-01-01'
        },
        {
          id: '3',
          scheme_code: 'EQUITY_SMALL_CAP',
          annual_commission_rate: 1.50,
          effective_from: '2024-01-01'
        },
        {
          id: '4',
          scheme_code: 'DEBT_LIQUID',
          annual_commission_rate: 0.25,
          effective_from: '2024-01-01'
        },
        {
          id: '5',
          scheme_code: 'HYBRID_AGGRESSIVE',
          annual_commission_rate: 1.00,
          effective_from: '2024-01-01'
        }
      ];

      return mockRates;
    }
  });
};
