
import { BSETransactionResponse } from './types';

export class BSETransactionsService {
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
}
