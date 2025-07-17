import { BaseApiService } from './baseApiService';

interface SIPStartRequest {
  schemeCode: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  duration: number;
  isSmart?: boolean;
}

interface SIPDetails {
  id: string;
  schemeCode: string;
  schemeName: string;
  amount: number;
  frequency: string;
  duration: number;
  status: string;
  startDate: string;
  nextInstallment: string;
  totalInvested: number;
  currentValue: number;
  isSmart: boolean;
}

interface SIPAnalytics {
  totalSIPs: number;
  totalInvested: number;
  currentValue: number;
  totalReturns: number;
  returnPercentage: number;
  monthlyData: Array<{
    month: string;
    invested: number;
    value: number;
  }>;
}

interface SIPRecommendation {
  recommendedAmount: number;
  recommendedFunds: Array<{
    schemeCode: string;
    schemeName: string;
    recommendedAllocation: number;
    reason: string;
  }>;
  marketCondition: string;
  strategy: string;
}

export class SIPService extends BaseApiService {
  async startSIP(sipData: SIPStartRequest): Promise<{ message: string; sipId: string }> {
    return this.post('/sip/start', sipData);
  }

  async getSIPDetails(): Promise<SIPDetails[]> {
    return this.get('/sip/details');
  }

  async getSIPRecommendation(): Promise<SIPRecommendation> {
    return this.get('/sip/recommendation');
  }

  async updateSIPPreferences(preferences: {
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    aiEnabled: boolean;
  }): Promise<{ message: string }> {
    return this.put('/sip/preferences', preferences);
  }

  async updateSIPStatus(status: 'active' | 'paused' | 'stopped'): Promise<{ message: string }> {
    return this.put('/sip/status', { status });
  }

  async executeSIPManually(sipId: string): Promise<{ message: string }> {
    return this.post('/sip/execute', { sipId });
  }

  async getSIPAnalytics(): Promise<SIPAnalytics> {
    return this.get('/sip/analytics');
  }

  async getSIPHistory(limit?: number): Promise<Array<{
    date: string;
    amount: number;
    nav: number;
    units: number;
    schemeName: string;
  }>> {
    const params = limit ? `?limit=${limit}` : '';
    return this.get(`/sip/history${params}`);
  }

  async getMarketAnalysis(): Promise<{
    marketCondition: string;
    recommendation: string;
    reasoning: string;
  }> {
    return this.get('/sip/market-analysis');
  }
}

export const sipService = new SIPService();