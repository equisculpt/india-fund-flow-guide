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

interface SIPCalculationResponse {
  monthlyAmount: number;
  duration: number;
  totalInvested: number;
  expectedValue: number;
  totalReturns: number;
  projections: Array<{
    month: number;
    invested: number;
    value: number;
    returns: number;
  }>;
}

interface GoalInvestmentResponse {
  targetAmount: number;
  timeHorizon: number;
  currentSavings: number;
  requiredMonthlySIP: number;
  projectedValue: number;
  shortfall: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
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

  async calculateSIP(params: {
    monthlyAmount: number;
    duration: number;
    expectedReturn: number;
    fundCode?: string;
  }): Promise<ApiResponse<SIPCalculationResponse>> {
    return this.post<ApiResponse<SIPCalculationResponse>>('/api/analytics/calculate-sip', params);
  }

  async calculateGoalInvestment(params: {
    targetAmount: number;
    timeHorizon: number;
    expectedReturn: number;
    currentSavings: number;
  }): Promise<ApiResponse<GoalInvestmentResponse>> {
    return this.post<ApiResponse<GoalInvestmentResponse>>('/api/analytics/goal-investment', params);
  }

  async calculateRiskProfiling(type: 'personal' | 'portfolio' | 'market') {
    return this.get(`/api/analytics/risk-profiling?type=${type}`);
  }

  async getChartData(params: {
    type: 'portfolio' | 'fund' | 'allocation' | 'sip';
    period?: string;
    fundCode?: string;
    userId?: string;
  }) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.set(key, value);
    });
    return this.get(`/api/analytics/chart-data?${queryParams.toString()}`);
  }

  async calculateXIRR(params: {
    transactions: Array<{
      date: string;
      amount: number;
      type: 'investment' | 'redemption';
    }>;
  }) {
    return this.post('/api/analytics/xirr', params);
  }

  async getAdminDashboard(): Promise<any> {
    return this.get('/api/analytics/admin-dashboard');
  }
}

export const analyticsService = new AnalyticsService();

// Export individual functions for backward compatibility
export const calculateGoalInvestment = (params: {
  targetAmount: number;
  currentAmount: number;
  timeHorizon: number;
  expectedReturn: number;
}) => analyticsService.calculateGoalInvestment({
  targetAmount: params.targetAmount,
  timeHorizon: params.timeHorizon,
  expectedReturn: params.expectedReturn,
  currentSavings: params.currentAmount
});

export const getAdminDashboard = () => analyticsService.getAdminDashboard();