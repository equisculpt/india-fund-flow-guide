
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface NAVHistory {
  id: string;
  fund_id: string;
  nav_date: string;
  nav_value: number;
}

export interface SIPTransaction {
  id: string;
  user_id: string;
  fund_id: string;
  sip_amount: number;
  transaction_date: string;
  nav_on_date: number;
  units_allocated: number;
}

export interface SIPReturns {
  total_invested: number;
  total_units: number;
  current_value: number;
  absolute_returns: number;
  percentage_returns: number;
  xirr: number;
}

export const useNAVHistory = (fundId: string, period: 'weekly' | 'monthly' | 'custom' = 'monthly', startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: ['nav-history', fundId, period, startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('mutual_fund_nav_history')
        .select('*')
        .eq('fund_id', fundId)
        .order('nav_date', { ascending: true });

      if (period === 'custom' && startDate && endDate) {
        query = query.gte('nav_date', startDate).lte('nav_date', endDate);
      } else {
        const daysBack = period === 'weekly' ? 7 : period === 'monthly' ? 30 : 365;
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - daysBack);
        query = query.gte('nav_date', fromDate.toISOString().split('T')[0]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as NAVHistory[];
    },
    enabled: !!fundId,
  });
};

export const useFundIRR = (fundId: string, startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['fund-irr', fundId, startDate, endDate],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('calculate_fund_irr', {
        p_fund_id: fundId,
        p_start_date: startDate,
        p_end_date: endDate
      });

      if (error) throw error;
      return data as number;
    },
    enabled: !!fundId && !!startDate && !!endDate,
  });
};

export const useSIPReturns = (userId: string, fundId: string, startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['sip-returns', userId, fundId, startDate, endDate],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('calculate_sip_returns', {
        p_user_id: userId,
        p_fund_id: fundId,
        p_start_date: startDate,
        p_end_date: endDate
      });

      if (error) throw error;
      return data[0] as SIPReturns;
    },
    enabled: !!userId && !!fundId && !!startDate && !!endDate,
  });
};

export const useSIPTransactions = (userId: string, fundId?: string) => {
  return useQuery({
    queryKey: ['sip-transactions', userId, fundId],
    queryFn: async () => {
      let query = supabase
        .from('sip_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('transaction_date', { ascending: false });

      if (fundId) {
        query = query.eq('fund_id', fundId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as SIPTransaction[];
    },
    enabled: !!userId,
  });
};
