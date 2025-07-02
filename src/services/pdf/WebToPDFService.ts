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
        description: "Creating your statement using Puppeteer. This may take a few moments.",
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

      // Check if we got an error response instead of PDF data
      if (data && typeof data === 'object' && data.error) {
        // This means the backend couldn't generate PDF automatically
        console.log('Backend PDF generation not available, opening preview for manual print');
        
        this.toast({
          title: "Opening Statement Preview",
          description: "Please use Ctrl+P (Cmd+P) and 'Save as PDF' to download your statement.",
          variant: "default"
        });

        // Open the statement preview in a new tab for manual print-to-PDF
        window.open(statementUrl, '_blank');
        return;
      }

      // If we get here, we should have PDF binary data
      if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
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
          variant: "default"
        });

        console.log('WebToPDFService: PDF downloaded successfully');
      } else {
        // Fallback to opening preview
        this.toast({
          title: "Opening Preview",
          description: "PDF generation not available. Opening preview for manual download.",
        });
        window.open(statementUrl, '_blank');
      }

    } catch (error) {
      console.error('WebToPDFService: Error generating PDF:', error);
      
      this.toast({
        title: "PDF Generation Failed",
        description: error instanceof Error ? error.message : "Unable to generate PDF. Opening preview instead.",
        variant: "destructive"
      });

      // Fallback: Open preview for manual print-to-PDF
      this.toast({
        title: "Alternative Option",
        description: "Opening statement preview. Use Ctrl+P (Cmd+P) → Save as PDF",
      });
      
      // Get the base URL and create the statement URL
      const baseUrl = window.location.origin;
      const previewUrl = statementUrl.startsWith('http') ? statementUrl : `${baseUrl}${statementUrl}`;
      window.open(previewUrl, '_blank');
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