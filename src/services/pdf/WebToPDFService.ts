import { useToast } from '@/hooks/use-toast';
import { PDFDownloadService } from './PDFDownloadService';

export class WebToPDFService {
  private toast: any;
  private pdfDownloadService: PDFDownloadService;

  constructor(toast: any) {
    this.toast = toast;
    this.pdfDownloadService = new PDFDownloadService(toast);
  }

  /**
   * Generate PDF from a web page URL using Puppeteer
   */
  async generatePDFFromURL(
    statementUrl: string, 
    fileName: string = 'statement.pdf'
  ): Promise<void> {
    try {
      console.log('WebToPDFService: Using direct PDF generation instead of web URL');

      this.toast({
        title: "Generating PDF...",
        description: "Creating your statement using our PDF engine.",
      });

      // Extract statement type and client code from URL parameters
      const url = new URL(statementUrl);
      const statementType = url.searchParams.get('type') || 'comprehensive';
      
      // Use our existing PDF generation system directly
      await this.pdfDownloadService.downloadPDFStatement(statementType);

      console.log('WebToPDFService: PDF downloaded successfully via direct generation');

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
        description: "Opening statement preview. Use the Download PDF button on the preview page.",
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