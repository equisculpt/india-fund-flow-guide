// DirectPDFService - Now using standardized beautiful PDF generation
import { StandardPDFGenerator, StandardPDFData } from './StandardPDFGenerator';

export class DirectPDFService {
  private toast: any;

  constructor(toast: any) {
    this.toast = toast;
  }

  /**
   * Generate PDF using the standardized beautiful process
   */
  async generateDirectPDF(
    statementType: string,
    clientCode: string,
    additionalParams: Record<string, any> = {}
  ): Promise<void> {
    try {
      console.log('DirectPDFService: Using standardized beautiful PDF generation');
      
      this.toast({
        title: "Generating Beautiful PDF...",
        description: "Creating your statement with consistent styling and charts.",
      });

      // Prepare standardized data
      const pdfData: StandardPDFData = {
        name: additionalParams.userName || 'Test User',
        clientCode: clientCode,
        totalInvested: additionalParams.totalInvested || 1250000,
        currentValue: additionalParams.currentValue || 1675000,
        returnsPercentage: additionalParams.returnsPercentage || 34,
        xirr: additionalParams.xirr || 22.5,
        statementType: additionalParams.statementType || statementType,
        category: additionalParams.category,
        reportTitle: additionalParams.reportTitle,
        months: additionalParams.months || ['Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'],
        values: additionalParams.values || [250000, 375000, 520000, 680000, 825000, 950000, 1025000, 1150000, 1280000, 1420000, 1550000, 1675000],
        holdings: additionalParams.holdings || this.getMockHoldings(),
        taxData: additionalParams.taxData,
        sipData: additionalParams.sipData,
        transactionData: additionalParams.transactionData,
      };

      // Use the standardized PDF generator
      await StandardPDFGenerator.generatePDF(pdfData);

      this.toast({
        title: "PDF Generated Successfully!",
        description: "Your beautiful portfolio statement has been downloaded with consistent styling.",
      });

    } catch (error) {
      console.error('DirectPDFService: Error:', error);
      
      this.toast({
        title: "PDF Generation Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  }

  /**
   * Capture current page as PDF (fallback method)
   */
  async captureCurrentPageAsPDF(): Promise<void> {
    try {
      console.log('DirectPDFService: Capturing current page as PDF');
      
      this.toast({
        title: "Opening Print Dialog",
        description: "Use 'Save as PDF' in the print dialog for best quality.",
      });

      // Simple browser print - user can save as PDF
      window.print();

      setTimeout(() => {
        this.toast({
          title: "PDF Ready!",
          description: "Use the print dialog to save your statement as PDF.",
        });
      }, 1000);

    } catch (error) {
      console.error('DirectPDFService: Print error:', error);
      
      this.toast({
        title: "Print Error",
        description: "Unable to open print dialog. Please try again.",
        variant: "destructive"
      });
    }
  }

  /**
   * Mock holdings data for demonstration
   */
  private getMockHoldings() {
    return [
      {
        schemeName: 'HDFC Top 100 Fund - Direct Growth',
        amcName: 'HDFC Mutual Fund',
        category: 'Large Cap',
        units: 1234.56,
        currentNav: 856.32,
        marketValue: 485673,
        investedAmount: 350000,
        pnlPercentage: 38.8,
        investmentType: 'SIP' as const
      },
      {
        schemeName: 'Axis Small Cap Fund - Direct Growth',
        amcName: 'Axis Mutual Fund',
        category: 'Small Cap',
        units: 876.23,
        currentNav: 612.45,
        marketValue: 336789,
        investedAmount: 250000,
        pnlPercentage: 34.7,
        investmentType: 'SIP' as const
      },
      {
        schemeName: 'Mirae Asset Large Cap Fund - Direct',
        amcName: 'Mirae Asset',
        category: 'Large Cap',
        units: 2156.78,
        currentNav: 298.67,
        marketValue: 644234,
        investedAmount: 500000,
        pnlPercentage: 28.8,
        investmentType: 'Lumpsum' as const
      },
      {
        schemeName: 'SBI Blue Chip Fund - Direct Growth',
        amcName: 'SBI Mutual Fund',
        category: 'Large Cap',
        units: 934.12,
        currentNav: 445.89,
        marketValue: 416567,
        investedAmount: 300000,
        pnlPercentage: 38.9,
        investmentType: 'SIP' as const
      }
    ];
  }
}