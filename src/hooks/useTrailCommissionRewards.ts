
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MonthlyCommissionRecord {
  id: string;
  commission_month: string;
  fund_name: string;
  scheme_code: string;
  outstanding_investment_value: number;
  monthly_commission_earned: number;
  user_reward_amount: number;
  user_reward_percentage: number;
}

export interface RewardWalletSummary {
  total_pending_rewards: number;
  total_lifetime_rewards: number;
  last_payout_date: string | null;
  last_payout_amount: number;
  next_payout_eligible_date: string | null;
}

export interface AnnualPayoutRecord {
  id: string;
  payout_year: number;
  total_commission_earned: number;
  user_reward_amount: number;
  payout_date: string;
  tds_deducted: number;
  net_payout_amount: number;
  statement_generated: boolean;
}

export const useRewardWalletSummary = () => {
  return useQuery({
    queryKey: ['reward-wallet-summary'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_reward_wallet')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return data as RewardWalletSummary | null;
    }
  });
};

export const useMonthlyCommissionHistory = () => {
  return useQuery({
    queryKey: ['monthly-commission-history'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('monthly_commission_ledger')
        .select(`
          *,
          mutual_funds!fund_id(scheme_name)
        `)
        .eq('user_id', user.id)
        .order('commission_month', { ascending: false })
        .limit(24); // Last 24 months

      if (error) throw error;

      return (data || []).map(record => ({
        ...record,
        fund_name: record.mutual_funds?.scheme_name || 'Unknown Fund'
      })) as MonthlyCommissionRecord[];
    }
  });
};

export const useAnnualPayoutHistory = () => {
  return useQuery({
    queryKey: ['annual-payout-history'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('annual_reward_payouts')
        .select('*')
        .eq('user_id', user.id)
        .order('payout_year', { ascending: false });

      if (error) throw error;

      return (data || []) as AnnualPayoutRecord[];
    }
  });
};

export const useCommissionRates = () => {
  return useQuery({
    queryKey: ['commission-rates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('commission_rates')
        .select('*')
        .eq('is_active', true)
        .order('scheme_code');

      if (error) throw error;

      return data || [];
    }
  });
};
