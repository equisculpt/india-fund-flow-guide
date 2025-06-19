
import { supabase } from '@/integrations/supabase/client';
import { ParsedPortfolioData } from '../AMCPortfolioParser';

export class PortfolioDataProcessor {
  static async storePortfolioData(portfolios: ParsedPortfolioData[], sourceFile: any) {
    const results = [];

    for (const portfolio of portfolios) {
      try {
        // Store main portfolio data
        const { error: portfolioError } = await supabase
          .from('amfi_portfolio_data')
          .upsert({
            scheme_code: portfolio.scheme_code || this.generateSchemeCode(portfolio.scheme_name),
            scheme_name: portfolio.scheme_name,
            amc_name: sourceFile.amc_name,
            portfolio_date: sourceFile.portfolio_date,
            portfolio_data: {
              holdings: portfolio.holdings,
              total_securities: portfolio.total_securities,
              nav: portfolio.nav,
              aum: portfolio.aum,
              metadata: {
                source_file: sourceFile.file_name,
                upload_date: sourceFile.created_at,
                file_type: sourceFile.file_type
              }
            },
            scrape_status: 'success',
            scrape_source: 'manual_upload'
          }, { onConflict: 'scheme_code,portfolio_date' });

        if (portfolioError) {
          console.error('Error storing portfolio data:', portfolioError);
          results.push({ scheme: portfolio.scheme_name, success: false, error: portfolioError.message });
          continue;
        }

        // Store individual holdings
        await this.storeIndividualHoldings(portfolio, sourceFile);
        
        results.push({ scheme: portfolio.scheme_name, success: true });

      } catch (error) {
        console.error(`Error processing portfolio ${portfolio.scheme_name}:`, error);
        results.push({ scheme: portfolio.scheme_name, success: false, error: error.message });
      }
    }

    return results;
  }

  private static async storeIndividualHoldings(portfolio: ParsedPortfolioData, sourceFile: any) {
    const holdingsData = portfolio.holdings.map(holding => ({
      scheme_code: portfolio.scheme_code || this.generateSchemeCode(portfolio.scheme_name),
      scheme_name: portfolio.scheme_name,
      amc_name: sourceFile.amc_name,
      portfolio_date: sourceFile.portfolio_date,
      security_name: holding.security,
      isin_code: holding.isin,
      sector: holding.sector,
      percentage_holding: holding.value_pct,
      market_value: holding.market_value
    }));

    // Upsert holdings data
    const { error } = await supabase
      .from('portfolio_holdings')
      .upsert(holdingsData, { 
        onConflict: 'scheme_code,portfolio_date,security_name' 
      });

    if (error) {
      console.error('Error storing holdings:', error);
      throw error;
    }
  }

  private static generateSchemeCode(schemeName: string): string {
    return schemeName
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .substring(0, 8) + Math.random().toString(36).substr(2, 4).toUpperCase();
  }
}
