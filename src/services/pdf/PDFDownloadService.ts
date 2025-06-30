
import { useToast } from '@/hooks/use-toast';
import { pdfStatementGenerator } from './PDFStatementGenerator';
import { statementDataService } from '../statement/statementDataService';
import type { StatementData } from '../statement/types';

export class PDFDownloadService {
  constructor(private toast: ReturnType<typeof useToast>['toast']) {}

  async downloadPDFStatement(statementType: string, params?: any): Promise<void> {
    let loadingToastId: string | undefined;
    
    try {
      console.log('🚀 PDFDownloadService: Starting PDF download process', {
        statementType,
        params,
        timestamp: new Date().toISOString()
      });
      
      // Show enhanced loading toast
      loadingToastId = this.toast({
        title: "Generating PDF Statement... 📄",
        description: "Please wait while we create your beautifully designed statement with AI insights.",
      }).id;

      // Fetch statement data with enhanced logging
      const mockClientCode = 'SB123456';
      console.log('📊 Fetching statement data for client:', mockClientCode);
      
      const statementData = await statementDataService.getStatementData(mockClientCode, statementType);
      
      console.log('✅ Statement data fetched successfully:', {
        holdingsCount: statementData.holdings?.length || 0,
        totalValue: statementData.portfolio?.currentValue || 0,
        userName: statementData.userInfo?.name || 'Unknown',
        hasAllRequiredData: !!(statementData.userInfo && statementData.portfolio && statementData.holdings)
      });

      // Additional data validation before PDF generation
      if (!statementData.userInfo || !statementData.portfolio) {
        throw new Error('Statement data is incomplete - missing user info or portfolio data');
      }

      // Generate and download PDF with enhanced error handling
      console.log('🔄 Starting PDF generation and download...');
      await pdfStatementGenerator.downloadPDF(statementType, statementData);

      // Show success toast with more details
      this.toast({
        title: "PDF Downloaded Successfully! 🎉",
        description: `Your ${statementType} statement has been downloaded. Check your Downloads folder.`,
      });

      console.log('🎊 PDF statement download completed successfully');
      
    } catch (error) {
      console.error('💥 PDF download service error:', {
        error: error.message,
        stack: error.stack,
        statementType,
        params,
        timestamp: new Date().toISOString()
      });
      
      // Provide more specific error messages to users
      let userMessage = `Unable to generate ${statementType} statement.`;
      
      if (error.message.includes('blob')) {
        userMessage += ' PDF generation failed - please try again.';
      } else if (error.message.includes('download')) {
        userMessage += ' PDF was generated but download failed - please check your browser settings.';
      } else if (error.message.includes('data')) {
        userMessage += ' Required data is missing - please contact support.';
      } else {
        userMessage += ` Error: ${error.message}`;
      }
      
      this.toast({
        title: "PDF Generation Failed ❌",
        description: userMessage,
        variant: "destructive"
      });
      
      throw error;
    }
  }
}
