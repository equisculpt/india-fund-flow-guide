
// BSE STAR MF API Service - Mock implementation ready for live API integration
export interface BSEOrderResponse {
  status: 'success' | 'error';
  orderNumber: string;
  clientCode: string;
  schemeCode: string;
  orderAmount: number;
  orderDate: string;
  folioNumber?: string;
  units?: number;
  nav?: number;
  errorCode?: string;
  errorMessage?: string;
}

export interface BSEHoldingsResponse {
  status: 'success' | 'error';
  clientCode: string;
  holdings: {
    schemeCode: string;
    schemeName: string;
    folioNumber: string;
    units: number;
    averageNav: number;
    currentNav: number;
    marketValue: number;
    investedValue: number;
    pnl: number;
    pnlPercentage: number;
    lastTransactionDate: string;
  }[];
}

export interface BSESIPResponse {
  status: 'success' | 'error';
  sipId: string;
  clientCode: string;
  schemeCode: string;
  sipAmount: number;
  sipFrequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  sipDate: number;
  startDate: string;
  endDate?: string;
  mandateId: string;
  sipStatus: 'ACTIVE' | 'PAUSED' | 'STOPPED' | 'PENDING';
  nextDueDate?: string;
}

export interface BSETransactionResponse {
  status: 'success' | 'error';
  transactions: {
    orderNumber: string;
    transactionDate: string;
    schemeCode: string;
    schemeName: string;
    transactionType: 'PURCHASE' | 'REDEMPTION' | 'SIP';
    amount: number;
    units: number;
    nav: number;
    folioNumber: string;
    settlementDate: string;
  }[];
}

class BSEStarMFService {
  private baseUrl = '/api/bsestar';

  async invest(investmentData: {
    schemeCode: string;
    amount: number;
    clientCode: string;
    investmentType: 'LUMPSUM' | 'SIP';
    sipFrequency?: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
    sipDate?: number;
  }): Promise<BSEOrderResponse> {
    // Mock response matching BSE STAR MF API format
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      status: 'success',
      orderNumber: `BSE${Date.now()}${Math.floor(Math.random() * 1000)}`,
      clientCode: investmentData.clientCode,
      schemeCode: investmentData.schemeCode,
      orderAmount: investmentData.amount,
      orderDate: new Date().toISOString().split('T')[0],
      folioNumber: `SB${Math.floor(Math.random() * 100000000)}`,
      units: investmentData.amount / (45.67 + Math.random() * 20), // Mock NAV calculation
      nav: 45.67 + Math.random() * 20
    };
  }

  async getHoldings(clientCode: string): Promise<BSEHoldingsResponse> {
    // Mock holdings data matching BSE STAR MF format
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      status: 'success',
      clientCode,
      holdings: [
        {
          schemeCode: '120503',
          schemeName: 'HDFC Top 100 Fund-Direct Plan-Growth',
          folioNumber: 'SB12345678',
          units: 1234.567,
          averageNav: 48.50,
          currentNav: 62.34,
          marketValue: 76890.23,
          investedValue: 60000,
          pnl: 16890.23,
          pnlPercentage: 28.15,
          lastTransactionDate: '2024-12-15'
        },
        {
          schemeCode: '119551',
          schemeName: 'SBI Small Cap Fund-Direct Plan-Growth',
          folioNumber: 'SB87654321',
          units: 876.543,
          averageNav: 42.30,
          currentNav: 48.75,
          marketValue: 42731.47,
          investedValue: 37089,
          pnl: 5642.47,
          pnlPercentage: 15.22,
          lastTransactionDate: '2024-12-20'
        }
      ]
    };
  }

  async getSIPs(clientCode: string): Promise<BSESIPResponse[]> {
    // Mock SIP data matching BSE STAR MF format
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        status: 'success',
        sipId: `SIP${Date.now()}001`,
        clientCode,
        schemeCode: '120503',
        sipAmount: 5000,
        sipFrequency: 'MONTHLY',
        sipDate: 15,
        startDate: '2024-01-15',
        mandateId: 'MANDATE001',
        sipStatus: 'ACTIVE',
        nextDueDate: '2025-01-15'
      },
      {
        status: 'success',
        sipId: `SIP${Date.now()}002`,
        clientCode,
        schemeCode: '119551',
        sipAmount: 3000,
        sipFrequency: 'MONTHLY',
        sipDate: 20,
        startDate: '2024-02-20',
        mandateId: 'MANDATE002',
        sipStatus: 'ACTIVE',
        nextDueDate: '2025-01-20'
      }
    ];
  }

  async getTransactions(clientCode: string, fromDate?: string, toDate?: string): Promise<BSETransactionResponse> {
    // Mock transaction data matching BSE STAR MF format
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      status: 'success',
      transactions: [
        {
          orderNumber: 'BSE1234567890',
          transactionDate: '2024-12-15',
          schemeCode: '120503',
          schemeName: 'HDFC Top 100 Fund-Direct Plan-Growth',
          transactionType: 'SIP',
          amount: 5000,
          units: 80.128,
          nav: 62.41,
          folioNumber: 'SB12345678',
          settlementDate: '2024-12-17'
        },
        {
          orderNumber: 'BSE0987654321',
          transactionDate: '2024-12-20',
          schemeCode: '119551',
          schemeName: 'SBI Small Cap Fund-Direct Plan-Growth',
          transactionType: 'SIP',
          amount: 3000,
          units: 61.538,
          nav: 48.75,
          folioNumber: 'SB87654321',
          settlementDate: '2024-12-22'
        }
      ]
    };
  }

  async startSIP(sipData: {
    schemeCode: string;
    amount: number;
    clientCode: string;
    frequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
    sipDate: number;
    mandateId: string;
  }): Promise<BSESIPResponse> {
    // Mock SIP start response
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    return {
      status: 'success',
      sipId: `SIP${Date.now()}${Math.floor(Math.random() * 1000)}`,
      clientCode: sipData.clientCode,
      schemeCode: sipData.schemeCode,
      sipAmount: sipData.amount,
      sipFrequency: sipData.frequency,
      sipDate: sipData.sipDate,
      startDate: new Date().toISOString().split('T')[0],
      mandateId: sipData.mandateId,
      sipStatus: 'ACTIVE',
      nextDueDate: this.calculateNextDueDate(sipData.frequency, sipData.sipDate)
    };
  }

  async pauseSIP(sipId: string): Promise<{ status: string; message: string; sipId: string }> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      status: 'success',
      message: 'SIP paused successfully',
      sipId
    };
  }

  async stopSIP(sipId: string): Promise<{ status: string; message: string; sipId: string }> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      status: 'success',
      message: 'SIP stopped successfully',
      sipId
    };
  }

  private calculateNextDueDate(frequency: string, sipDate: number): string {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, sipDate);
    return nextMonth.toISOString().split('T')[0];
  }
}

export const bseStarMFService = new BSEStarMFService();
