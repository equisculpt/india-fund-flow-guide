
// PDFShiftService - Mock implementation for prototype
import { StandardPDFGenerator, StandardPDFData } from './StandardPDFGenerator';

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
      console.log('Generating PDF with StandardPDFGenerator (prototype mode):', config);
      
      this.toast({
        title: "Generating Professional PDF...",
        description: "Creating your report. This may take a moment.",
      });

      // Use StandardPDFGenerator for prototype instead of Supabase edge function
      const pdfData: StandardPDFData = {
        name: 'Prototype User',
        clientCode: config.clientCode,
        totalInvested: 1250000,
        currentValue: 1675000,
        returnsPercentage: 34,
        xirr: 22.5,
        statementType: config.reportName,
        category: config.category,
        reportTitle: config.reportName,
        months: ['Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'],
        values: [250000, 375000, 520000, 680000, 825000, 950000, 1025000, 1150000, 1280000, 1420000, 1550000, 1675000],
        holdings: this.getMockHoldings(),
      };

      await StandardPDFGenerator.generatePDF(pdfData);

      const categoryName = config.category.charAt(0).toUpperCase() + config.category.slice(1);
      
      this.toast({
        title: "PDF Generated Successfully!",
        description: `Your professional ${categoryName.toLowerCase()} statement has been downloaded.`,
      });

    } catch (error) {
      console.error('PDF generation failed:', error);
      
      this.toast({
        title: "PDF Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
      
      throw error;
    }
  }

  private getMockHoldings() {
    return [
      { schemeName: 'HDFC Flexi Cap Fund', amcName: 'HDFC Mutual Fund', category: 'Equity - Flexi Cap', units: 1250.45, currentNav: 260.0, marketValue: 325000, investedAmount: 250000, pnlPercentage: 30, investmentType: 'SIP' as const },
      { schemeName: 'ICICI Prudential Bluechip Fund', amcName: 'ICICI Prudential', category: 'Equity - Large Cap', units: 890.32, currentNav: 301.0, marketValue: 268000, investedAmount: 200000, pnlPercentage: 34, investmentType: 'SIP' as const },
      { schemeName: 'SBI Small Cap Fund', amcName: 'SBI Mutual Fund', category: 'Equity - Small Cap', units: 1420.18, currentNav: 147.87, marketValue: 210000, investedAmount: 150000, pnlPercentage: 40, investmentType: 'Lumpsum' as const },
      { schemeName: 'Axis ELSS Tax Saver Fund', amcName: 'Axis Mutual Fund', category: 'ELSS', units: 3200.0, currentNav: 80.0, marketValue: 256000, investedAmount: 200000, pnlPercentage: 28, investmentType: 'SIP' as const },
      { schemeName: 'Kotak Emerging Equity Fund', amcName: 'Kotak Mutual Fund', category: 'Equity - Mid Cap', units: 2100.0, currentNav: 110.0, marketValue: 231000, investedAmount: 175000, pnlPercentage: 32, investmentType: 'SIP' as const },
      { schemeName: 'Mirae Asset Large Cap Fund', amcName: 'Mirae Asset', category: 'Equity - Large Cap', units: 4400.0, currentNav: 87.5, marketValue: 385000, investedAmount: 275000, pnlPercentage: 40, investmentType: 'Lumpsum' as const },
    ];
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
