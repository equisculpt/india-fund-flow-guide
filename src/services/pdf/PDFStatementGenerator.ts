
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
    // Create the PDF document using the factory function
    const document = createPDFDocument({
      statementType,
      statementData,
      generatedAt,
    });

    // Generate the PDF
    const pdfBlob = await pdf(document).toBlob();
    
    return pdfBlob;
  } catch (error) {
    console.error('Error generating PDF statement:', error);
    throw new Error('Failed to generate PDF statement');
  }
};

// Create a service class for PDF generation
export class PDFStatementGeneratorService {
  async generatePDF(statementType: string, statementData: StatementData): Promise<Blob> {
    return generateStatementPDF({
      statementType,
      statementData,
      generatedAt: new Date()
    });
  }

  async downloadPDF(statementType: string, statementData: StatementData): Promise<void> {
    try {
      const pdfBlob = await this.generatePDF(statementType, statementData);
      
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
    } catch (error) {
      console.error('Error downloading PDF:', error);
      throw error;
    }
  }
}

// Export the service instance
export const pdfStatementGenerator = new PDFStatementGeneratorService();
