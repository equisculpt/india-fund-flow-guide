
import { StatementData } from './types';
import { MockDataGenerator } from './mockDataGenerator';

class StatementDataService {
  async getStatementData(clientCode: string, statementType: string): Promise<StatementData> {
    console.log(`Generating mock statement data for client: ${clientCode}, type: ${statementType}`);
    
    // For demo purposes, return complete mock data immediately
    // In production, this would fetch from BSE STAR MF APIs
    const mockData = MockDataGenerator.generateCompleteStatementData(clientCode);
    
    console.log('Mock statement data generated successfully:', {
      holdingsCount: mockData.holdings.length,
      transactionsCount: mockData.transactions.length,
      totalValue: mockData.portfolio.currentValue
    });
    
    return mockData;
  }
}

export const statementDataService = new StatementDataService();
