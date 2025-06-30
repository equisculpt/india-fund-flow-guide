
import { useToast } from '@/hooks/use-toast';
import { pdfStatementGenerator } from './PDFStatementGenerator';
import { statementDataService } from '../statement/statementDataService';
import type { StatementData } from '../statement/types';

export class PDFDownloadService {
  constructor(private toast: ReturnType<typeof useToast>['toast']) {}

  async downloadPDFStatement(statementType: string, params?: any): Promise<void> {
    let loadingToastId: string | undefined;
    
    try {
      console.log('PDFDownloadService: Starting PDF download for:', statementType);
      
      // Show loading toast
      loadingToastId = this.toast({
        title: "Generating PDF Statement... 📄",
        description: "Please wait while we create your beautifully designed statement.",
      }).id;

      // Fetch statement data
      const mockClientCode = 'SB123456';
      console.log('Fetching statement data for client:', mockClientCode);
      
      const statementData = await statementDataService.getStatementData(mockClientCode, statementType);
      
      console.log('Statement data fetched successfully:', {
        holdingsCount: statementData.holdings?.length || 0,
        totalValue: statementData.portfolio?.currentValue || 0
      });

      // Generate and download PDF
      console.log('Starting PDF generation and download...');
      await pdfStatementGenerator.downloadPDF(statementType, statementData);

      // Show success toast
      this.toast({
        title: "PDF Downloaded Successfully! 🎉",
        description: `Your ${statementType} statement has been downloaded to your device.`,
      });

      console.log('PDF statement download completed successfully');
      
    } catch (error) {
      console.error('PDF download service error:', {
        error: error.message,
        stack: error.stack,
        statementType,
        params
      });
      
      this.toast({
        title: "PDF Generation Failed ❌",
        description: `Unable to generate ${statementType} statement. Error: ${error.message}`,
        variant: "destructive"
      });
      
      throw error;
    }
  }
}
