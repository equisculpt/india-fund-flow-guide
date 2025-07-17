import { BaseApiService } from './baseApiService';

interface DashboardOverview {
  portfolio: {
    totalInvested: number;
    currentValue: number;
    totalReturns: number;
    returnPercentage: number;
    xirr: number;
  };
  recentTransactions: Array<{
    id: string;
    date: string;
    type: 'SIP' | 'LUMPSUM' | 'REDEEM';
    amount: number;
    fundName: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
  }>;
  upcomingSIPs: Array<{
    id: string;
    date: string;
    amount: number;
    fundName: string;
    frequency: string;
  }>;
  alerts: Array<{
    id: string;
    type: 'INFO' | 'WARNING' | 'ERROR';
    title: string;
    message: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    createdAt: string;
  }>;
  recommendations: Array<{
    id: string;
    type: 'REBALANCE' | 'TAX_HARVEST' | 'SIP_INCREASE';
    title: string;
    description: string;
    impact: string;
  }>;
}

interface DashboardAnalytics {
  performanceChart: Array<{
    date: string;
    invested: number;
    value: number;
  }>;
  assetAllocation: Array<{
    category: string;
    percentage: number;
    value: number;
    color: string;
  }>;
  topHoldings: Array<{
    fundName: string;
    currentValue: number;
    percentage: number;
    returns: number;
    returnPercentage: number;
  }>;
  monthlyPerformance: Array<{
    month: string;
    invested: number;
    returns: number;
    netReturn: number;
  }>;
}

export class DashboardService extends BaseApiService {
  async getDashboardOverview(): Promise<DashboardOverview> {
    return this.get('/dashboard/overview');
  }

  async getDashboardAnalytics(): Promise<DashboardAnalytics> {
    return this.get('/dashboard/analytics');
  }

  async getRecentTransactions(limit: number = 10): Promise<Array<{
    id: string;
    date: string;
    type: string;
    amount: number;
    fundName: string;
    status: string;
  }>> {
    return this.get(`/dashboard/recent-transactions?limit=${limit}`);
  }

  async getUpcomingSIPs(): Promise<Array<{
    id: string;
    date: string;
    amount: number;
    fundName: string;
    frequency: string;
  }>> {
    return this.get('/dashboard/upcoming-sips');
  }
}

export const dashboardService = new DashboardService();