
import { BSEHoldingsResponse } from './types';

export class BSEHoldingsService {
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
}
