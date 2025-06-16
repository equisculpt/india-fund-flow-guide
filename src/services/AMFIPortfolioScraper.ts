
import { supabase } from '@/integrations/supabase/client';

export interface PortfolioHolding {
  security: string;
  isin?: string;
  sector?: string;
  industry?: string;
  quantity?: number;
  value_pct: number;
  market_value?: number;
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

  // Get portfolio data for a specific scheme
  static async getSchemePortfolio(schemeCode: string, portfolioDate?: string) {
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
      return data as AMFIPortfolioEntry;
    } catch (error) {
      console.error('Error fetching scheme portfolio:', error);
      throw error;
    }
  }

  // Get portfolios by AMC
  static async getAMCPortfolios(amcName: string, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('amfi_portfolio_data')
        .select('*')
        .eq('amc_name', amcName)
        .order('portfolio_date', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as AMFIPortfolioEntry[];
    } catch (error) {
      console.error('Error fetching AMC portfolios:', error);
      throw error;
    }
  }

  // Get latest portfolios across all AMCs
  static async getLatestPortfolios(limit = 20) {
    try {
      const { data, error } = await supabase
        .from('amfi_portfolio_data')
        .select('*')
        .order('portfolio_date', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as AMFIPortfolioEntry[];
    } catch (error) {
      console.error('Error fetching latest portfolios:', error);
      throw error;
    }
  }

  // Search holdings across all portfolios
  static async searchHoldings(securityName: string, sector?: string) {
    try {
      let query = supabase
        .from('amfi_portfolio_data')
        .select('*')
        .textSearch('portfolio_data', securityName);

      const { data, error } = await query;

      if (error) throw error;

      // Filter results to include only portfolios with matching holdings
      const filteredData = data?.filter(portfolio => {
        const holdings = portfolio.portfolio_data.holdings as PortfolioHolding[];
        return holdings.some(holding => 
          holding.security.toLowerCase().includes(securityName.toLowerCase()) &&
          (!sector || holding.sector?.toLowerCase().includes(sector.toLowerCase()))
        );
      });

      return filteredData as AMFIPortfolioEntry[];
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
}
