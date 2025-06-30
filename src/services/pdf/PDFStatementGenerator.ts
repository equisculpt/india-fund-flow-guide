
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
