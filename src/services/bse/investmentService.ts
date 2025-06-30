
import { BSEOrderResponse, InvestmentData } from './types';

export class BSEInvestmentService {
  private baseUrl = '/api/bsestar';

  async invest(investmentData: InvestmentData): Promise<BSEOrderResponse> {
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
}
