
import { BSEInvestmentService } from './bse/investmentService';
import { BSEHoldingsService } from './bse/holdingsService';
import { BSESIPService } from './bse/sipService';
import { BSETransactionsService } from './bse/transactionsService';
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
  private investmentService = new BSEInvestmentService();
  private holdingsService = new BSEHoldingsService();
  private sipService = new BSESIPService();
  private transactionsService = new BSETransactionsService();

  // Investment operations
  async invest(investmentData: InvestmentData): Promise<BSEOrderResponse> {
    return this.investmentService.invest(investmentData);
  }

  // Holdings operations
  async getHoldings(clientCode: string): Promise<BSEHoldingsResponse> {
    return this.holdingsService.getHoldings(clientCode);
  }

  // SIP operations
  async getSIPs(clientCode: string): Promise<BSESIPResponse[]> {
    return this.sipService.getSIPs(clientCode);
  }

  async startSIP(sipData: SIPData): Promise<BSESIPResponse> {
    return this.sipService.startSIP(sipData);
  }

  async pauseSIP(sipId: string): Promise<{ status: string; message: string; sipId: string }> {
    return this.sipService.pauseSIP(sipId);
  }

  async stopSIP(sipId: string): Promise<{ status: string; message: string; sipId: string }> {
    return this.sipService.stopSIP(sipId);
  }

  // Transaction operations
  async getTransactions(clientCode: string, fromDate?: string, toDate?: string): Promise<BSETransactionResponse> {
    return this.transactionsService.getTransactions(clientCode, fromDate, toDate);
  }
}

export const bseStarMFService = new BSEStarMFService();
