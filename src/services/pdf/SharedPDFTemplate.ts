// Shared PDF Template with consistent SIP Brewery branding
export class SharedPDFTemplate {
  
  // Standard SIP Brewery header for all PDFs
  static getStandardHeader(title: string = 'Portfolio Statement'): string {
    return `
    <!-- SIP Brewery Header -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 2px solid #e5e7eb; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; gap: 15px;">
        <img 
          src="/lovable-uploads/884b7fa3-86c8-4d42-8abf-8bd2cc7fcddb.png" 
          alt="SIP Brewery Logo" 
          style="width: 60px; height: 60px; object-fit: contain;"
        />
        <div>
          <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #1f2937;">SIP Brewery</h1>
          <p style="margin: 0; font-size: 14px; color: #f59e0b; font-weight: 500;">Brewing Wealth</p>
        </div>
      </div>
      <div style="text-align: right;">
        <h2 style="margin: 0; font-size: 18px; color: #374151;">${title}</h2>
        <p style="margin: 0; font-size: 12px; color: #6b7280;">Generated: ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}</p>
      </div>
    </div>`;
  }

  // Standard footer for all PDFs
  static getStandardFooter(pageNumber?: string): string {
    return `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 10px; color: #6b7280;">
      <p style="margin: 0;">SIP Brewery © ${new Date().getFullYear()} | AMFI ARN-XXXXX | BSE Member${pageNumber ? ` | Page ${pageNumber}` : ''}</p>
      <p style="margin: 0;">This report is for informational purposes only. Not financial advice. Please consult your financial advisor.</p>
    </div>`;
  }

  // Standard CSS styles for all PDFs
  static getStandardStyles(): string {
    return `
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #374151;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: #ffffff;
      }
      
      .pdf-page {
        background: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 30px;
        margin-bottom: 20px;
        min-height: 1000px;
        page-break-after: always;
      }
      
      .metric-card {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
        text-align: center;
      }
      
      .metric-value {
        font-size: 24px;
        font-weight: bold;
        color: #1f2937;
        margin: 0;
      }
      
      .metric-label {
        font-size: 12px;
        color: #6b7280;
        margin: 0;
      }
      
      .holdings-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      .holdings-table th,
      .holdings-table td {
        border: 1px solid #e5e7eb;
        padding: 8px 12px;
        text-align: left;
      }
      
      .holdings-table th {
        background: #f3f4f6;
        font-weight: bold;
        font-size: 12px;
      }
      
      .holdings-table td {
        font-size: 11px;
      }
      
      .positive-return {
        color: #059669;
        font-weight: bold;
      }
      
      .negative-return {
        color: #dc2626;
        font-weight: bold;
      }
      
      @media print {
        body { margin: 0; padding: 0; }
        .pdf-page { 
          box-shadow: none; 
          margin: 0; 
          border-radius: 0;
          page-break-after: always;
        }
      }
    </style>`;
  }

  // Complete PDF template with consistent branding
  static getCompletePDFTemplate(
    title: string,
    content: string,
    pageNumber?: string
  ): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - SIP Brewery</title>
      ${this.getStandardStyles()}
    </head>
    <body>
      <div class="pdf-page">
        ${this.getStandardHeader(title)}
        ${content}
        ${this.getStandardFooter(pageNumber)}
      </div>
    </body>
    </html>`;
  }

  // Portfolio summary content template
  static getPortfolioSummaryContent(data: {
    name: string;
    clientCode: string;
    totalInvested: number;
    currentValue: number;
    returnsPercentage: number;
    xirr: number;
  }): string {
    const insight = data.xirr > 15
      ? { emoji: '🚀', title: 'Excellent Growth', comment: 'You are in the top 20% investors!' }
      : data.xirr > 10
        ? { emoji: '📈', title: 'Solid Performance', comment: 'Keep investing steadily.' }
        : { emoji: '🧐', title: 'Scope for Growth', comment: 'Consider reviewing your fund mix.' };

    return `
    <!-- User Info -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
      <div>
        <h3 style="color: #374151; margin-bottom: 10px;">Investor Details</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Client Code:</strong> ${data.clientCode}</p>
        <p><strong>KYC Status:</strong> Verified</p>
      </div>
      <div>
        <h3 style="color: #374151; margin-bottom: 10px;">Contact Information</h3>
        <p><strong>Email:</strong> investor@sipbrewery.com</p>
        <p><strong>Phone:</strong> +91-9876543210</p>
        <p><strong>PAN:</strong> ABCDE1234F</p>
      </div>
    </div>

    <!-- Portfolio Metrics -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px;">
      <div class="metric-card">
        <p class="metric-value">₹${data.totalInvested.toLocaleString('en-IN')}</p>
        <p class="metric-label">Total Invested</p>
      </div>
      <div class="metric-card">
        <p class="metric-value">₹${data.currentValue.toLocaleString('en-IN')}</p>
        <p class="metric-label">Current Value</p>
      </div>
      <div class="metric-card">
        <p class="metric-value ${data.returnsPercentage >= 0 ? 'positive-return' : 'negative-return'}">${data.returnsPercentage.toFixed(2)}%</p>
        <p class="metric-label">Returns</p>
      </div>
      <div class="metric-card">
        <p class="metric-value ${data.xirr >= 0 ? 'positive-return' : 'negative-return'}">${data.xirr.toFixed(2)}%</p>
        <p class="metric-label">XIRR</p>
      </div>
    </div>

    <!-- AI Insight -->
    <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h3 style="color: #1e40af; margin: 0 0 10px 0;">${insight.emoji} ${insight.title}</h3>
      <p style="margin: 0; color: #1e3a8a;">${insight.comment}</p>
    </div>`;
  }
}