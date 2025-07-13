import { BaseApiService } from './baseApiService';

interface PortfolioOverview {
  totalInvested: number;
  totalCurrentValue: number;
  absoluteReturn: number;
  absoluteReturnPercent: number;
  holdings: Holding[];
}

interface Holding {
  fundName: string;
  fundCode: string;
  units: number;
  currentValue: number;
  allocation: number;
  return: number;
  returnPercent: number;
}

interface Fund {
  schemeCode: string;
  schemeName: string;
  fundHouse: string;
  category: string;
  subCategory: string;
  nav: number;
  navDate: string;
  minInvestment: number;
  riskLevel: string;
  rating: number;
}

interface FundListResponse {
  funds: Fund[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface InvestmentRequest {
  fundCode: string;
  amount: number;
  type: 'lumpsum' | 'sip';
  paymentMode: 'upi' | 'netbanking' | 'card';
  sipDetails?: {
    frequency: 'monthly' | 'weekly' | 'quarterly';
    duration: number;
  };
}

interface InvestmentResponse {
  orderId: string;
  status: string;
  amount: number;
  fundName: string;
  estimatedUnits: number;
  orderDate: string;
}

interface OrderStatus {
  orderId: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  amount: number;
  units: number;
  nav: number;
  orderDate: string;
  completionDate?: string;
}

interface RedemptionRequest {
  fundCode: string;
  units?: number;
  amount?: number;
  redemptionType: 'units' | 'amount';
  bankAccount: string;
}

interface RedemptionResponse {
  redemptionId: string;
  status: string;
  units: number;
  estimatedAmount: number;
  redemptionDate: string;
}

interface Transaction {
  id: string;
  type: 'PURCHASE' | 'REDEMPTION' | 'SIP' | 'DIVIDEND';
  fundName: string;
  amount: number;
  units: number;
  nav: number;
  date: string;
  status: string;
}

interface TransactionListResponse {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export class PortfolioService extends BaseApiService {
  async getPortfolioOverview(): Promise<PortfolioOverview> {
    return this.get<PortfolioOverview>('/api/portfolio/overview');
  }

  async getFunds(params?: {
    category?: string;
    risk?: string;
    limit?: number;
    page?: number;
  }): Promise<FundListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.set('category', params.category);
    if (params?.risk) queryParams.set('risk', params.risk);
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.page) queryParams.set('page', params.page.toString());

    const endpoint = `/api/portfolio/funds${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<FundListResponse>(endpoint);
  }

  async invest(investmentData: InvestmentRequest): Promise<InvestmentResponse> {
    return this.post<InvestmentResponse>('/api/portfolio/invest', investmentData);
  }

  async getOrderStatus(orderId: string): Promise<OrderStatus> {
    return this.get<OrderStatus>(`/api/portfolio/orders/${orderId}`);
  }

  async redeem(redemptionData: RedemptionRequest): Promise<RedemptionResponse> {
    return this.post<RedemptionResponse>('/api/portfolio/redeem', redemptionData);
  }

  async getTransactions(params?: {
    type?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<TransactionListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.set('type', params.type);
    if (params?.startDate) queryParams.set('startDate', params.startDate);
    if (params?.endDate) queryParams.set('endDate', params.endDate);
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());

    const endpoint = `/api/portfolio/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<TransactionListResponse>(endpoint);
  }
}

export const portfolioService = new PortfolioService();