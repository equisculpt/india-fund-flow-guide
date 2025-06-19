
import { AMCParserFactory, AMCPortfolioFile } from './AMCParserFactory';
import { PortfolioDataProcessor } from './PortfolioDataProcessor';
import { PortfolioFileManager } from './FileManager';
import { ParsedPortfolioData, ProcessingResult } from './types/PortfolioTypes';

export class PortfolioProcessor {
  // Parse a single portfolio file
  static async parsePortfolioFile(fileId: string): Promise<ParsedPortfolioData[]> {
    try {
      const file = await PortfolioFileManager.getFileById(fileId);
      if (!file) throw new Error('File not found');

      // Get appropriate parser
      const parser = AMCParserFactory.getParser(file);
      if (!parser) {
        throw new Error(`No parser available for AMC: ${file.amc_name}, File Type: ${file.file_type}`);
      }

      // Parse the file
      return await parser.parse(file);

    } catch (error) {
      console.error('Error parsing portfolio file:', error);
      throw error;
    }
  }

  // Process a single file through the complete pipeline
  static async processSingleFile(file: AMCPortfolioFile): Promise<ProcessingResult> {
    try {
      const portfolios = await this.parsePortfolioFile(file.id);
      
      // Store parsed data
      const storeResults = await PortfolioDataProcessor.storePortfolioData(portfolios, file);
      
      const successCount = storeResults.filter(r => r.success).length;
      const errorCount = storeResults.filter(r => !r.success).length;

      // Update file status
      await PortfolioFileManager.updateFileStatus(
        file.id,
        errorCount === 0 ? 'processed' : 'error',
        errorCount > 0 ? `${errorCount} schemes failed to process` : undefined
      );

      return { 
        file: file.file_name, 
        success: errorCount === 0, 
        portfolios: successCount,
        errors: errorCount 
      };

    } catch (error) {
      console.error(`Error processing file ${file.file_name}:`, error);
      
      // Update file status to error
      await PortfolioFileManager.updateFileStatus(
        file.id,
        'error',
        error instanceof Error ? error.message : 'Processing failed'
      );

      return { 
        file: file.file_name, 
        success: false, 
        error: error instanceof Error ? error.message : 'Processing failed'
      };
    }
  }

  // Process all uploaded files
  static async processAllUploadedFiles(): Promise<ProcessingResult[]> {
    try {
      const files = await PortfolioFileManager.getUploadedFiles('uploaded');
      const results: ProcessingResult[] = [];

      for (const file of files) {
        const result = await this.processSingleFile(file);
        results.push(result);
      }

      return results;
    } catch (error) {
      console.error('Error processing uploaded files:', error);
      throw error;
    }
  }
}
