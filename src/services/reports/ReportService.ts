import { DirectPDFService } from '@/services/pdf/DirectPDFService';

export interface ReportConfig {
  type: 'html' | 'pdf';
  category: 'tax' | 'sip' | 'portfolio' | 'transaction' | 'performance';
  reportName: string;
  clientCode?: string;
  data?: any;
}

export class ReportService {
  private directPDFService: DirectPDFService;
  
  constructor(toast: any) {
    this.directPDFService = new DirectPDFService(toast);
  }

  async generateReport(config: ReportConfig): Promise<void> {
    try {
      console.log('Generating report:', config);
      
      if (config.type === 'pdf') {
        await this.generatePDFReport(config);
      } else {
        await this.generateHTMLReport(config);
      }
    } catch (error) {
      console.error('Report generation failed:', error);
      throw error;
    }
  }

  private async generatePDFReport(config: ReportConfig): Promise<void> {
    // Use standardized beautiful PDF generation
    const reportType = `${config.category}-${config.reportName}`;
    const clientCode = config.clientCode || this.generateClientCode(config.category);
    
    await this.directPDFService.generateDirectPDF(reportType, clientCode, {
      reportName: config.reportName,
      category: config.category,
      statementType: reportType,
      reportTitle: config.data?.reportTitle || config.reportName,
      ...this.getStatementSpecificData(config.category, config.reportName),
      ...config.data
    });
  }

  private getStatementSpecificData(category: string, reportName: string): any {
    switch (category) {
      case 'tax':
        return {
          taxData: {
            financialYear: '2024-25',
            elssInvestment: 50000,
            taxSaved: 15000,
            capitalGains: {
              shortTerm: 25000,
              longTerm: 45000,
              taxable: 55000
            }
          }
        };
      case 'sip':
        return {
          sipData: {
            activeSIPs: 4,
            totalSIPAmount: 15000,
            nextInstallmentDate: '2024-01-15'
          }
        };
      case 'transaction':
        return {
          transactionData: {
            totalTransactions: 24,
            lastTransaction: '2024-01-10',
            transactionTypes: ['SIP', 'Redemption', 'Switch']
          }
        };
      case 'performance':
        return {};
      default:
        return {};
    }
  }

  private async generateHTMLReport(config: ReportConfig): Promise<void> {
    const reportType = `${config.category}-${config.reportName}`;
    const params = new URLSearchParams({
      type: reportType,
      client: config.clientCode || this.generateClientCode(config.category),
      format: 'html',
      category: config.category,
      reportName: config.reportName
    });

    if (config.data) {
      Object.entries(config.data).forEach(([key, value]) => {
        params.append(key, String(value));
      });
    }

    const baseUrl = window.location.origin;
    const reportUrl = `${baseUrl}/statement-preview?${params.toString()}`;
    
    window.open(reportUrl, '_blank', 'width=1200,height=800');
  }

  private generateClientCode(category: string): string {
    const prefixes = {
      tax: 'TAX',
      sip: 'SIP',
      portfolio: 'PFL',
      transaction: 'TXN',
      performance: 'PRF'
    };
    
    const prefix = prefixes[category as keyof typeof prefixes] || 'RPT';
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}${timestamp}`;
  }


  // SIP-specific report methods
  async generateSIPReport(reportName: string, type: 'html' | 'pdf'): Promise<void> {
    const sipReports = {
      'sip-performance': 'SIP Performance Analysis',
      'sip-statement': 'SIP Investment Statement',
      'sip-comprehensive': 'Comprehensive SIP Report',
      'ai-summary-report': 'AI-Powered SIP Summary',
      'rewards-statement': 'SIP Rewards Statement'
    };

    await this.generateReport({
      type,
      category: 'sip',
      reportName,
      data: {
        reportTitle: sipReports[reportName as keyof typeof sipReports] || reportName
      }
    });
  }

  // Portfolio-specific report methods
  async generatePortfolioReport(reportName: string, type: 'html' | 'pdf'): Promise<void> {
    const portfolioReports = {
      'portfolio-comprehensive': 'Comprehensive Portfolio Report',
      'holdings-summary': 'Portfolio Holdings Summary',
      'performance-analysis': 'Portfolio Performance Analysis',
      'risk-analysis': 'Portfolio Risk Analysis',
      'allocation-report': 'Asset Allocation Report'
    };

    await this.generateReport({
      type,
      category: 'portfolio',
      reportName,
      data: {
        reportTitle: portfolioReports[reportName as keyof typeof portfolioReports] || reportName
      }
    });
  }

  // Transaction-specific report methods with date filtering
  async generateTransactionReport(
    reportName: string, 
    type: 'html' | 'pdf',
    filters?: {
      startDate?: Date;
      endDate?: Date;
      financialYear?: string;
      reportType?: 'custom' | 'financial_year' | 'all_time';
    }
  ): Promise<void> {
    const transactionReports = {
      'transaction-comprehensive': 'Comprehensive Transaction Report',
      'cams': 'CAMS Transaction Statement',
      'karvy': 'Karvy Transaction Statement',
      'consolidated': 'Consolidated Transaction Report',
      'recent-transactions': 'Recent Transactions Summary'
    };

    await this.generateReport({
      type,
      category: 'transaction',
      reportName,
      data: {
        reportTitle: transactionReports[reportName as keyof typeof transactionReports] || reportName,
        transactionData: {
          ...this.getStatementSpecificData('transaction', reportName).transactionData,
          startDate: filters?.startDate?.toLocaleDateString('en-IN'),
          endDate: filters?.endDate?.toLocaleDateString('en-IN'),
          financialYear: filters?.financialYear,
          reportType: filters?.reportType
        }
      }
    });
  }

  // Tax-specific report methods with financial year selection
  async generateTaxReport(
    reportName: string, 
    type: 'html' | 'pdf',
    filters?: {
      financialYear?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<void> {
    const taxReports = {
      'elss': 'ELSS Investment Summary',
      'stcg': 'Short Term Capital Gains',
      'ltcg': 'Long Term Capital Gains',
      '80c-certificate': '80C Investment Certificate',
      'form-16': 'Form 16 TDS Certificate',
      'capital-gains': 'Capital Gains Statement',
      'annual-investment': 'Annual Investment Statement',
      'tax-comprehensive': 'Comprehensive Tax Report'
    };

    await this.generateReport({
      type,
      category: 'tax',
      reportName,
      data: {
        reportTitle: taxReports[reportName as keyof typeof taxReports] || reportName,
        taxData: {
          ...this.getStatementSpecificData('tax', reportName).taxData,
          financialYear: filters?.financialYear || '2024-25',
          reportPeriod: filters?.startDate && filters?.endDate 
            ? `${filters.startDate.toLocaleDateString('en-IN')} to ${filters.endDate.toLocaleDateString('en-IN')}`
            : undefined
        }
      }
    });
  }

  // Performance-specific report methods
  async generatePerformanceReport(reportName: string, type: 'html' | 'pdf'): Promise<void> {
    const performanceReports = {
      'xirr-analysis': 'XIRR Performance Analysis',
      'returns-summary': 'Returns Summary Report',
      'benchmark-comparison': 'Benchmark Comparison Report',
      'fund-performance': 'Fund Performance Analysis'
    };

    await this.generateReport({
      type,
      category: 'performance',
      reportName,
      data: {
        reportTitle: performanceReports[reportName as keyof typeof performanceReports] || reportName
      }
    });
  }
}