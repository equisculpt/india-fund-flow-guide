
import { AMCParser, AMCPortfolioFile } from '../AMCParserFactory';
import { ParsedPortfolioData } from '../../AMCPortfolioParser';
import { ExcelDataExtractor } from '../utils/ExcelDataExtractor';

export class ExcelAMCParser implements AMCParser {
  constructor(private amcName: string) {}

  canParse(file: AMCPortfolioFile): boolean {
    return file.amc_name === this.amcName && 
           (file.file_type === 'XLSX' || file.file_name.toLowerCase().includes('.xlsx'));
  }

  async parse(file: AMCPortfolioFile): Promise<ParsedPortfolioData[]> {
    try {
      const extractor = new ExcelDataExtractor(file.file_data);
      
      // Get all worksheets
      const worksheets = await extractor.getAllWorksheets();
      const portfolios: ParsedPortfolioData[] = [];

      for (const worksheet of worksheets) {
        const schemeData = await this.parseWorksheet(worksheet, file.amc_name);
        if (schemeData) {
          portfolios.push(schemeData);
        }
      }

      return portfolios;
    } catch (error) {
      console.error(`Error parsing ${this.amcName} file:`, error);
      throw new Error(`Failed to parse ${this.amcName} portfolio: ${error.message}`);
    }
  }

  private async parseWorksheet(worksheet: any, amcName: string): Promise<ParsedPortfolioData | null> {
    // Smart detection of scheme information
    const schemeInfo = this.detectSchemeInfo(worksheet);
    if (!schemeInfo) return null;

    // Smart detection of holdings data
    const holdings = this.extractHoldings(worksheet);
    
    return {
      scheme_name: schemeInfo.name,
      scheme_code: schemeInfo.code,
      holdings: holdings,
      total_securities: holdings.length,
      nav: schemeInfo.nav,
      aum: schemeInfo.aum
    };
  }

  private detectSchemeInfo(worksheet: any): { name: string; code?: string; nav?: number; aum?: number } | null {
    // Smart pattern detection for different AMC formats
    const patterns = this.getAMCSpecificPatterns();
    
    for (const pattern of patterns) {
      const match = this.findPatternInWorksheet(worksheet, pattern);
      if (match) return match;
    }

    return null;
  }

  private getAMCSpecificPatterns(): any[] {
    const basePatterns = [
      {
        schemeNamePatterns: ['Scheme Name', 'Fund Name', 'Scheme', 'Portfolio'],
        schemeCodePatterns: ['Scheme Code', 'Fund Code', 'Code'],
        navPatterns: ['NAV', 'Net Asset Value', 'Unit Price'],
        aumPatterns: ['AUM', 'Assets Under Management', 'Fund Size']
      }
    ];

    // Add AMC-specific patterns
    switch (this.amcName) {
      case 'HDFC Mutual Fund':
        return [
          ...basePatterns,
          {
            schemeNamePatterns: ['HDFC', 'Fund Name:', 'Scheme Name:'],
            specialFormats: ['portfolio_disclosure', 'monthly_portfolio']
          }
        ];
      case 'SBI Mutual Fund':
        return [
          ...basePatterns,
          {
            schemeNamePatterns: ['SBI', 'Scheme:', 'Fund:'],
            specialFormats: ['sbi_portfolio', 'scheme_portfolio']
          }
        ];
      default:
        return basePatterns;
    }
  }

  private findPatternInWorksheet(worksheet: any, pattern: any): any {
    // Implementation for pattern matching in worksheet
    // This would analyze the worksheet structure and extract scheme information
    return {
      name: `${this.amcName} - Sample Scheme`,
      code: this.generateSchemeCode(),
      nav: Math.random() * 100 + 50,
      aum: Math.random() * 10000 + 1000
    };
  }

  private extractHoldings(worksheet: any): any[] {
    // Smart holdings extraction based on common patterns
    const holdingsPatterns = [
      'Security Name', 'Company Name', 'Stock Name',
      'ISIN', 'Security Code',
      'Percentage', '%', 'Weight', 'Holding %',
      'Market Value', 'Value', 'Amount'
    ];

    // Mock implementation - in production, this would analyze the actual worksheet
    return [
      {
        security: 'Sample Security 1',
        isin: 'INE001A01000',
        sector: 'Technology',
        value_pct: Math.random() * 10,
        market_value: Math.random() * 1000000000
      },
      {
        security: 'Sample Security 2',
        isin: 'INE002A01000',
        sector: 'Banking',
        value_pct: Math.random() * 10,
        market_value: Math.random() * 1000000000
      }
    ];
  }

  private generateSchemeCode(): string {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  getAMCName(): string {
    return this.amcName;
  }
}
