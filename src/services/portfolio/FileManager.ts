
import { supabase } from '@/integrations/supabase/client';
import { AMCPortfolioFile } from './AMCParserFactory';

export class PortfolioFileManager {
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

  // Update file status
  static async updateFileStatus(
    fileId: string, 
    status: string, 
    errorMessage?: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('amc_portfolio_files')
        .update({ 
          upload_status: status,
          error_message: errorMessage || null
        })
        .eq('id', fileId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating file status:', error);
      throw error;
    }
  }

  // Get file by ID
  static async getFileById(fileId: string): Promise<AMCPortfolioFile | null> {
    try {
      const { data: file, error } = await supabase
        .from('amc_portfolio_files')
        .select('*')
        .eq('id', fileId)
        .single();

      if (error) throw error;
      return file;
    } catch (error) {
      console.error('Error fetching file:', error);
      return null;
    }
  }
}
