
import { PortfolioFileManager } from './portfolio/FileManager';
import { PortfolioProcessor } from './portfolio/PortfolioProcessor';
import { SupportedAMCsManager } from './portfolio/SupportedAMCs';
import { ParsedPortfolioData, ProcessingResult } from './portfolio/types/PortfolioTypes';
import { AMCPortfolioFile } from './portfolio/AMCParserFactory';

export { ParsedPortfolioData, ProcessingResult };
export type { AMCPortfolioFile };

export class AMCPortfolioParser {
  
  // Get uploaded files for processing
  static async getUploadedFiles(status = 'uploaded'): Promise<AMCPortfolioFile[]> {
    return PortfolioFileManager.getUploadedFiles(status);
  }

  // Parse portfolio file using smart parser
  static async parsePortfolioFile(fileId: string): Promise<ParsedPortfolioData[]> {
    return PortfolioProcessor.parsePortfolioFile(fileId);
  }

  // Process all uploaded files
  static async processAllUploadedFiles(): Promise<ProcessingResult[]> {
    return PortfolioProcessor.processAllUploadedFiles();
  }

  // Get supported AMCs
  static getSupportedAMCs(): string[] {
    return SupportedAMCsManager.getSupportedAMCs();
  }

  // Check if AMC is supported
  static isAMCSupported(amcName: string): boolean {
    return SupportedAMCsManager.isAMCSupported(amcName);
  }

  // Get AMC capabilities
  static getAMCCapabilities(amcName: string) {
    return SupportedAMCsManager.getAMCCapabilities(amcName);
  }
}
