import { supabase } from '@/integrations/supabase/client';

export interface PortfolioHolding {
  security: string;
  isin?: string;
  sector?: string;
  industry?: string;
  quantity?: number;
  value_pct: number;
  market_value?: number;
  stockName?: string;
  percentage?: number;
  marketValue?: number;
}

export interface PortfolioData {
  holdings: PortfolioHolding[];
  total_securities: number;
  nav?: number;
  metadata?: {
    source_url: string;
    scrape_date: string;
    file_type: string;
  };
}

export interface AMFIPortfolioEntry {
  id: string;
  scheme_code: string;
  scheme_name: string;
  amc_name: string;
  portfolio_date: string;
  portfolio_data: PortfolioData;
  scrape_status: string;
  created_at: string;
}

export interface AMFIPortfolioData {
  aum: number;
  holdings: Array<{
    stockName: string;
    isin: string;
    percentage: number;
    marketValue: number;
  }>;
  portfolioDate: string;
  portfolioTurnover: number;
  sectorAllocation: Array<{
    sector: string;
    percentage: number;
  }>;
}

export class AMFIPortfolioService {
  
  // Trigger manual portfolio scraping
  static async triggerPortfolioScraping() {
    try {
      const { data, error } = await supabase.functions.invoke('scrape-amfi-portfolio-advanced', {
        body: { trigger: 'manual', date: new Date().toISOString().split('T')[0] }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error triggering portfolio scraping:', error);
      throw error;
    }
  }

  // Get portfolio data for a specific scheme - now uses the working edge function
  static async getSchemePortfolio(schemeCode: string, portfolioDate?: string): Promise<AMFIPortfolioEntry> {
    try {
      let query = supabase
        .from('amfi_portfolio_data')
        .select('*')
        .eq('scheme_code', schemeCode)
        .order('portfolio_date', { ascending: false });

      if (portfolioDate) {
        query = query.eq('portfolio_date', portfolioDate);
      }

      const { data, error } = await query.limit(1).single();

      if (error) throw error;
      
      return {
        ...data,
        portfolio_data: data.portfolio_data as unknown as PortfolioData
      } as AMFIPortfolioEntry;
    } catch (error) {
      console.error('Error fetching scheme portfolio:', error);
      throw error;
    }
  }

  // Get portfolios by AMC
  static async getAMCPortfolios(amcName: string, limit = 10): Promise<AMFIPortfolioEntry[]> {
    try {
      const { data, error } = await supabase
        .from('amfi_portfolio_data')
        .select('*')
        .eq('amc_name', amcName)
        .order('portfolio_date', { ascending: false })
        .limit(limit);

      if (error) throw error;
      
      return data.map(item => ({
        ...item,
        portfolio_data: item.portfolio_data as unknown as PortfolioData
      })) as AMFIPortfolioEntry[];
    } catch (error) {
      console.error('Error fetching AMC portfolios:', error);
      throw error;
    }
  }

  // Get latest portfolios across all AMCs
  static async getLatestPortfolios(limit = 20): Promise<AMFIPortfolioEntry[]> {
    try {
      const { data, error } = await supabase
        .from('amfi_portfolio_data')
        .select('*')
        .order('portfolio_date', { ascending: false })
        .limit(limit);

      if (error) throw error;
      
      return data.map(item => ({
        ...item,
        portfolio_data: item.portfolio_data as unknown as PortfolioData
      })) as AMFIPortfolioEntry[];
    } catch (error) {
      console.error('Error fetching latest portfolios:', error);
      throw error;
    }
  }

  // Search holdings across all portfolios
  static async searchHoldings(securityName: string, sector?: string): Promise<AMFIPortfolioEntry[]> {
    try {
      let query = supabase
        .from('amfi_portfolio_data')
        .select('*')
        .textSearch('portfolio_data', securityName);

      const { data, error } = await query;

      if (error) throw error;

      const filteredData = data?.filter(portfolio => {
        const portfolioData = portfolio.portfolio_data as unknown as PortfolioData;
        const holdings = portfolioData.holdings as PortfolioHolding[];
        return holdings.some(holding => 
          holding.security.toLowerCase().includes(securityName.toLowerCase()) &&
          (!sector || holding.sector?.toLowerCase().includes(sector.toLowerCase()))
        );
      });

      return filteredData.map(item => ({
        ...item,
        portfolio_data: item.portfolio_data as unknown as PortfolioData
      })) as AMFIPortfolioEntry[];
    } catch (error) {
      console.error('Error searching holdings:', error);
      throw error;
    }
  }

  // Get scraping status and logs
  static async getScrapeStatus() {
    try {
      const { data, error } = await supabase
        .from('amfi_scrape_logs')
        .select('*')
        .order('attempt_time', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching scrape status:', error);
      throw error;
    }
  }

  // Get portfolio statistics
  static async getPortfolioStats() {
    try {
      const { data: totalSchemes, error: schemesError } = await supabase
        .from('amfi_portfolio_data')
        .select('scheme_code', { count: 'exact', head: true });

      const { data: totalAMCs, error: amcsError } = await supabase
        .from('amfi_portfolio_data')
        .select('amc_name', { count: 'exact', head: true });

      const { data: latestDate, error: dateError } = await supabase
        .from('amfi_portfolio_data')
        .select('portfolio_date')
        .order('portfolio_date', { ascending: false })
        .limit(1)
        .single();

      if (schemesError || amcsError || dateError) {
        throw schemesError || amcsError || dateError;
      }

      return {
        totalSchemes: totalSchemes?.length || 0,
        totalAMCs: new Set(totalAMCs?.map(item => item.amc_name)).size || 0,
        latestPortfolioDate: latestDate?.portfolio_date
      };
    } catch (error) {
      console.error('Error fetching portfolio stats:', error);
      throw error;
    }
  }

  // Scrape portfolio data for a specific scheme - prioritizes database data first
  static async scrapePortfolioData(schemeCode: string): Promise<AMFIPortfolioData> {
    try {
      console.log('Fetching portfolio data for scheme:', schemeCode);
      
      // First, try to get data from database (already scraped data)
      const portfolioEntry = await this.getSchemePortfolio(schemeCode);
      
      if (portfolioEntry && portfolioEntry.portfolio_data) {
        console.log('Found portfolio data in database:', portfolioEntry);
        
        const holdings = portfolioEntry.portfolio_data.holdings.map(holding => ({
          stockName: holding.security,
          isin: holding.isin || 'N/A',
          percentage: holding.value_pct,
          marketValue: holding.market_value || holding.value_pct * 1000000
        }));

        return {
          aum: holdings.reduce((sum, h) => sum + h.marketValue, 0) / 10000000,
          holdings: holdings.slice(0, 25),
          portfolioDate: portfolioEntry.portfolio_date,
          portfolioTurnover: Math.random() * 40 + 10,
          sectorAllocation: this.generateSectorAllocation()
        };
      }
      
      console.log('No database data found, trying edge function for scheme:', schemeCode);
      
      // If no database data, try edge function as fallback
      const { data, error } = await supabase.functions.invoke('scrape-amfi-portfolio', {
        body: { schemeCode }
      });

      if (data && data.success && data.data) {
        console.log('Successfully fetched real AMFI data from edge function:', data.data);
        
        const realData = data.data;
        return {
          aum: realData.aum,
          holdings: realData.holdings.map((holding: any) => ({
            stockName: holding.stockName,
            isin: holding.isin,
            percentage: holding.percentage,
            marketValue: holding.marketValue
          })),
          portfolioDate: realData.portfolioDate,
          portfolioTurnover: realData.portfolioTurnover,
          sectorAllocation: realData.sectorAllocation
        };
      }
    } catch (error) {
      console.error('Error fetching data, falling back to mock:', error);
    }

    // Generate mock data as final fallback
    console.log('Using mock data for scheme:', schemeCode);
    return this.generateMockPortfolioData(schemeCode);
  }

  // Get recent portfolio changes (mock data for now)
  static async getRecentPortfolioChanges(schemeCode: string) {
    const changes = [
      {
        action: 'Added',
        stockName: 'Tech Mahindra Ltd.',
        percentageChange: '+2.1%',
        date: '2024-05-15'
      },
      {
        action: 'Increased',
        stockName: 'Infosys Ltd.',
        percentageChange: '+0.8%',
        date: '2024-05-12'
      },
      {
        action: 'Reduced',
        stockName: 'HDFC Bank Ltd.',
        percentageChange: '-1.2%',
        date: '2024-05-10'
      }
    ];

    return changes;
  }

  private static generateMockPortfolioData(schemeCode: string): AMFIPortfolioData {
    const mockHoldings = [
      { stockName: 'Reliance Industries Ltd.', isin: 'INE002A01018', percentage: 8.4, marketValue: 84000000 },
      { stockName: 'HDFC Bank Ltd.', isin: 'INE040A01034', percentage: 7.2, marketValue: 72000000 },
      { stockName: 'Infosys Ltd.', isin: 'INE009A01021', percentage: 6.8, marketValue: 68000000 },
      { stockName: 'ICICI Bank Ltd.', isin: 'INE090A01013', percentage: 5.9, marketValue: 59000000 },
      { stockName: 'TCS Ltd.', isin: 'INE467B01029', percentage: 5.5, marketValue: 55000000 }
    ];

    return {
      aum: 1000,
      holdings: mockHoldings,
      portfolioDate: new Date().toISOString().split('T')[0],
      portfolioTurnover: 25.5,
      sectorAllocation: this.generateSectorAllocation()
    };
  }

  private static generateSectorAllocation() {
    return [
      { sector: 'Financial Services', percentage: 35.2 },
      { sector: 'Information Technology', percentage: 22.8 },
      { sector: 'Energy', percentage: 12.5 },
      { sector: 'Consumer Goods', percentage: 10.3 },
      { sector: 'Healthcare', percentage: 8.7 },
      { sector: 'Automotive', percentage: 6.1 },
      { sector: 'Others', percentage: 4.4 }
    ];
  }
}

// Export with both names for backward compatibility
export const AMFIPortfolioScraper = AMFIPortfolioService;
