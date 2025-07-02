import { supabase } from '@/integrations/supabase/client';

export interface PDFShiftConfig {
  reportType: string;
  clientCode: string;
  category: 'tax' | 'sip' | 'portfolio' | 'transaction' | 'performance';
  reportName: string;
  format?: 'pdf';
}

export class PDFShiftService {
  private toast: any;

  constructor(toast: any) {
    this.toast = toast;
  }

  async generatePDF(config: PDFShiftConfig): Promise<void> {
    try {
      console.log('Generating PDF with PDF Shift:', config);
      
      this.toast({
        title: "Generating Professional PDF...",
        description: "Creating your report using PDF Shift API. This may take a moment.",
      });

      // Call the PDF Shift edge function
      const response = await supabase.functions.invoke('generate-pdf-with-pdfshift', {
        body: {
          reportType: config.reportType,
          clientCode: config.clientCode,
          category: config.category,
          reportName: config.reportName,
          format: config.format || 'pdf'
        }
      });

      console.log('PDF Shift response:', response);

      if (response.error) {
        console.error('PDF Shift function error:', response.error);
        throw new Error(response.error.message || 'Failed to generate PDF');
      }

      // The response should be binary PDF data
      if (response.data) {
        // Handle the response based on its type
        let pdfBlob;
        
        if (response.data instanceof ArrayBuffer) {
          pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        } else if (response.data instanceof Uint8Array) {
          pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        } else {
          // Assume it's already blob-like data
          pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        }
        
        // Generate filename
        const timestamp = new Date().toISOString().slice(0, 10);
        const categoryName = config.category.charAt(0).toUpperCase() + config.category.slice(1);
        const filename = `${categoryName}_Statement_${config.clientCode}_${timestamp}.pdf`;
        
        // Create download link
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Cleanup
        URL.revokeObjectURL(url);

        this.toast({
          title: "PDF Generated Successfully!",
          description: `Your professional ${categoryName.toLowerCase()} statement has been downloaded.`,
        });
      } else {
        console.error('No data received from PDF Shift');
        throw new Error('No PDF data received from server');
      }

    } catch (error) {
      console.error('PDF Shift generation failed:', error);
      
      this.toast({
        title: "PDF Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate PDF with PDF Shift. Please try again.",
        variant: "destructive"
      });
      
      throw error;
    }
  }

  async generateTaxPDF(reportName: string, clientCode?: string): Promise<void> {
    await this.generatePDF({
      reportType: `tax-${reportName}`,
      clientCode: clientCode || `TAX${Date.now().toString().slice(-6)}`,
      category: 'tax',
      reportName
    });
  }

  async generateSIPPDF(reportName: string, clientCode?: string): Promise<void> {
    await this.generatePDF({
      reportType: `sip-${reportName}`,
      clientCode: clientCode || `SIP${Date.now().toString().slice(-6)}`,
      category: 'sip',
      reportName
    });
  }

  async generatePortfolioPDF(reportName: string, clientCode?: string): Promise<void> {
    await this.generatePDF({
      reportType: `portfolio-${reportName}`,
      clientCode: clientCode || `PFL${Date.now().toString().slice(-6)}`,
      category: 'portfolio',
      reportName
    });
  }

  async generateTransactionPDF(reportName: string, clientCode?: string): Promise<void> {
    await this.generatePDF({
      reportType: `transaction-${reportName}`,
      clientCode: clientCode || `TXN${Date.now().toString().slice(-6)}`,
      category: 'transaction',
      reportName
    });
  }

  async generatePerformancePDF(reportName: string, clientCode?: string): Promise<void> {
    await this.generatePDF({
      reportType: `performance-${reportName}`,
      clientCode: clientCode || `PRF${Date.now().toString().slice(-6)}`,
      category: 'performance',
      reportName
    });
  }
}