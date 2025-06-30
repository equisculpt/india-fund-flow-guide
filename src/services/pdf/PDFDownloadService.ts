
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
        description: "Please wait while we create your statement with detailed insights.",
      }).id;

      // Step 1: Fetch statement data with enhanced logging
      const mockClientCode = 'SB123456';
      console.log('📊 Step 1: Fetching statement data for client:', mockClientCode);
      
      const statementData = await statementDataService.getStatementData(mockClientCode, statementType);
      
      console.log('✅ Step 1 Complete: Statement data fetched successfully:', {
        holdingsCount: statementData.holdings?.length || 0,
        totalValue: statementData.portfolio?.currentValue || 0,
        userName: statementData.userInfo?.name || 'Unknown',
        hasAllRequiredData: !!(statementData.userInfo && statementData.portfolio && statementData.holdings),
        dataStructure: {
          userInfo: !!statementData.userInfo,
          portfolio: !!statementData.portfolio,
          holdings: !!statementData.holdings,
          transactions: !!statementData.transactions
        }
      });

      // Step 2: Additional data validation before PDF generation
      if (!statementData.userInfo || !statementData.portfolio) {
        throw new Error('Statement data is incomplete - missing user info or portfolio data');
      }

      // Step 3: Generate and download PDF with enhanced error handling
      console.log('🔄 Step 2: Starting PDF generation and download...');
      await pdfStatementGenerator.downloadPDF(statementType, statementData);

      // Step 4: Show success toast
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
      } else if (error.message.includes('URL')) {
        userMessage += ' Browser download issue - please try refreshing the page.';
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

  // New method for testing PDF generation without download
  async testPDFGeneration(statementType: string): Promise<boolean> {
    try {
      console.log('🧪 Testing PDF generation for:', statementType);
      
      const mockClientCode = 'TEST123';
      const statementData = await statementDataService.getStatementData(mockClientCode, statementType);
      const pdfBlob = await pdfStatementGenerator.generatePDF(statementType, statementData);
      
      console.log('✅ PDF generation test successful:', {
        blobSize: pdfBlob.size,
        blobType: pdfBlob.type,
        isValidBlob: pdfBlob instanceof Blob
      });
      
      return true;
    } catch (error) {
      console.error('❌ PDF generation test failed:', error);
      return false;
    }
  }
}
