import { PDFDownloadService } from './PDFDownloadService';

export class AutoPDFService {
  private toast: any;
  private pdfDownloadService: PDFDownloadService;

  constructor(toast: any) {
    this.toast = toast;
    this.pdfDownloadService = new PDFDownloadService(toast);
  }

  /**
   * Generate PDF automatically using our reliable existing system
   */
  async generateStatementPDF(
    statementType: string,
    clientCode: string,
    additionalParams: Record<string, string> = {}
  ): Promise<void> {
    try {
      console.log('AutoPDFService: Using reliable existing PDF system for automatic download');

      this.toast({
        title: "Generating PDF...",
        description: "Creating your statement automatically using our proven PDF engine.",
      });

      // Use our existing reliable PDF generation system
      // This system works perfectly and generates high-quality PDFs
      await this.pdfDownloadService.downloadPDFStatement(statementType);

      console.log('AutoPDFService: PDF generated and downloaded successfully');

    } catch (error) {
      console.error('AutoPDFService: Error:', error);
      
      this.toast({
        title: "Automatic PDF Failed",
        description: error instanceof Error ? error.message : "Unable to generate PDF automatically.",
        variant: "destructive"
      });

      // Fallback: Open beautiful preview with download button
      const params = new URLSearchParams({
        type: statementType,
        client: clientCode,
        ...additionalParams
      });

      const baseUrl = window.location.origin;
      const statementUrl = `${baseUrl}/statement-preview?${params.toString()}`;
      
      this.toast({
        title: "Opening Beautiful Preview",
        description: "Use the Download PDF button on the preview page for the new design.",
      });
      
      window.open(statementUrl, '_blank');
    }
  }
}