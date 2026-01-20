
import { useQuery } from '@tanstack/react-query';

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

// Generate mock NAV history
const generateMockNAVHistory = (fundId: string, days: number): NAVHistory[] => {
  const history: NAVHistory[] = [];
  const baseNAV = 50 + Math.random() * 100;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const variation = (Math.random() - 0.5) * 2;
    const nav = baseNAV + (days - i) * 0.1 + variation;
    
    history.push({
      id: `nav-${fundId}-${i}`,
      fund_id: fundId,
      nav_date: date.toISOString().split('T')[0],
      nav_value: parseFloat(nav.toFixed(2))
    });
  }
  
  return history;
};

// Generate mock SIP transactions
const generateMockSIPTransactions = (userId: string, fundId?: string): SIPTransaction[] => {
  const transactions: SIPTransaction[] = [];
  const funds = fundId ? [fundId] : ['fund-1', 'fund-2', 'fund-3'];
  
  funds.forEach(fId => {
    for (let i = 12; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      
      const amount = 5000 + Math.floor(Math.random() * 10000);
      const nav = 50 + Math.random() * 50;
      
      transactions.push({
        id: `sip-${fId}-${i}`,
        user_id: userId,
        fund_id: fId,
        sip_amount: amount,
        transaction_date: date.toISOString().split('T')[0],
        nav_on_date: parseFloat(nav.toFixed(2)),
        units_allocated: parseFloat((amount / nav).toFixed(4))
      });
    }
  });
  
  return transactions.sort((a, b) => 
    new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
  );
};

export const useNAVHistory = (fundId: string, period: 'weekly' | 'monthly' | 'custom' = 'monthly', startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: ['nav-history', fundId, period, startDate, endDate],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const daysBack = period === 'weekly' ? 7 : period === 'monthly' ? 30 : 365;
      return generateMockNAVHistory(fundId, daysBack);
    },
    enabled: !!fundId,
  });
};

export const useFundIRR = (fundId: string, startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['fund-irr', fundId, startDate, endDate],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Return mock IRR between 8% and 18%
      return 8 + Math.random() * 10;
    },
    enabled: !!fundId && !!startDate && !!endDate,
  });
};

export const useSIPReturns = (userId: string, fundId: string, startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['sip-returns', userId, fundId, startDate, endDate],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const totalInvested = 50000 + Math.random() * 100000;
      const returns = 0.1 + Math.random() * 0.15;
      
      const mockReturns: SIPReturns = {
        total_invested: totalInvested,
        total_units: totalInvested / 75,
        current_value: totalInvested * (1 + returns),
        absolute_returns: totalInvested * returns,
        percentage_returns: returns * 100,
        xirr: 10 + Math.random() * 8
      };
      
      return mockReturns;
    },
    enabled: !!userId && !!fundId && !!startDate && !!endDate,
  });
};

export const useSIPTransactions = (userId: string, fundId?: string) => {
  return useQuery({
    queryKey: ['sip-transactions', userId, fundId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      return generateMockSIPTransactions(userId, fundId);
    },
    enabled: !!userId,
  });
};
