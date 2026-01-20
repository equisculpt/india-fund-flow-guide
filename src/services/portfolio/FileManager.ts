
import { AMCPortfolioFile } from './AMCParserFactory';

// Mock file storage for prototype
const mockUploadedFiles: AMCPortfolioFile[] = [
  {
    id: 'file-1',
    file_name: 'SBI_Portfolio_Dec2024.pdf',
    amc_name: 'SBI Mutual Fund',
    file_type: 'pdf',
    upload_status: 'processed',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    portfolio_date: '2024-12-31',
    file_url: '/uploads/sbi_portfolio.pdf',
    error_message: null
  },
  {
    id: 'file-2',
    file_name: 'HDFC_Holdings_Dec2024.xlsx',
    amc_name: 'HDFC Mutual Fund',
    file_type: 'xlsx',
    upload_status: 'uploaded',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    portfolio_date: '2024-12-31',
    file_url: '/uploads/hdfc_holdings.xlsx',
    error_message: null
  }
];

export class PortfolioFileManager {
  // Get uploaded files for processing
  static async getUploadedFiles(status = 'uploaded'): Promise<AMCPortfolioFile[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (status === 'all') {
        return mockUploadedFiles;
      }
      return mockUploadedFiles.filter(f => f.upload_status === status);
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
      const file = mockUploadedFiles.find(f => f.id === fileId);
      if (file) {
        file.upload_status = status;
        file.error_message = errorMessage || null;
      }
      console.log(`File ${fileId} status updated to ${status}`);
    } catch (error) {
      console.error('Error updating file status:', error);
      throw error;
    }
  }

  // Get file by ID
  static async getFileById(fileId: string): Promise<AMCPortfolioFile | null> {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      return mockUploadedFiles.find(f => f.id === fileId) || null;
    } catch (error) {
      console.error('Error fetching file:', error);
      return null;
    }
  }
}
