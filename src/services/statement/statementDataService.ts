
import { StatementData } from './types';
import { MockDataGenerator } from './mockDataGenerator';

class StatementDataService {
  async getStatementData(clientCode: string, statementType: string): Promise<StatementData> {
    try {
      console.log(`StatementDataService: Generating mock data for client: ${clientCode}, type: ${statementType}`);
      
      // Generate complete mock data for demo purposes
      const mockData = MockDataGenerator.generateCompleteStatementData(clientCode);
      
      console.log('Mock statement data generated successfully:', {
        userInfo: !!mockData.userInfo,
        portfolio: !!mockData.portfolio,
        holdingsCount: mockData.holdings?.length || 0,
        transactionsCount: mockData.transactions?.length || 0,
        totalValue: mockData.portfolio?.currentValue || 0
      });
      
      // Validate the generated data
      if (!mockData.userInfo || !mockData.portfolio || !mockData.holdings) {
        throw new Error('Generated mock data is incomplete');
      }
      
      return mockData;
    } catch (error) {
      console.error('Error generating statement data:', error);
      throw new Error(`Failed to generate statement data: ${error.message}`);
    }
  }
}

export const statementDataService = new StatementDataService();
