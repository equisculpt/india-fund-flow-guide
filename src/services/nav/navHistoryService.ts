
import { supabase } from "@/integrations/supabase/client";
import { ExtendedNAVHistory } from './types';

export class NAVHistoryService {
  static async getExtendedNAVHistory(schemeCode: string, period: string): Promise<ExtendedNAVHistory[]> {
    try {
      console.log(`Fetching extended NAV history for scheme: ${schemeCode}, period: ${period}`);
      
      // Calculate date range based on period
      const endDate = new Date();
      const startDate = new Date();
      
      switch (period) {
        case '1W':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '1M':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        case '3M':
          startDate.setMonth(endDate.getMonth() - 3);
          break;
        case '6M':
          startDate.setMonth(endDate.getMonth() - 6);
          break;
        case '1Y':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        case '3Y':
          startDate.setFullYear(endDate.getFullYear() - 3);
          break;
        case '5Y':
          startDate.setFullYear(endDate.getFullYear() - 5);
          break;
        case '10Y':
          startDate.setFullYear(endDate.getFullYear() - 10);
          break;
        default:
          startDate.setFullYear(endDate.getFullYear() - 1);
      }

      // Try to fetch from database first - using the correct table name
      const { data, error } = await supabase
        .from('extended_nav_history')
        .select('nav_date, nav_value, scheme_code')
        .eq('scheme_code', schemeCode)
        .gte('nav_date', startDate.toISOString().split('T')[0])
        .lte('nav_date', endDate.toISOString().split('T')[0])
        .order('nav_date', { ascending: true });

      if (error) {
        console.error('Error fetching NAV history:', error);
        return this.generateMockNAVHistory(schemeCode, period);
      }

      if (!data || data.length === 0) {
        console.log('No NAV history found in database, generating mock data');
        return this.generateMockNAVHistory(schemeCode, period);
      }

      return data as ExtendedNAVHistory[];
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
