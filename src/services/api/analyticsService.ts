import { BaseApiService } from './baseApiService';

interface DashboardPortfolio {
  totalInvested: number;
  totalCurrentValue: number;
  absoluteReturn: number;
  absoluteReturnPercent: number;
}

interface DashboardPerformance {
  xirr1M: number;
  xirr3M: number;
  xirr6M: number;
  xirr1Y: number;
}

interface RecentTransaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  fundName: string;
}

interface UpcomingSIP {
  id: string;
  amount: number;
  date: string;
  fundName: string;
}

interface DashboardOverview {
  portfolio: DashboardPortfolio;
  performance: DashboardPerformance;
  recentTransactions: RecentTransaction[];
  upcomingSIPs: UpcomingSIP[];
}

interface PerformanceDataPoint {
  date: string;
  nav: number;
  units: number;
  value: number;
}

interface PerformanceMetrics {
  totalReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

interface PerformanceAnalytics {
  period: string;
  fundCode: string;
  data: PerformanceDataPoint[];
  metrics: PerformanceMetrics;
}

export class AnalyticsService extends BaseApiService {
  async getDashboardOverview(): Promise<DashboardOverview> {
    return this.get<DashboardOverview>('/api/dashboard/overview');
  }

  async getPerformanceAnalytics(params?: {
    period?: string;
    fundCode?: string;
  }): Promise<PerformanceAnalytics> {
    const queryParams = new URLSearchParams();
    if (params?.period) queryParams.set('period', params.period);
    if (params?.fundCode) queryParams.set('fundCode', params.fundCode);

    const endpoint = `/api/analytics/performance${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<PerformanceAnalytics>(endpoint);
  }
}

export const analyticsService = new AnalyticsService();