
import { useToast } from '@/hooks/use-toast';
import { pdfStatementGenerator } from './PDFStatementGenerator';
import { statementDataService } from '../statement/statementDataService';
import type { StatementData } from '../statement/types';

export class PDFDownloadService {
  constructor(private toast: ReturnType<typeof useToast>['toast']) {}

  async downloadPDFStatement(statementType: string, params?: any): Promise<void> {
    try {
      console.log('Starting PDF download for:', statementType);
      
      this.toast({
        title: "Generating Beautiful PDF Statement... 📄",
        description: "Creating your professionally designed statement with SIP Brewery branding.",
      });

      // Fetch statement data
      const mockClientCode = 'SB123456';
      const statementData = await statementDataService.getStatementData(mockClientCode, statementType);
      
      console.log('Statement data fetched for PDF generation');

      // Generate and download PDF
      await pdfStatementGenerator.downloadPDF(statementType, statementData);

      this.toast({
        title: "PDF Downloaded Successfully! 🎉",
        description: "Your beautifully designed statement has been downloaded to your device.",
      });

      console.log('PDF statement downloaded successfully');
      
    } catch (error) {
      console.error('PDF download error:', error);
      this.toast({
        title: "PDF Generation Failed",
        description: "Unable to generate PDF statement. Please try again or contact support.",
        variant: "destructive"
      });
    }
  }
}
