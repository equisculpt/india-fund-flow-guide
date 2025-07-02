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
        title: "Generating PDF...",
        description: "Creating your professional report using PDF Shift. This may take a moment.",
      });

      // Call the PDF Shift edge function
      const { data, error } = await supabase.functions.invoke('generate-pdf-with-pdfshift', {
        body: {
          reportType: config.reportType,
          clientCode: config.clientCode,
          category: config.category,
          reportName: config.reportName,
          format: config.format || 'pdf'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (error) {
        console.error('PDF Shift function error:', error);
        throw new Error(error.message || 'Failed to generate PDF');
      }

      // The response should be binary PDF data
      if (data && data instanceof ArrayBuffer) {
        // Create blob and download
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        // Generate filename
        const timestamp = new Date().toISOString().slice(0, 10);
        const categoryName = config.category.charAt(0).toUpperCase() + config.category.slice(1);
        const filename = `${categoryName}_Statement_${config.clientCode}_${timestamp}.pdf`;
        
        // Create download link
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
          description: `Your ${categoryName.toLowerCase()} statement has been downloaded.`,
        });
      } else {
        console.error('Invalid PDF data received:', data);
        throw new Error('Invalid PDF data received from server');
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