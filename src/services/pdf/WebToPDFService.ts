import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export class WebToPDFService {
  private toast: any;

  constructor(toast: any) {
    this.toast = toast;
  }

  /**
   * Generate PDF from a web page URL using Puppeteer
   */
  async generatePDFFromURL(
    statementUrl: string, 
    fileName: string = 'statement.pdf'
  ): Promise<void> {
    try {
      console.log('WebToPDFService: Starting PDF generation from URL:', statementUrl);

      this.toast({
        title: "Generating PDF...",
        description: "Creating your statement. This may take a few moments.",
      });

      const { data, error } = await supabase.functions.invoke('generate-pdf-statement', {
        body: { 
          statementUrl,
          fileName 
        }
      });

      if (error) {
        throw new Error(`PDF generation failed: ${error.message}`);
      }

      // If we get a JSON response instead of PDF data, it means there was an error
      if (data && typeof data === 'object' && data.error) {
        throw new Error(data.error);
      }

      // Create blob and download
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);

      this.toast({
        title: "PDF Downloaded!",
        description: "Your statement has been generated and downloaded successfully.",
        variant: "success"
      });

      console.log('WebToPDFService: PDF downloaded successfully');

    } catch (error) {
      console.error('WebToPDFService: Error generating PDF:', error);
      
      this.toast({
        title: "PDF Generation Failed",
        description: error instanceof Error ? error.message : "Unable to generate PDF. Please try again.",
        variant: "destructive"
      });

      // Fallback suggestion
      this.toast({
        title: "Alternative Option",
        description: "You can use your browser's Print → Save as PDF feature as a backup.",
        variant: "info"
      });
    }
  }

  /**
   * Generate statement PDF with query parameters
   */
  async generateStatementPDF(
    statementType: string,
    clientCode: string,
    additionalParams: Record<string, string> = {}
  ): Promise<void> {
    const params = new URLSearchParams({
      type: statementType,
      client: clientCode,
      ...additionalParams
    });

    const baseUrl = window.location.origin;
    const statementUrl = `${baseUrl}/statement-preview?${params.toString()}`;
    const fileName = `SIPBrewery-${statementType}-${clientCode}-${new Date().toISOString().split('T')[0]}.pdf`;

    await this.generatePDFFromURL(statementUrl, fileName);
  }

  /**
   * Open statement preview in new tab (for debugging/preview)
   */
  openStatementPreview(
    statementType: string,
    clientCode: string,
    additionalParams: Record<string, string> = {}
  ): void {
    const params = new URLSearchParams({
      type: statementType,
      client: clientCode,
      ...additionalParams
    });

    const baseUrl = window.location.origin;
    const statementUrl = `${baseUrl}/statement-preview?${params.toString()}`;
    
    window.open(statementUrl, '_blank');
  }
}