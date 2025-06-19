
import { supabase } from '@/integrations/supabase/client';
import { AMCParserFactory, AMCPortfolioFile } from './portfolio/AMCParserFactory';
import { PortfolioDataProcessor } from './portfolio/PortfolioDataProcessor';

export interface ParsedPortfolioData {
  scheme_name: string;
  scheme_code?: string;
  holdings: Array<{
    security: string;
    isin?: string;
    sector?: string;
    value_pct: number;
    market_value?: number;
  }>;
  total_securities: number;
  nav?: number;
  aum?: number;
}

export class AMCPortfolioParser {
  
  // Get uploaded files for processing
  static async getUploadedFiles(status = 'uploaded'): Promise<AMCPortfolioFile[]> {
    try {
      const { data, error } = await supabase
        .from('amc_portfolio_files')
        .select('*')
        .eq('upload_status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
      return [];
    }
  }

  // Parse portfolio file using smart parser
  static async parsePortfolioFile(fileId: string): Promise<ParsedPortfolioData[]> {
    try {
      const { data: file, error } = await supabase
        .from('amc_portfolio_files')
        .select('*')
        .eq('id', fileId)
        .single();

      if (error) throw error;
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

  // Process all uploaded files
  static async processAllUploadedFiles() {
    try {
      const files = await this.getUploadedFiles('uploaded');
      const results = [];

      for (const file of files) {
        try {
          const portfolios = await this.parsePortfolioFile(file.id);
          
          // Store parsed data
          const storeResults = await PortfolioDataProcessor.storePortfolioData(portfolios, file);
          
          const successCount = storeResults.filter(r => r.success).length;
          const errorCount = storeResults.filter(r => !r.success).length;

          // Update file status
          await supabase
            .from('amc_portfolio_files')
            .update({ 
              upload_status: errorCount === 0 ? 'processed' : 'error',
              error_message: errorCount > 0 ? `${errorCount} schemes failed to process` : null
            })
            .eq('id', file.id);

          results.push({ 
            file: file.file_name, 
            success: errorCount === 0, 
            portfolios: successCount,
            errors: errorCount 
          });

        } catch (error) {
          console.error(`Error processing file ${file.file_name}:`, error);
          
          // Update file status to error
          await supabase
            .from('amc_portfolio_files')
            .update({ 
              upload_status: 'error',
              error_message: error instanceof Error ? error.message : 'Processing failed'
            })
            .eq('id', file.id);

          results.push({ file: file.file_name, success: false, error: error.message });
        }
      }

      return results;
    } catch (error) {
      console.error('Error processing uploaded files:', error);
      throw error;
    }
  }

  // Get supported AMCs
  static getSupportedAMCs(): string[] {
    return AMCParserFactory.getAllSupportedAMCs();
  }
}
