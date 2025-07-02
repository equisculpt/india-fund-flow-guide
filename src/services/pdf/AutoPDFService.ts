import { supabase } from '@/integrations/supabase/client';

export class AutoPDFService {
  private toast: any;

  constructor(toast: any) {
    this.toast = toast;
  }

  /**
   * Generate PDF automatically from statement data without opening browser
   */
  async generateStatementPDF(
    statementType: string,
    clientCode: string,
    additionalParams: Record<string, string> = {}
  ): Promise<void> {
    try {
      console.log('AutoPDFService: Starting automatic PDF generation');

      this.toast({
        title: "Generating PDF...",
        description: "Creating your statement automatically in the background.",
      });

      // Step 1: Get the statement HTML content
      const params = new URLSearchParams({
        type: statementType,
        client: clientCode,
        ...additionalParams
      });

      const baseUrl = window.location.origin;
      const statementUrl = `${baseUrl}/statement-preview?${params.toString()}`;
      
      console.log('Fetching statement HTML from:', statementUrl);

      // Fetch the HTML content
      const htmlResponse = await fetch(statementUrl);
      if (!htmlResponse.ok) {
        throw new Error('Failed to fetch statement HTML');
      }

      const htmlContent = await htmlResponse.text();

      // Step 2: Convert HTML to PDF using our edge function
      const { data, error } = await supabase.functions.invoke('html-to-pdf', {
        body: { 
          htmlContent,
          fileName: `SIPBrewery-${statementType}-${clientCode}-${new Date().toISOString().split('T')[0]}.pdf`
        }
      });

      if (error) {
        throw new Error(`PDF generation failed: ${error.message}`);
      }

      // Check if we got a fallback response (service not configured)
      if (data && typeof data === 'object' && data.fallback) {
        console.log('Professional PDF service not configured, opening preview');
        
        this.toast({
          title: "Opening Statement Preview",
          description: "Professional PDF service not configured. Use the Download PDF button on the preview page.",
        });

        // Open the statement preview as fallback
        window.open(statementUrl, '_blank');
        return;
      }

      // Step 3: Download the generated PDF
      if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `SIPBrewery-${statementType}-${clientCode}-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(url);

        this.toast({
          title: "PDF Downloaded!",
          description: "Your statement has been generated and downloaded automatically.",
        });

        console.log('AutoPDFService: PDF downloaded successfully');
      } else {
        throw new Error('Invalid PDF data received');
      }

    } catch (error) {
      console.error('AutoPDFService: Error:', error);
      
      this.toast({
        title: "Automatic PDF Failed",
        description: error instanceof Error ? error.message : "Unable to generate PDF automatically.",
        variant: "destructive"
      });

      // Fallback: Open preview
      const params = new URLSearchParams({
        type: statementType,
        client: clientCode,
        ...additionalParams
      });

      const baseUrl = window.location.origin;
      const statementUrl = `${baseUrl}/statement-preview?${params.toString()}`;
      
      this.toast({
        title: "Opening Preview",
        description: "Use the Download PDF button on the preview page.",
      });
      
      window.open(statementUrl, '_blank');
    }
  }
}