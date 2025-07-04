
import { useToast } from '@/hooks/use-toast';
import { DirectPDFService } from './DirectPDFService';
import { StandardPDFGenerator, StandardPDFData } from './StandardPDFGenerator';

export class PDFDownloadService {
  private directPDFService: DirectPDFService;

  constructor(private toast: ReturnType<typeof useToast>['toast']) {
    this.directPDFService = new DirectPDFService(toast);
  }

  async downloadPDFStatement(statementType: string, params?: any): Promise<void> {
    try {
      console.log('PDFDownloadService: Using standardized beautiful PDF generation for', statementType);
      
      // Use DirectPDFService which now uses StandardPDFGenerator
      const mockClientCode = params?.clientCode || 'SB123456';
      await this.directPDFService.generateDirectPDF(statementType, mockClientCode, params || {});
      
      console.log('PDF statement generation completed successfully');
      
    } catch (error) {
      console.error('PDF download service error:', error);
      
      this.toast({
        title: "PDF Generation Failed",
        description: error instanceof Error ? error.message : "Unable to generate statement. Please try again.",
        variant: "destructive"
      });
      
      throw error;
    }
  }

  // Test method using browser print-to-PDF
  async testPDFGeneration(statementType: string): Promise<boolean> {
    try {
      console.log('Testing browser print-to-PDF generation for:', statementType);
      
      const mockClientCode = 'TEST123';
      await this.directPDFService.generateDirectPDF(statementType, mockClientCode, {});
      
      console.log('Browser print-to-PDF test successful');
      return true;
    } catch (error) {
      console.error('Browser print-to-PDF test failed:', error);
      return false;
    }
  }
}
