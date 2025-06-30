
import { bseStarMFService } from '../bseStarMFService';
import { StatementData } from './types';
import { MockDataGenerator } from './mockDataGenerator';
import { StatementDataProcessor } from './dataProcessor';

class StatementDataService {
  private processor = new StatementDataProcessor();

  async getStatementData(clientCode: string, statementType: string): Promise<StatementData> {
    console.log(`Fetching statement data for client: ${clientCode}, type: ${statementType}`);
    
    // Fetch data from BSE STAR MF APIs (using mock responses for now)
    const [holdingsResponse, transactionsResponse, sipsResponse] = await Promise.all([
      bseStarMFService.getHoldings(clientCode),
      bseStarMFService.getTransactions(clientCode),
      bseStarMFService.getSIPs(clientCode)
    ]);

    // Generate mock user info
    const userInfo = MockDataGenerator.generateMockUserInfo(clientCode);

    // Process holdings data
    const holdings = holdingsResponse.holdings || [];
    const portfolio = StatementDataProcessor.processPortfolioData(holdings);

    // Process SIP data
    const processedSIPs = StatementDataProcessor.processSIPData(sipsResponse, this.processor);
    portfolio.activeSIPs = sipsResponse.filter(s => s.sipStatus === 'ACTIVE').length;

    // Generate mock data
    const capitalGains = MockDataGenerator.generateMockCapitalGains();
    const rewards = MockDataGenerator.generateMockRewards();

    return {
      userInfo,
      portfolio,
      holdings: StatementDataProcessor.enhanceHoldingsWithSIPData(holdings),
      transactions: transactionsResponse.transactions || [],
      capitalGains,
      sips: processedSIPs,
      rewards
    };
  }
}

export const statementDataService = new StatementDataService();
