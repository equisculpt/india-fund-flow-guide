
export interface PortfolioHolding {
  stockName: string;
  isin: string;
  percentage: number;
  marketValue: number;
  quantity: number;
  avgCost: number;
}

export interface AMFIPortfolioData {
  schemeCode: string;
  schemeName: string;
  aum: number;
  portfolioDate: string;
  holdings: PortfolioHolding[];
  sectorAllocation: Array<{
    sector: string;
    percentage: number;
  }>;
  portfolioTurnover: number;
}

export class AMFIPortfolioScraper {
  private static AMFI_BASE_URL = 'https://www.amfiindia.com/investor-corner/online-center/portfoliodisclosure';
  
  static async scrapePortfolioData(schemeCode: string): Promise<AMFIPortfolioData | null> {
    try {
      console.log(`Attempting to scrape portfolio data for scheme: ${schemeCode}`);
      
      // For now, return mock data since direct web scraping from browser has CORS limitations
      // In a real implementation, this would be done through a backend service
      return this.getMockPortfolioData(schemeCode);
      
    } catch (error) {
      console.error('Error scraping AMFI portfolio data:', error);
      return null;
    }
  }

  private static getMockPortfolioData(schemeCode: string): AMFIPortfolioData {
    // Detect fund type based on scheme code and common naming patterns
    const fundName = this.getFundNameBySchemeCode(schemeCode);
    const isSmallCap = fundName.toLowerCase().includes('small') || 
                      fundName.toLowerCase().includes('micro') ||
                      schemeCode === '120601'; // SBI Small Cap Fund
    const isMidCap = fundName.toLowerCase().includes('mid') || 
                     fundName.toLowerCase().includes('medium');
    const isLargeCap = fundName.toLowerCase().includes('large') || 
                      fundName.toLowerCase().includes('blue') ||
                      (!isSmallCap && !isMidCap && Math.random() > 0.7);
    
    console.log(`Fund categorization for ${schemeCode}: Small=${isSmallCap}, Mid=${isMidCap}, Large=${isLargeCap}`);
    
    const largeCapStocks = [
      'Reliance Industries Ltd', 'HDFC Bank Ltd', 'Infosys Ltd', 'TCS Ltd', 
      'ITC Ltd', 'HDFC Ltd', 'Kotak Mahindra Bank', 'Bharti Airtel Ltd',
      'ICICI Bank Ltd', 'State Bank of India'
    ];
    
    const midCapStocks = [
      'Asian Paints Ltd', 'Bajaj Finance Ltd', 'SBI Life Insurance', 
      'Page Industries Ltd', 'Pidilite Industries', 'Godrej Consumer Products',
      'Marico Ltd', 'Jubilant FoodWorks', 'Info Edge Ltd', 'Crompton Greaves',
      'Voltas Ltd', 'Torrent Pharmaceuticals', 'Aurobindo Pharma', 'Grasim Industries'
    ];
    
    const smallCapStocks = [
      'Dixon Technologies Ltd', 'Polycab India Ltd', 'Lemon Tree Hotels', 
      'CEAT Ltd', 'Ramco Cements', 'Bharat Electronics', 'KPIT Technologies',
      'Carborundum Universal', 'Timken India', 'Hatsun Agro Products',
      'GTPL Hathway Ltd', 'Rajesh Exports', 'Welspun India', 'Fine Organic Industries',
      'JK Paper Ltd', 'Jyothy Labs', 'VIP Industries', 'Supreme Industries',
      'Relaxo Footwears', 'Vinati Organics'
    ];

    // Select appropriate stock pool based on fund type
    let stockPool: string[] = [];
    if (isSmallCap) {
      stockPool = smallCapStocks;
      console.log('Using small cap stocks for', schemeCode);
    } else if (isMidCap) {
      stockPool = [...midCapStocks, ...smallCapStocks.slice(0, 5)];
      console.log('Using mid cap stocks for', schemeCode);
    } else {
      stockPool = [...largeCapStocks, ...midCapStocks.slice(0, 3)];
      console.log('Using large cap stocks for', schemeCode);
    }

    const holdings: PortfolioHolding[] = [];
    let remainingPercentage = 100;
    
    // Generate holdings with appropriate concentration
    const maxHoldings = isSmallCap ? 20 : (isMidCap ? 15 : 12);
    const maxSingleHolding = isSmallCap ? 5 : (isMidCap ? 6 : 8);
    
    for (let i = 0; i < Math.min(maxHoldings, stockPool.length); i++) {
      const percentage = Math.min(
        remainingPercentage * 0.3, 
        Math.random() * maxSingleHolding + 1
      );
      
      holdings.push({
        stockName: stockPool[i],
        isin: `INE${Math.random().toString(36).substr(2, 6).toUpperCase()}01`,
        percentage: Number(percentage.toFixed(2)),
        marketValue: percentage * 1000000, // Mock market value
        quantity: Math.floor(Math.random() * 100000) + 1000,
        avgCost: Math.random() * 1000 + 100
      });
      
      remainingPercentage -= percentage;
      if (remainingPercentage <= 10) break;
    }

    // Generate appropriate sector allocation
    const sectorAllocation = this.getSectorAllocation(isSmallCap, isMidCap, isLargeCap);

    return {
      schemeCode,
      schemeName: fundName,
      aum: Math.random() * (isSmallCap ? 2000 : (isMidCap ? 5000 : 15000)) + 500, // Realistic AUM
      portfolioDate: new Date().toISOString().split('T')[0],
      holdings: holdings.sort((a, b) => b.percentage - a.percentage),
      sectorAllocation,
      portfolioTurnover: Math.random() * (isSmallCap ? 80 : (isMidCap ? 60 : 40)) + 20 // Higher turnover for smaller funds
    };
  }

  private static getFundNameBySchemeCode(schemeCode: string): string {
    // Map known scheme codes to fund names
    const fundMapping: { [key: string]: string } = {
      '120601': 'SBI Small Cap Fund',
      '120602': 'SBI Large Cap Fund',
      '120603': 'SBI Mid Cap Fund',
      // Add more mappings as needed
    };
    
    return fundMapping[schemeCode] || `Fund ${schemeCode}`;
  }

  private static getSectorAllocation(isSmallCap: boolean, isMidCap: boolean, isLargeCap: boolean) {
    if (isSmallCap) {
      return [
        { sector: 'Consumer Discretionary', percentage: 25 },
        { sector: 'Industrials', percentage: 20 },
        { sector: 'Information Technology', percentage: 15 },
        { sector: 'Healthcare', percentage: 12 },
        { sector: 'Materials', percentage: 10 },
        { sector: 'Consumer Staples', percentage: 8 },
        { sector: 'Financial Services', percentage: 6 },
        { sector: 'Others', percentage: 4 }
      ];
    } else if (isMidCap) {
      return [
        { sector: 'Financial Services', percentage: 22 },
        { sector: 'Information Technology', percentage: 18 },
        { sector: 'Consumer Discretionary', percentage: 16 },
        { sector: 'Healthcare', percentage: 14 },
        { sector: 'Industrials', percentage: 12 },
        { sector: 'Consumer Staples', percentage: 10 },
        { sector: 'Materials', percentage: 8 }
      ];
    } else {
      return [
        { sector: 'Financial Services', percentage: 35 },
        { sector: 'Information Technology', percentage: 25 },
        { sector: 'Consumer Goods', percentage: 15 },
        { sector: 'Energy', percentage: 12 },
        { sector: 'Healthcare', percentage: 8 },
        { sector: 'Others', percentage: 5 }
      ];
    }
  }

  static async getRecentPortfolioChanges(schemeCode: string): Promise<Array<{
    action: 'Added' | 'Increased' | 'Reduced' | 'Exited';
    stockName: string;
    percentageChange: string;
    date: string;
  }>> {
    // Generate realistic changes based on fund type
    const fundName = this.getFundNameBySchemeCode(schemeCode);
    const isSmallCap = fundName.toLowerCase().includes('small');
    
    if (isSmallCap) {
      return [
        { action: 'Added' as const, stockName: 'Dixon Technologies Ltd', percentageChange: '1.8%', date: '15 Dec 2024' },
        { action: 'Increased' as const, stockName: 'Polycab India Ltd', percentageChange: '+0.7%', date: '10 Dec 2024' },
        { action: 'Reduced' as const, stockName: 'CEAT Ltd', percentageChange: '-1.2%', date: '8 Dec 2024' },
        { action: 'Exited' as const, stockName: 'Fine Organic Industries', percentageChange: '-2.3%', date: '5 Dec 2024' }
      ];
    } else {
      return [
        { action: 'Added' as const, stockName: 'Adani Ports & SEZ', percentageChange: '1.2%', date: '15 Dec 2024' },
        { action: 'Increased' as const, stockName: 'HDFC Bank', percentageChange: '+0.5%', date: '10 Dec 2024' },
        { action: 'Reduced' as const, stockName: 'Wipro Ltd', percentageChange: '-0.8%', date: '8 Dec 2024' },
        { action: 'Exited' as const, stockName: 'Yes Bank', percentageChange: '-2.1%', date: '5 Dec 2024' }
      ];
    }
  }
}
