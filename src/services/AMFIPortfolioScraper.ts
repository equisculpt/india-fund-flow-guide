
export interface PortfolioHolding {
  stockName: string;
  isin: string;
  percentage: number;
  marketValue: number;
  quantity: number;
  industry: string;
}

export interface SectorAllocation {
  sector: string;
  percentage: number;
}

export interface PortfolioData {
  schemeCode: string;
  schemeName: string;
  aum: number;
  portfolioDate: string;
  holdings: PortfolioHolding[];
  sectorAllocation: SectorAllocation[];
  portfolioTurnover: number;
  totalEquityPercentage: number;
  totalDebtPercentage: number;
  totalCashPercentage: number;
}

export class AMFIPortfolioService {
  static async getSchemePortfolio(schemeCode: string): Promise<PortfolioData | null> {
    console.log('Fetching portfolio data for scheme:', schemeCode);
    return this.scrapeGrowwPortfolio(schemeCode);
  }

  static async getRecentPortfolioChanges(schemeCode: string): Promise<any[]> {
    // Mock recent changes
    return [
      {
        action: 'Added',
        stockName: 'New Stock Addition',
        percentageChange: '+0.5%',
        date: '2024-01-15'
      },
      {
        action: 'Increased',
        stockName: 'Existing Holding',
        percentageChange: '+0.3%',
        date: '2024-01-14'
      },
      {
        action: 'Reduced',
        stockName: 'Reduced Position',
        percentageChange: '-0.2%',
        date: '2024-01-13'
      }
    ];
  }

  static async scrapeGrowwPortfolio(schemeCode: string): Promise<PortfolioData | null> {
    console.log('Fetching portfolio data from mock for scheme:', schemeCode);
    
    // Mock portfolio data based on scheme code
    const portfolioMap: Record<string, PortfolioData> = {
      '125497': {
        schemeCode: '125497',
        schemeName: 'SBI Small Cap Fund - Direct Growth',
        aum: 15420,
        portfolioDate: '2024-12-31',
        holdings: [
          { stockName: 'Kalyan Jewellers India Ltd', isin: 'INE303R01014', percentage: 3.2, marketValue: 493.44, quantity: 12500000, industry: 'Consumer Discretionary' },
          { stockName: 'Poonawalla Fincorp Ltd', isin: 'INE511C01022', percentage: 2.8, marketValue: 431.76, quantity: 8750000, industry: 'Financial Services' },
          { stockName: 'Multi Commodity Exchange of India Ltd', isin: 'INE745G01035', percentage: 2.6, marketValue: 400.92, quantity: 750000, industry: 'Financial Services' },
          { stockName: 'CG Power and Industrial Solutions Ltd', isin: 'INE581B01027', percentage: 2.4, marketValue: 370.08, quantity: 5200000, industry: 'Industrials' },
          { stockName: 'PCBL Ltd', isin: 'INE602A01023', percentage: 2.2, marketValue: 339.24, quantity: 15600000, industry: 'Materials' }
        ],
        sectorAllocation: [
          { sector: 'Financial Services', percentage: 18.5 },
          { sector: 'Consumer Discretionary', percentage: 15.2 },
          { sector: 'Industrials', percentage: 12.8 },
          { sector: 'Materials', percentage: 11.3 },
          { sector: 'Others', percentage: 42.2 }
        ],
        portfolioTurnover: 35.7,
        totalEquityPercentage: 95.2,
        totalDebtPercentage: 1.8,
        totalCashPercentage: 3.0
      },
      '100016': {
        schemeCode: '100016',
        schemeName: 'SBI Bluechip Fund - Direct Growth',
        aum: 28650,
        portfolioDate: '2024-12-31',
        holdings: [
          { stockName: 'Reliance Industries Ltd', isin: 'INE002A01018', percentage: 8.4, marketValue: 2409.24, quantity: 12500000, industry: 'Energy' },
          { stockName: 'Tata Consultancy Services Ltd', isin: 'INE467B01029', percentage: 7.2, marketValue: 2062.8, quantity: 5800000, industry: 'Information Technology' },
          { stockName: 'HDFC Bank Ltd', isin: 'INE040A01034', percentage: 6.8, marketValue: 1948.2, quantity: 11200000, industry: 'Financial Services' },
          { stockName: 'Infosys Ltd', isin: 'INE009A01021', percentage: 5.9, marketValue: 1690.35, quantity: 8950000, industry: 'Information Technology' },
          { stockName: 'ICICI Bank Ltd', isin: 'INE090A01013', percentage: 5.2, marketValue: 1489.8, quantity: 12800000, industry: 'Financial Services' }
        ],
        sectorAllocation: [
          { sector: 'Financial Services', percentage: 25.2 },
          { sector: 'Information Technology', percentage: 22.8 },
          { sector: 'Energy', percentage: 12.5 },
          { sector: 'Consumer Goods', percentage: 10.3 },
          { sector: 'Others', percentage: 29.2 }
        ],
        portfolioTurnover: 22.3,
        totalEquityPercentage: 96.8,
        totalDebtPercentage: 1.2,
        totalCashPercentage: 2.0
      },
      '120601': {
        schemeCode: '120601',
        schemeName: 'ICICI Prudential All Seasons Bond Fund - Direct Plan',
        aum: 2402,
        portfolioDate: '2024-12-31',
        holdings: [
          { stockName: '7.17% GOI 2028', isin: 'IN0020150097', percentage: 12.5, marketValue: 300.25, quantity: 3000000, industry: 'Government Securities' },
          { stockName: '6.45% GOI 2029', isin: 'IN0020160096', percentage: 11.8, marketValue: 283.44, quantity: 2850000, industry: 'Government Securities' },
          { stockName: '7.26% GOI 2032', isin: 'IN0020170095', percentage: 10.2, marketValue: 245.04, quantity: 2450000, industry: 'Government Securities' },
          { stockName: 'HDFC Bank Ltd', isin: 'INE040A01034', percentage: 3.1, marketValue: 74.46, quantity: 450000, industry: 'Banking' },
          { stockName: 'State Bank of India', isin: 'INE062A01020', percentage: 2.8, marketValue: 67.26, quantity: 850000, industry: 'Banking' }
        ],
        sectorAllocation: [
          { sector: 'Government Securities', percentage: 65.2 },
          { sector: 'Banking', percentage: 18.5 },
          { sector: 'Corporate Bonds', percentage: 12.8 },
          { sector: 'Cash & Cash Equivalents', percentage: 3.5 }
        ],
        portfolioTurnover: 24.3,
        totalEquityPercentage: 5.2,
        totalDebtPercentage: 91.8,
        totalCashPercentage: 3.0
      }
    };

    return portfolioMap[schemeCode] || null;
  }

  static async scrapeAMFIEdgeFunction(schemeCode: string): Promise<PortfolioData | null> {
    console.log('Using mock data for AMFI edge function for scheme:', schemeCode);
    return this.scrapeGrowwPortfolio(schemeCode);
  }

  static async scrapePortfolioData(schemeCode: string): Promise<PortfolioData | null> {
    console.log('Fetching portfolio data for scheme:', schemeCode);
    return this.scrapeGrowwPortfolio(schemeCode);
  }
}
