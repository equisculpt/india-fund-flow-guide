
import { ExcelAMCParser } from './parsers/ExcelAMCParser';
import { PDFAMCParser } from './parsers/PDFAMCParser';
import { ParsedPortfolioData } from '../AMCPortfolioParser';

export interface AMCPortfolioFile {
  id: string;
  amc_name: string;
  portfolio_date: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_data: string;
  upload_status: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface AMCParser {
  canParse(file: AMCPortfolioFile): boolean;
  parse(file: AMCPortfolioFile): Promise<ParsedPortfolioData[]>;
  getAMCName(): string;
}

export class AMCParserFactory {
  private static parsers: AMCParser[] = [
    new ExcelAMCParser('HDFC Mutual Fund'),
    new ExcelAMCParser('SBI Mutual Fund'),
    new ExcelAMCParser('ICICI Prudential Mutual Fund'),
    new ExcelAMCParser('Axis Mutual Fund'),
    new ExcelAMCParser('Aditya Birla Sun Life Mutual Fund'),
    new ExcelAMCParser('UTI Mutual Fund'),
    new PDFAMCParser('Generic PDF Parser'),
  ];

  static getParser(file: AMCPortfolioFile): AMCParser | null {
    return this.parsers.find(parser => parser.canParse(file)) || null;
  }

  static getAllSupportedAMCs(): string[] {
    return this.parsers.map(parser => parser.getAMCName()).filter(name => name !== 'Generic PDF Parser');
  }
}
