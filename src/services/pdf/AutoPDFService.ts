import { DirectPDFService } from './DirectPDFService';

export class AutoPDFService {
  private toast: any;
  private directPDFService: DirectPDFService;

  constructor(toast: any) {
    this.toast = toast;
    this.directPDFService = new DirectPDFService(toast);
  }

  /**
   * Generate PDF using standardized beautiful process
   */
  async generateStatementPDF(
    statementType: string,
    clientCode: string,
    additionalParams: Record<string, string> = {}
  ): Promise<void> {
    try {
      console.log('AutoPDFService: Using standardized beautiful PDF generation');

      // Use the standardized PDF generation process
      await this.directPDFService.generateDirectPDF(statementType, clientCode, additionalParams);

      console.log('AutoPDFService: Standardized PDF generation completed successfully');

    } catch (error) {
      console.error('AutoPDFService: Error:', error);
      throw error;
    }
  }
}