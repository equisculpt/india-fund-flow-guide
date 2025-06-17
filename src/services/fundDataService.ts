
interface FundData {
  schemeCode: string;
  schemeName: string;
  amc: string;
  category: string;
  nav: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  aum: number;
  expenseRatio: number;
  volatility: number;
  minSipAmount: number;
  navDate?: string;
}

interface NAVResponse {
  nav: number;
  date: string;
  actualSchemeName: string;
  fundHouse: string;
}

export class FundDataService {
  // Corrected Top 10 popular funds with verified scheme codes
  static readonly TOP_FUNDS = [
    { schemeCode: '125497', name: 'SBI Small Cap Fund - Direct Growth' }, // Fixed: was 120503
    { schemeCode: '100016', name: 'SBI Bluechip Fund - Direct Growth' },
    { schemeCode: '101206', name: 'SBI Overnight Fund - Regular Growth' }, // Fixed: corrected mapping
    { schemeCode: '120601', name: 'ICICI Prudential All Seasons Bond Fund - Direct Plan' },
    { schemeCode: '118989', name: 'HDFC Mid-Cap Opportunities Fund - Direct Growth' }, // Fixed: was wrong
    { schemeCode: '119078', name: 'HDFC Regular Savings Fund - Direct Plan' },
    { schemeCode: '120716', name: 'UTI Nifty 50 Index Fund - Direct Growth' },
    { schemeCode: '145553', name: 'UTI Fixed Term Income Fund - Direct Growth' },
    { schemeCode: '120503', name: 'Axis ELSS Tax Saver Fund - Direct Growth' }, // Fixed: moved here
    { schemeCode: '102885', name: 'SBI Equity Hybrid Fund - Regular Growth' }
  ];

  static async fetchLatestNAV(schemeCode: string): Promise<NAVResponse | null> {
    try {
      console.log(`Fetching NAV for scheme: ${schemeCode}`);
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}/latest`);
      
      if (!response.ok) {
        console.error(`NAV API responded with status: ${response.status}`);
        throw new Error('Failed to fetch NAV');
      }
      
      const data = await response.json();
      console.log('NAV API response for', schemeCode, ':', data);
      
      if (data?.data?.[0]?.nav) {
        return {
          nav: parseFloat(data.data[0].nav),
          date: data.data[0].date,
          actualSchemeName: data.meta?.scheme_name || 'Unknown',
          fundHouse: data.meta?.fund_house || 'Unknown'
        };
      }
      
      console.log('No NAV data found in response for', schemeCode);
      return null;
    } catch (error) {
      console.error('Error fetching latest NAV for', schemeCode, ':', error);
      return null;
    }
  }

  static async fetchHistoricalNAV(schemeCode: string, days: number = 365): Promise<any[]> {
    try {
      console.log(`Fetching historical NAV for scheme: ${schemeCode}`);
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch historical NAV');
      }
      
      const data = await response.json();
      console.log(`Historical NAV data for ${schemeCode}:`, data?.data?.length, 'records');
      
      // Return last 'days' worth of data
      return data?.data?.slice(0, days) || [];
    } catch (error) {
      console.error('Error fetching historical NAV for', schemeCode, ':', error);
      return [];
    }
  }

  static async fetchTop10FundsNAV(): Promise<Map<string, NAVResponse>> {
    console.log('Fetching NAV for top 10 funds...');
    const navMap = new Map<string, NAVResponse>();
    
    const promises = this.TOP_FUNDS.map(async (fund) => {
      const navData = await this.fetchLatestNAV(fund.schemeCode);
      if (navData) {
        navMap.set(fund.schemeCode, navData);
      }
      return { schemeCode: fund.schemeCode, navData };
    });

    await Promise.all(promises);
    console.log('Completed NAV fetch for top 10 funds. Results:', navMap.size);
    return navMap;
  }

  static getMockFundData(schemeCode: string): FundData {
    // Corrected mock data with proper mappings
    const fundDataMap: Record<string, FundData> = {
      '125497': { // SBI Small Cap Fund - Direct Growth
        schemeCode: '125497',
        schemeName: 'SBI Small Cap Fund - Direct Growth',
        amc: 'SBI Mutual Fund',
        category: 'Small Cap',
        nav: 194.31,
        returns1Y: 28.9,
        returns3Y: 22.1,
        returns5Y: 19.4,
        aum: 15420,
        expenseRatio: 1.25,
        volatility: 8.2,
        minSipAmount: 500
      },
      '100016': { // SBI Bluechip Fund - Direct Growth
        schemeCode: '100016',
        schemeName: 'SBI Bluechip Fund - Direct Growth',
        amc: 'SBI Mutual Fund',
        category: 'Large Cap',
        nav: 76.32,
        returns1Y: 18.7,
        returns3Y: 15.4,
        returns5Y: 14.2,
        aum: 28650,
        expenseRatio: 0.52,
        volatility: 4.2,
        minSipAmount: 500
      },
      '101206': { // SBI Overnight Fund
        schemeCode: '101206',
        schemeName: 'SBI Overnight Fund - Regular Growth',
        amc: 'SBI Mutual Fund',
        category: 'Debt - Overnight',
        nav: 4149.08,
        returns1Y: 6.8,
        returns3Y: 6.2,
        returns5Y: 6.0,
        aum: 8230,
        expenseRatio: 0.15,
        volatility: 0.5,
        minSipAmount: 100
      },
      '120601': { // ICICI Prudential All Seasons Bond Fund
        schemeCode: '120601',
        schemeName: 'ICICI Prudential All Seasons Bond Fund - Direct Plan',
        amc: 'ICICI Prudential Mutual Fund',
        category: 'Debt Scheme - Dynamic Bond',
        nav: 11.73,
        returns1Y: 8.9,
        returns3Y: 7.1,
        returns5Y: 6.4,
        aum: 2402,
        expenseRatio: 0.85,
        volatility: 2.2,
        minSipAmount: 500
      },
      '118989': { // HDFC Mid-Cap Opportunities Fund
        schemeCode: '118989',
        schemeName: 'HDFC Mid-Cap Opportunities Fund - Direct Growth',
        amc: 'HDFC Mutual Fund',
        category: 'Mid Cap',
        nav: 210.87,
        returns1Y: 24.5,
        returns3Y: 18.2,
        returns5Y: 16.8,
        aum: 22340,
        expenseRatio: 0.68,
        volatility: 6.5,
        minSipAmount: 500
      },
      '120503': { // Axis ELSS Tax Saver Fund
        schemeCode: '120503',
        schemeName: 'Axis ELSS Tax Saver Fund - Direct Growth',
        amc: 'Axis Mutual Fund',
        category: 'ELSS',
        nav: 107.98,
        returns1Y: 22.3,
        returns3Y: 17.1,
        returns5Y: 15.7,
        aum: 12800,
        expenseRatio: 0.75,
        volatility: 5.8,
        minSipAmount: 500
      }
    };

    return fundDataMap[schemeCode] || {
      schemeCode,
      schemeName: 'Unknown Fund',
      amc: 'Unknown AMC',
      category: 'Unknown',
      nav: 0,
      returns1Y: 0,
      returns3Y: 0,
      returns5Y: 0,
      aum: 0,
      expenseRatio: 0,
      volatility: 0,
      minSipAmount: 500
    };
  }
}
