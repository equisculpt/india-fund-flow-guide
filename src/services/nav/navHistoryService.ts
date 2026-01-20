
import { ExtendedNAVHistory } from './types';

export class NAVHistoryService {
  static async getExtendedNAVHistory(schemeCode: string, period: string): Promise<ExtendedNAVHistory[]> {
    try {
      console.log(`Fetching extended NAV history for scheme: ${schemeCode}, period: ${period}`);
      
      // For prototype, always use mock data
      return this.generateMockNAVHistory(schemeCode, period);
    } catch (error) {
      console.error('Error in getExtendedNAVHistory:', error);
      return this.generateMockNAVHistory(schemeCode, period);
    }
  }

  private static generateMockNAVHistory(schemeCode: string, period: string): ExtendedNAVHistory[] {
    const data: ExtendedNAVHistory[] = [];
    const endDate = new Date();
    let days = 365;

    switch (period) {
      case '1W': days = 7; break;
      case '1M': days = 30; break;
      case '3M': days = 90; break;
      case '6M': days = 180; break;
      case '1Y': days = 365; break;
      case '3Y': days = 1095; break;
      case '5Y': days = 1825; break;
      case '10Y': days = 3650; break;
    }

    // Generate mock NAV values with some realistic fluctuation
    const baseNAV = 100 + (parseInt(schemeCode) % 100);
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);
      
      // Add some realistic market movement
      const volatility = 0.02;
      const trend = (days - i) * 0.0001;
      const randomFactor = (Math.random() - 0.5) * volatility;
      const navValue = baseNAV + (baseNAV * (trend + randomFactor));
      
      data.push({
        nav_date: date.toISOString().split('T')[0],
        nav_value: Number(navValue.toFixed(4)),
        scheme_code: schemeCode
      });
    }

    return data;
  }
}
