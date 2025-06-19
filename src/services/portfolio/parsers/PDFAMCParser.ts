
import { AMCParser, AMCPortfolioFile } from '../AMCParserFactory';
import { ParsedPortfolioData } from '../../AMCPortfolioParser';

export class PDFAMCParser implements AMCParser {
  constructor(private amcName: string) {}

  canParse(file: AMCPortfolioFile): boolean {
    return file.file_type === 'PDF' || file.file_name.toLowerCase().includes('.pdf');
  }

  async parse(file: AMCPortfolioFile): Promise<ParsedPortfolioData[]> {
    console.log(`Parsing PDF for ${file.amc_name}`);
    
    // Mock implementation for PDF parsing
    // In production, you'd use a PDF parsing library like pdf-parse or pdf2json
    return [{
      scheme_name: `${file.amc_name} - PDF Extracted Scheme`,
      holdings: [
        {
          security: 'PDF Extracted Security',
          value_pct: 5.0,
          market_value: 50000000
        }
      ],
      total_securities: 1,
      nav: 100.00,
      aum: 1000
    }];
  }

  getAMCName(): string {
    return this.amcName;
  }
}
