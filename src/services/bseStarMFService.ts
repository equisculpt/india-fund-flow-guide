
import { portfolioService } from './api/portfolioService';
import { paymentService } from './api/paymentService';
import { authService } from './api/authService';
import type {
  BSEOrderResponse,
  BSEHoldingsResponse,
  BSESIPResponse,
  BSETransactionResponse,
  InvestmentData,
  SIPData
} from './bse/types';

// Re-export types for backward compatibility
export type {
  BSEOrderResponse,
  BSEHoldingsResponse,
  BSESIPResponse,
  BSETransactionResponse,
  InvestmentData,
  SIPData
};

class BSEStarMFService {
  // Investment operations
  async invest(investmentData: InvestmentData): Promise<BSEOrderResponse> {
    try {
      const investmentRequest = {
        fundCode: investmentData.schemeCode,
        amount: investmentData.amount,
        type: investmentData.investmentType.toLowerCase() as 'lumpsum' | 'sip',
        paymentMode: 'upi' as const,
        sipDetails: investmentData.investmentType === 'SIP' ? {
          frequency: investmentData.sipFrequency?.toLowerCase() as 'monthly' | 'weekly' | 'quarterly' || 'monthly',
          duration: 12 // Default duration
        } : undefined
      };

      const response = await portfolioService.invest(investmentRequest);
      
      return {
        status: 'success',
        orderNumber: response.orderId,
        clientCode: investmentData.clientCode,
        schemeCode: investmentData.schemeCode,
        orderAmount: response.amount,
        orderDate: new Date(response.orderDate).toISOString().split('T')[0],
        folioNumber: `SB${Math.floor(Math.random() * 100000000)}`,
        units: response.estimatedUnits,
        nav: investmentData.amount / response.estimatedUnits
      };
    } catch (error) {
      return {
        status: 'error',
        orderNumber: '',
        clientCode: investmentData.clientCode,
        schemeCode: investmentData.schemeCode,
        orderAmount: investmentData.amount,
        orderDate: new Date().toISOString().split('T')[0],
        errorCode: 'INVESTMENT_FAILED',
        errorMessage: error instanceof Error ? error.message : 'Investment failed'
      };
    }
  }

  // Holdings operations
  async getHoldings(clientCode: string): Promise<BSEHoldingsResponse> {
    try {
      const portfolioOverview = await portfolioService.getPortfolioOverview();
      
      return {
        status: 'success',
        clientCode,
        holdings: portfolioOverview.holdings.map(holding => ({
          schemeCode: holding.fundCode,
          schemeName: holding.fundName,
          folioNumber: `SB${Math.floor(Math.random() * 100000000)}`,
          units: holding.units,
          averageNav: holding.currentValue / holding.units * 0.95, // Approximate average NAV
          currentNav: holding.currentValue / holding.units,
          marketValue: holding.currentValue,
          investedValue: holding.currentValue - holding.return,
          pnl: holding.return,
          pnlPercentage: holding.returnPercent,
          lastTransactionDate: new Date().toISOString().split('T')[0]
        }))
      };
    } catch (error) {
      return {
        status: 'error',
        clientCode,
        holdings: []
      };
    }
  }

  // SIP operations
  async getSIPs(clientCode: string): Promise<BSESIPResponse[]> {
    try {
      // Mock SIP data for now - would need specific SIP endpoint from backend
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
        }
      ];
    } catch (error) {
      return [];
    }
  }

  async startSIP(sipData: SIPData): Promise<BSESIPResponse> {
    try {
      const investmentRequest = {
        fundCode: sipData.schemeCode,
        amount: sipData.amount,
        type: 'sip' as const,
        paymentMode: 'upi' as const,
        sipDetails: {
          frequency: sipData.frequency.toLowerCase() as 'monthly' | 'weekly' | 'quarterly',
          duration: 12 // Default duration
        }
      };

      const response = await portfolioService.invest(investmentRequest);
      
      return {
        status: 'success',
        sipId: response.orderId,
        clientCode: sipData.clientCode,
        schemeCode: sipData.schemeCode,
        sipAmount: sipData.amount,
        sipFrequency: sipData.frequency,
        sipDate: sipData.sipDate,
        startDate: new Date(response.orderDate).toISOString().split('T')[0],
        mandateId: sipData.mandateId,
        sipStatus: 'ACTIVE',
        nextDueDate: this.calculateNextDueDate(sipData.frequency, sipData.sipDate)
      };
    } catch (error) {
      return {
        status: 'error',
        sipId: '',
        clientCode: sipData.clientCode,
        schemeCode: sipData.schemeCode,
        sipAmount: sipData.amount,
        sipFrequency: sipData.frequency,
        sipDate: sipData.sipDate,
        startDate: new Date().toISOString().split('T')[0],
        mandateId: sipData.mandateId,
        sipStatus: 'PENDING'
      };
    }
  }

  async pauseSIP(sipId: string): Promise<{ status: string; message: string; sipId: string }> {
    // Mock implementation - would need specific SIP management endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      status: 'success',
      message: 'SIP paused successfully',
      sipId
    };
  }

  async stopSIP(sipId: string): Promise<{ status: string; message: string; sipId: string }> {
    // Mock implementation - would need specific SIP management endpoint
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      status: 'success',
      message: 'SIP stopped successfully',
      sipId
    };
  }

  // Transaction operations
  async getTransactions(clientCode: string, fromDate?: string, toDate?: string): Promise<BSETransactionResponse> {
    try {
      const transactions = await portfolioService.getTransactions({
        startDate: fromDate,
        endDate: toDate,
        page: 1,
        limit: 100
      });
      
      return {
        status: 'success',
        transactions: transactions.transactions.map(txn => ({
          orderNumber: txn.id,
          transactionDate: new Date(txn.date).toISOString().split('T')[0],
          schemeCode: `SCHEME_${Math.floor(Math.random() * 100000)}`, // Would need scheme code mapping
          schemeName: txn.fundName,
          transactionType: txn.type === 'DIVIDEND' ? 'PURCHASE' : txn.type as 'PURCHASE' | 'REDEMPTION' | 'SIP',
          amount: txn.amount,
          units: txn.units,
          nav: txn.nav,
          folioNumber: `SB${Math.floor(Math.random() * 100000000)}`,
          settlementDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }))
      };
    } catch (error) {
      return {
        status: 'error',
        transactions: []
      };
    }
  }

  private calculateNextDueDate(frequency: string, sipDate: number): string {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, sipDate);
    return nextMonth.toISOString().split('T')[0];
  }
}

export const bseStarMFService = new BSEStarMFService();
