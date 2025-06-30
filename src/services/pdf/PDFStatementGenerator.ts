
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { StatementData } from '../statement/types';
import React from 'react';

export class PDFStatementGenerator {
  async generatePDF(statementType: string, statementData: StatementData): Promise<Blob> {
    try {
      console.log('Generating PDF for statement type:', statementType);
      
      // Dynamic import to avoid SSR issues
      const { createPDFDocument } = await import('./PDFStatementDocument');
      
      // Create the PDF document directly as a Document element
      const pdfDocument = createPDFDocument({
        statementType,
        statementData,
        generatedAt: new Date()
      });
      
      const blob = await pdf(pdfDocument).toBlob();
      console.log('PDF generated successfully, size:', blob.size);
      
      return blob;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error(`Failed to generate PDF: ${error.message}`);
    }
  }

  async downloadPDF(statementType: string, statementData: StatementData): Promise<void> {
    try {
      const blob = await this.generatePDF(statementType, statementData);
      const filename = this.generateFilename(statementType);
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
      console.log('PDF downloaded successfully:', filename);
    } catch (error) {
      console.error('PDF download error:', error);
      throw error;
    }
  }

  private generateFilename(statementType: string): string {
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
    const cleanType = statementType.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
    return `SIP_Brewery_${cleanType}_${timestamp}.pdf`;
  }
}

export const pdfStatementGenerator = new PDFStatementGenerator();
