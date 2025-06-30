
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
    console.log('Creating PDF document with options:', { 
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
    
    // Generate the PDF
    const pdfBlob = await pdf(document).toBlob();
    
    console.log('PDF blob generated successfully, size:', pdfBlob.size, 'bytes');
    
    return pdfBlob;
  } catch (error) {
    console.error('Detailed error generating PDF statement:', {
      error: error.message,
      stack: error.stack,
      statementType,
      dataKeys: Object.keys(statementData)
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
      console.log('PDFStatementGeneratorService: downloadPDF started for', { 
        statementType,
        clientCode: statementData.userInfo?.clientCode
      });
      
      const pdfBlob = await this.generatePDF(statementType, statementData);
      
      console.log('PDF blob generated, creating download link...', {
        blobSize: pdfBlob.size,
        blobType: pdfBlob.type
      });
      
      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${statementType}-statement-${new Date().getTime()}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      console.log('PDF download completed successfully');
    } catch (error) {
      console.error('Error downloading PDF:', {
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
