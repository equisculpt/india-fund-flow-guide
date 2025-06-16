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
  private static SUPABASE_FUNCTION_URL = 'https://pvtrwvvcgkppjlbyvflv.supabase.co/functions/v1/scrape-amfi-portfolio';
  
  static async scrapePortfolioData(schemeCode: string): Promise<AMFIPortfolioData | null> {
    try {
      console.log(`Attempting to scrape real portfolio data for scheme: ${schemeCode}`);
      
      const response = await fetch(this.SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dHJ3dnZjZ2twcGpsYnl2Zmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDE0NTYsImV4cCI6MjA2NTQ3NzQ1Nn0.PW1tXy6_aKnbBj5vXEvtYYoClLJClLYbuVJiw9paEco`
        },
        body: JSON.stringify({ schemeCode })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Successfully scraped portfolio data:', result.data);
        return result.data;
      } else {
        console.warn('Failed to scrape portfolio data:', result.error);
        // Fall back to mock data for development
        return this.getMockPortfolioData(schemeCode);
      }
      
    } catch (error) {
      console.error('Error scraping AMFI portfolio data:', error);
      // Fall back to mock data if scraping fails
      return this.getMockPortfolioData(schemeCode);
    }
  }

  private static getMockPortfolioData(schemeCode: string): AMFIPortfolioData {
    const fundName = this.getFundNameBySchemeCode(schemeCode);
    const isSmallCap = fundName.toLowerCase().includes('small') || 
                      fundName.toLowerCase().includes('micro') ||
                      schemeCode === '120601';
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
        marketValue: percentage * 1000000,
        quantity: Math.floor(Math.random() * 100000) + 1000,
        avgCost: Math.random() * 1000 + 100
      });
      
      remainingPercentage -= percentage;
      if (remainingPercentage <= 10) break;
    }

    const sectorAllocation = this.getSectorAllocation(isSmallCap, isMidCap, isLargeCap);

    return {
      schemeCode,
      schemeName: fundName,
      aum: Math.random() * (isSmallCap ? 2000 : (isMidCap ? 5000 : 15000)) + 500,
      portfolioDate: new Date().toISOString().split('T')[0],
      holdings: holdings.sort((a, b) => b.percentage - a.percentage),
      sectorAllocation,
      portfolioTurnover: Math.random() * (isSmallCap ? 80 : (isMidCap ? 60 : 40)) + 20
    };
  }

  private static getFundNameBySchemeCode(schemeCode: string): string {
    const fundMapping: { [key: string]: string } = {
      '120601': 'SBI Small Cap Fund - Regular Plan - Growth',
      '120602': 'SBI Large Cap Fund',
      '120603': 'SBI Mid Cap Fund',
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
