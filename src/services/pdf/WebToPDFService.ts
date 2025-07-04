import { useToast } from '@/hooks/use-toast';
import { DirectPDFService } from './DirectPDFService';
import { SharedPDFTemplate } from './SharedPDFTemplate';

export class WebToPDFService {
  private toast: any;
  private directPDFService: DirectPDFService;

  constructor(toast: any) {
    this.toast = toast;
    this.directPDFService = new DirectPDFService(toast);
  }

  /**
   * Generate PDF from a web page URL - opens the beautiful statement preview
   */
  async generatePDFFromURL(
    statementUrl: string, 
    fileName: string = 'statement.pdf'
  ): Promise<void> {
    try {
      console.log('WebToPDFService: Opening beautiful statement preview at:', statementUrl);

      this.toast({
        title: "Opening Statement Preview",
        description: "Your beautiful statement is ready! Use the Download PDF button on the preview page.",
      });

      // Open the beautiful statement preview in a new tab
      // This shows the new web-based design with download button
      window.open(statementUrl, '_blank');

      console.log('WebToPDFService: Statement preview opened successfully');

    } catch (error) {
      console.error('WebToPDFService: Error opening statement preview:', error);
      
      this.toast({
        title: "Error Opening Preview",
        description: error instanceof Error ? error.message : "Unable to open statement preview.",
        variant: "destructive"
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
    console.log('WebToPDFService: Using direct PDF capture and download');
    
    // Use the new direct PDF service that captures and downloads automatically
    await this.directPDFService.generateDirectPDF(statementType, clientCode, additionalParams);
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