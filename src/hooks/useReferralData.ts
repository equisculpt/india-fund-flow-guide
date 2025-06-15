
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

export const useReferralStats = () => {
  return useQuery({
    queryKey: ['referral-stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get user profile with referral code
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('referral_code, total_referral_earnings')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // Get referral commissions
      const { data: commissions, error: commissionsError } = await supabase
        .from('referral_commissions')
        .select('*')
        .eq('referrer_id', user.id);

      if (commissionsError) throw commissionsError;

      // Get referred users count
      const { data: referredUsers, error: referredError } = await supabase
        .from('profiles')
        .select('id, created_at')
        .eq('referred_by', user.id);

      if (referredError) throw referredError;

      const totalEarnings = profile?.total_referral_earnings || 0;
      const pendingCommission = commissions
        ?.filter(c => c.status === 'pending')
        .reduce((sum, c) => sum + c.commission_amount, 0) || 0;

      return {
        totalReferrals: referredUsers?.length || 0,
        activeReferrals: commissions?.filter(c => c.status === 'earned').length || 0,
        totalEarnings,
        pendingCommission,
        referralCode: profile?.referral_code || ''
      } as ReferralStats;
    },
    enabled: !!supabase.auth.getUser(),
  });
};

export const useReferralCommissions = () => {
  return useQuery({
    queryKey: ['referral-commissions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('referral_commissions')
        .select(`
          *,
          referee_profile:profiles!referee_id(full_name)
        `)
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(item => ({
        ...item,
        referee_profile: item.referee_profile ? { full_name: item.referee_profile.full_name } : null
      })) as ReferralCommission[];
    },
    enabled: !!supabase.auth.getUser(),
  });
};
