
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
    // Generate realistic mock data based on scheme code patterns
    const isLargeCap = schemeCode.includes('large') || Math.random() > 0.7;
    const isMidCap = schemeCode.includes('mid') || (!isLargeCap && Math.random() > 0.5);
    
    const largeCapStocks = [
      'Reliance Industries Ltd', 'HDFC Bank Ltd', 'Infosys Ltd', 'TCS Ltd', 
      'ITC Ltd', 'HDFC Ltd', 'Kotak Mahindra Bank', 'Bharti Airtel Ltd',
      'ICICI Bank Ltd', 'State Bank of India'
    ];
    
    const midCapStocks = [
      'Asian Paints Ltd', 'Bajaj Finance Ltd', 'SBI Life Insurance', 
      'Page Industries Ltd', 'Pidilite Industries', 'Godrej Consumer Products',
      'Marico Ltd', 'Jubilant FoodWorks', 'Info Edge Ltd', 'Crompton Greaves'
    ];
    
    const smallCapStocks = [
      'Dixon Technologies Ltd', 'Polycab India Ltd', 'Lemon Tree Hotels', 
      'CEAT Ltd', 'Ramco Cements', 'Bharat Electronics', 'KPIT Technologies',
      'Carborundum Universal', 'Timken India', 'Hatsun Agro Products'
    ];

    let stockPool = largeCapStocks;
    if (isMidCap) stockPool = [...largeCapStocks.slice(0, 3), ...midCapStocks];
    if (!isLargeCap && !isMidCap) stockPool = [...midCapStocks.slice(0, 3), ...smallCapStocks];

    const holdings: PortfolioHolding[] = [];
    let remainingPercentage = 100;
    
    for (let i = 0; i < Math.min(15, stockPool.length); i++) {
      const maxAllocation = i === 0 ? 10 : (i < 5 ? 8 : 4);
      const percentage = Math.min(
        remainingPercentage * 0.4, 
        Math.random() * maxAllocation + (i === 0 ? 5 : 1)
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
      if (remainingPercentage <= 5) break;
    }

    const sectorAllocation = [
      { sector: 'Banking & Financial Services', percentage: isLargeCap ? 35 : 25 },
      { sector: 'Information Technology', percentage: isLargeCap ? 25 : 20 },
      { sector: 'Consumer Goods', percentage: 15 },
      { sector: 'Energy', percentage: isLargeCap ? 12 : 8 },
      { sector: 'Healthcare', percentage: 8 },
      { sector: 'Others', percentage: 5 }
    ];

    return {
      schemeCode,
      schemeName: `Mock Scheme ${schemeCode}`,
      aum: Math.random() * 10000 + 1000, // AUM in crores
      portfolioDate: new Date().toISOString().split('T')[0],
      holdings: holdings.sort((a, b) => b.percentage - a.percentage),
      sectorAllocation,
      portfolioTurnover: Math.random() * 50 + 10
    };
  }

  static async getRecentPortfolioChanges(schemeCode: string): Promise<Array<{
    action: 'Added' | 'Increased' | 'Reduced' | 'Exited';
    stockName: string;
    percentageChange: string;
    date: string;
  }>> {
    // Mock recent changes data
    const changes = [
      { action: 'Added' as const, stockName: 'Adani Ports & SEZ', percentageChange: '1.2%', date: '15 Dec 2024' },
      { action: 'Increased' as const, stockName: 'HDFC Bank', percentageChange: '+0.5%', date: '10 Dec 2024' },
      { action: 'Reduced' as const, stockName: 'Wipro Ltd', percentageChange: '-0.8%', date: '8 Dec 2024' },
      { action: 'Exited' as const, stockName: 'Yes Bank', percentageChange: '-2.1%', date: '5 Dec 2024' }
    ];

    return changes;
  }
}
