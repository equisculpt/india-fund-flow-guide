
import { pdf } from '@react-pdf/renderer';
import { StatementData } from '../statement/types';
import { createPDFDocument } from './PDFStatementDocument';

export interface GenerateStatementPDFOptions {
  statementType: string;
  statementData: StatementData;
  generatedAt?: Date;
}

export const generateStatementPDF = async (options: GenerateStatementPDFOptions) => {
  const {
    statementType,
    statementData,
    generatedAt = new Date()
  } = options;

  try {
    console.log('Starting PDF generation with options:', { 
      statementType, 
      generatedAt,
      holdingsCount: statementData.holdings?.length || 0,
      portfolioValue: statementData.portfolio?.currentValue || 0
    });
    
    // Create the PDF document using the factory function
    const document = createPDFDocument({
      statementType,
      statementData,
      generatedAt,
    });

    console.log('PDF document created, generating blob...');
    
    // Generate the PDF with explicit error handling
    const pdfBlob = await pdf(document).toBlob();
    
    console.log('PDF blob generated successfully:', {
      size: pdfBlob.size,
      type: pdfBlob.type
    });
    
    // Validate the blob
    if (!pdfBlob || pdfBlob.size === 0) {
      throw new Error('Generated PDF blob is empty or invalid');
    }
    
    return pdfBlob;
  } catch (error) {
    console.error('Detailed PDF generation error:', {
      error: error.message,
      stack: error.stack,
      statementType,
      dataStructure: {
        hasUserInfo: !!statementData.userInfo,
        hasPortfolio: !!statementData.portfolio,
        holdingsCount: statementData.holdings?.length || 0,
        hasTransactions: !!statementData.transactions
      }
    });
    throw new Error(`Failed to generate PDF statement: ${error.message}`);
  }
};

// Create a service class for PDF generation
export class PDFStatementGeneratorService {
  async generatePDF(statementType: string, statementData: StatementData): Promise<Blob> {
    console.log('PDFStatementGeneratorService: generatePDF called with', { 
      statementType,
      userInfo: statementData.userInfo?.name || 'Unknown'
    });
    return generateStatementPDF({
      statementType,
      statementData,
      generatedAt: new Date()
    });
  }

  async downloadPDF(statementType: string, statementData: StatementData): Promise<void> {
    try {
      console.log('PDFStatementGeneratorService: Starting download process for', { 
        statementType,
        clientCode: statementData.userInfo?.clientCode
      });
      
      const pdfBlob = await this.generatePDF(statementType, statementData);
      
      console.log('PDF blob ready for download:', {
        blobSize: pdfBlob.size,
        blobType: pdfBlob.type
      });
      
      // Create a more robust download mechanism
      const url = URL.createObjectURL(pdfBlob);
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `SIPBrewery-${statementType}-${timestamp}.pdf`;
      
      // Create and configure download link
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      // Add to DOM, click, and clean up
      document.body.appendChild(link);
      
      console.log('Triggering download for file:', filename);
      link.click();
      
      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log('Download cleanup completed');
      }, 100);
      
      console.log('PDF download process completed successfully');
    } catch (error) {
      console.error('Error in PDF download process:', {
        error: error.message,
        stack: error.stack,
        statementType
      });
      throw error;
    }
  }
}

// Export the service instance
export const pdfStatementGenerator = new PDFStatementGeneratorService();
