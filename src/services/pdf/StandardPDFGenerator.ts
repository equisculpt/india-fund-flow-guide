import React from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Register Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export interface StandardPDFData {
  name: string;
  clientCode: string;
  totalInvested: number;
  currentValue: number;
  returnsPercentage: number;
  xirr: number;
  statementType?: string;
  category?: 'tax' | 'sip' | 'portfolio' | 'transaction' | 'performance';
  reportTitle?: string;
  months?: string[];
  values?: number[];
  holdings?: Array<{
    schemeName: string;
    amcName: string;
    category: string;
    units: number;
    currentNav: number;
    marketValue: number;
    investedAmount: number;
    pnlPercentage: number;
    investmentType: 'SIP' | 'Lumpsum';
  }>;
  insights?: Array<{
    title: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
    icon: string;
  }>;
  taxData?: {
    financialYear: string;
    elssInvestment: number;
    taxSaved: number;
    capitalGains: {
      shortTerm: number;
      longTerm: number;
      taxable: number;
    };
  };
  sipData?: {
    activeSIPs: number;
    totalSIPAmount: number;
    nextInstallmentDate: string;
  };
  transactionData?: {
    totalTransactions: number;
    lastTransaction: string;
    transactionTypes: string[];
  };
}

export class StandardPDFGenerator {
  
  /**
   * Generate a beautiful, consistent PDF statement using the perfected process
   */
  static async generatePDF(data: StandardPDFData): Promise<void> {
    try {
      console.log('🎨 Generating beautiful PDF using standardized process...');
      
      // Create the PDF content dynamically
      const pdfContainer = this.createPDFContainer(data);
      
      // Temporarily add to DOM for rendering
      document.body.appendChild(pdfContainer);
      
      // Create PDF with multiple pages
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeight = 297; // A4 height in mm
      const pageWidth = 210; // A4 width in mm
      
      // Get all page sections
      const pages = pdfContainer.querySelectorAll('.pdf-page');
      
      for (let i = 0; i < pages.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        // Capture each page separately with better quality
        const canvas = await html2canvas(pages[i] as HTMLElement, { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: pages[i].scrollWidth,
          height: pages[i].scrollHeight,
          logging: false,
          onclone: (clonedDoc) => {
            // Ensure all styles are properly cloned
            const clonedElement = clonedDoc.querySelector('.pdf-page') as HTMLElement;
            if (clonedElement) {
              clonedElement.style.pageBreakAfter = 'always';
              clonedElement.style.pageBreakInside = 'avoid';
            }
          }
        });
        
        const imgData = canvas.toDataURL('image/png', 1.0);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfImgWidth = pageWidth;
        const pdfImgHeight = (imgProps.height * pdfImgWidth) / imgProps.width;
        
        // Handle content that might be taller than one page
        if (pdfImgHeight > pageHeight) {
          let yPosition = 0;
          while (yPosition < pdfImgHeight) {
            if (yPosition > 0) {
              pdf.addPage();
            }
            pdf.addImage(imgData, 'PNG', 0, -yPosition, pdfImgWidth, pdfImgHeight);
            yPosition += pageHeight;
          }
        } else {
          pdf.addImage(imgData, 'PNG', 0, 0, pdfImgWidth, pdfImgHeight);
        }
      }

      // Clean up
      document.body.removeChild(pdfContainer);

      pdf.save(`SIP-Brewery-Statement-${data.clientCode}-${new Date().toISOString().slice(0, 10)}.pdf`);
      console.log('✅ Beautiful standardized PDF downloaded successfully');
      
    } catch (error) {
      console.error('❌ Standardized PDF generation error:', error);
      throw error;
    }
  }

  /**
   * Create the PDF container with perfect styling and layout using smart pagination
   */
  private static createPDFContainer(data: StandardPDFData): HTMLElement {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    container.style.color = '#374151';
    container.style.background = '#ffffff';
    
    // Generate AI insight
    const insight = data.xirr > 15
      ? { emoji: '🚀', title: 'Excellent Growth', comment: 'You are in the top 20% investors!' }
      : data.xirr > 10
        ? { emoji: '📈', title: 'Solid Performance', comment: 'Keep investing steadily.' }
        : { emoji: '🧐', title: 'Scope for Growth', comment: 'Consider reviewing your fund mix.' };

    // Smart pagination - generate pages based on content
    const pages = this.generateSmartPages(data, insight);

    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
        ${pages}
      </div>
    `;

    return container;
  }

  /**
   * Generate pages with smart content distribution and splittable sections
   */
  private static generateSmartPages(data: StandardPDFData, insight: any): string {
    const pageHeight = 1050; // A4 page height in pixels
    const headerHeight = 150; // Fixed header height with margins
    const footerHeight = 120; // Fixed footer height with margins  
    const availableContentHeight = pageHeight - headerHeight - footerHeight;
    
    let currentPageHeight = 0;
    let pageNumber = 1;
    let pages = '';
    let currentPageContent = this.generatePageHeader(pageNumber, this.calculatePageCount(data));

    // Define content sections - some can be split, others cannot
    const sections = [
      { 
        name: 'userInfo', 
        content: this.generateUserInfoSection(data), 
        height: 140,
        canSplit: false
      },
      { 
        name: 'portfolioSummary', 
        content: this.generatePortfolioSummarySection(data), 
        height: 200,
        canSplit: false
      },
      { 
        name: 'aiInsight', 
        content: this.generateAIInsightSection(insight), 
        height: 140,
        canSplit: false
      },
      { 
        name: 'chart', 
        content: this.generateChartSection(data), 
        height: 380,
        canSplit: false
      }
    ];

    for (const section of sections) {
      // Check if section fits on current page
      if (currentPageHeight + section.height <= availableContentHeight) {
        // Add to current page
        currentPageContent += section.content;
        currentPageHeight += section.height;
      } else {
        // Complete current page only if there's content
        if (currentPageHeight > 0) {
          currentPageContent += this.generatePageFooter(pageNumber, this.calculatePageCount(data));
          pages += this.wrapPage(currentPageContent, pageNumber);
          pageNumber++;
        }
        
        // Start new page
        currentPageContent = this.generatePageHeader(pageNumber, this.calculatePageCount(data));
        currentPageContent += section.content;
        currentPageHeight = section.height;
      }
    }

    // Complete last page only if there's content
    if (currentPageHeight > 0) {
      currentPageContent += this.generatePageFooter(pageNumber, this.calculatePageCount(data));
      pages += this.wrapPage(currentPageContent, pageNumber);
    }

    // Add holdings and analysis pages with smart splitting
    pages += this.generateSmartHoldingsPages(data);
    pages += this.generateAnalysisPage(data);

    return pages;
  }

  /**
   * Generate holdings pages with smart splitting for large portfolios
   */
  private static generateSmartHoldingsPages(data: StandardPDFData): string {
    const holdings = data.holdings || [];
    const pageHeight = 1050;
    const headerHeight = 150;
    const footerHeight = 120;
    const availableContentHeight = pageHeight - headerHeight - footerHeight;
    const holdingItemHeight = 80; // Each holding card height including margins
    
    if (holdings.length === 0) {
      return this.generateHoldingsPage(data); // Use existing method for empty state
    }

    let pages = '';
    let currentPageHeight = 0;
    let pageNumber = this.calculatePageCount(data) - 1; // Start from holdings page number
    let currentPageContent = '';
    let holdingsToRender: any[] = [];

    // Calculate how many holdings can fit per page
    const holdingsPerPage = Math.floor(availableContentHeight / holdingItemHeight);

    for (let i = 0; i < holdings.length; i += holdingsPerPage) {
      const pageHoldings = holdings.slice(i, i + holdingsPerPage);
      pageNumber++;
      
      currentPageContent = `
        <!-- Holdings Page ${pageNumber - (this.calculatePageCount(data) - 2)} -->
        <div class="pdf-page" style="background: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 12px; border: 1px solid #e5e7eb; padding: 32px; margin-bottom: 32px; min-height: auto; page-break-after: always;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 8px;">
              <img 
                src="/lovable-uploads/884b7fa3-86c8-4d42-8abf-8bd2cc7fcddb.png" 
                alt="SIP Brewery Logo" 
                style="width: 48px; height: 48px; object-fit: contain;"
              />
              <div style="text-align: left;">
                <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">SIP Brewery</h1>
                <p style="margin: 0; font-size: 16px; font-weight: 500; color: #f59e0b;">Brewing Wealth</p>
              </div>
            </div>
            <h2 style="font-size: 20px; font-weight: bold; color: #3b82f6; margin: 16px 0 0 0;">📊 Portfolio Holdings ${i > 0 ? `(Page ${Math.ceil((i + 1) / holdingsPerPage)})` : 'Breakdown'}</h2>
            <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
          </div>

          <div style="space-y: 12px; flex: 1;">
            ${pageHoldings.map(holding => `
              <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                <h3 style="font-weight: bold; font-size: 16px; margin: 0 0 8px 0; color: #1e40af;">${holding.schemeName}</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 12px;">
                  <div><strong>Type:</strong> ${holding.investmentType}</div>
                  <div><strong>Units:</strong> ${holding.units.toFixed(3)}</div>
                  <div><strong>NAV:</strong> ₹${holding.currentNav.toFixed(2)}</div>
                  <div><strong>Invested:</strong> ₹${holding.investedAmount.toLocaleString('en-IN')}</div>
                  <div><strong>Current:</strong> ₹${holding.marketValue.toLocaleString('en-IN')}</div>
                  <div style="color: ${holding.pnlPercentage >= 0 ? '#22c55e' : '#ef4444'}; font-weight: bold;"><strong>Returns:</strong> ${holding.pnlPercentage >= 0 ? '+' : ''}${holding.pnlPercentage.toFixed(1)}%</div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Footer -->
          <div style="font-size: 12px; text-align: center; color: #6b7280; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0;">SIP Brewery © 2024 | AMFI ARN-XXXXX | BSE Member | Page ${pageNumber}</p>
            <p style="margin: 4px 0 0 0;">All amounts in ₹. Returns calculated on current NAV.</p>
          </div>
        </div>
      `;
      
      pages += currentPageContent;
    }

    return pages;
  }

  /**
   * Generate page header
   */
  private static generatePageHeader(pageNumber: number, totalPages: number): string {
    return `
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 8px;">
          <img 
            src="/lovable-uploads/884b7fa3-86c8-4d42-8abf-8bd2cc7fcddb.png" 
            alt="SIP Brewery Logo" 
            style="width: 64px; height: 64px; object-fit: contain;"
          />
          <div style="text-align: left;">
            <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #1f2937;">SIP Brewery</h1>
            <p style="margin: 0; font-size: 18px; font-weight: 500; color: #f59e0b;">Brewing Wealth</p>
          </div>
        </div>
        <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
      </div>
    `;
  }

  /**
   * Generate page footer
   */
  private static generatePageFooter(pageNumber: number, totalPages: number): string {
    return `
      <div style="font-size: 12px; text-align: center; color: #6b7280; margin-top: auto; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0;">SIP Brewery © 2024 | AMFI ARN-XXXXX | BSE Member | Page ${pageNumber} of ${totalPages}</p>
        <p style="margin: 4px 0 0 0;">Generated on: ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}</p>
      </div>
    `;
  }

  /**
   * Wrap content in a page container
   */
  private static wrapPage(content: string, pageNumber: number): string {
    return `
      <div class="pdf-page" style="background: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 12px; border: 1px solid #e5e7eb; padding: 32px; margin-bottom: 32px; min-height: 1050px; max-height: 1050px; page-break-after: always;">
        ${content}
      </div>
    `;
  }

  /**
   * Generate user info section
   */
  private static generateUserInfoSection(data: StandardPDFData): string {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px; margin-bottom: 24px;">
        <div><strong>Name:</strong> ${data.name}</div>
        <div><strong>Client Code:</strong> ${data.clientCode}</div>
        <div><strong>PAN:</strong> ABCDE1234F</div>
        <div><strong>Phone:</strong> +91-9876543210</div>
        <div><strong>Email:</strong> investor@sipbrewery.com</div>
        <div><strong>KYC Status:</strong> Verified</div>
      </div>
    `;
  }

  /**
   * Generate portfolio summary section
   */
  private static generatePortfolioSummarySection(data: StandardPDFData): string {
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #fbbf24;">
          <h3 style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0;">Total Invested</h3>
          <p style="font-size: 24px; font-weight: bold; color: #374151; margin: 0;">₹${data.totalInvested.toLocaleString('en-IN')}</p>
        </div>
        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <h3 style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0;">Current Value</h3>
          <p style="font-size: 24px; font-weight: bold; color: #374151; margin: 0;">₹${data.currentValue.toLocaleString('en-IN')}</p>
        </div>
        <div style="background: #eff6ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <h3 style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0;">Returns</h3>
          <p style="font-size: 24px; font-weight: bold; color: #374151; margin: 0;">${data.returnsPercentage.toFixed(2)}%</p>
        </div>
        <div style="background: #faf5ff; padding: 16px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
          <h3 style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0;">XIRR</h3>
          <p style="font-size: 24px; font-weight: bold; color: #374151; margin: 0;">${data.xirr.toFixed(2)}%</p>
        </div>
      </div>
    `;
  }

  /**
   * Generate AI insight section
   */
  private static generateAIInsightSection(insight: any): string {
    return `
      <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 24px;">
        <h3 style="font-weight: bold; font-size: 18px; color: #374151; margin: 0 0 8px 0;">${insight.emoji} ${insight.title}</h3>
        <p style="font-size: 14px; color: #6b7280; margin: 0;">${insight.comment}</p>
      </div>
    `;
  }

  private static generateChartSection(data: StandardPDFData): string {
    if (!data.months || !data.values) {
      return `
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: auto;">
          <h2 style="font-size: 18px; font-weight: 600; color: #374151; margin: 0 0 16px 0;">Portfolio Growth Chart</h2>
          <div style="height: 200px; background: #f9fafb; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6b7280;">
            Chart will be generated based on your portfolio data
          </div>
        </div>
      `;
    }

    // Generate SVG chart instead of canvas for better PDF compatibility
    const maxValue = Math.max(...data.values);
    const minValue = Math.min(...data.values);
    const chartWidth = 500;
    const chartHeight = 200;
    const padding = 40;

    // Generate SVG path for the line chart
    const points = data.months.map((month, index) => {
      const x = padding + (index * (chartWidth - 2 * padding)) / (data.months.length - 1);
      const y = chartHeight - padding - ((data.values[index] - minValue) / (maxValue - minValue)) * (chartHeight - 2 * padding);
      return `${x},${y}`;
    }).join(' ');

    return `
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: auto;">
        <h2 style="font-size: 18px; font-weight: 600; color: #374151; margin: 0 0 16px 0;">Portfolio Trend (Last 12 Months)</h2>
        <svg width="${chartWidth}" height="${chartHeight}" style="border: 1px solid #e5e7eb; border-radius: 8px;">
          <!-- Grid lines -->
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <!-- Chart line -->
          <polyline points="${points}" fill="none" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          
          <!-- Data points -->
          ${data.months.map((month, index) => {
            const x = padding + (index * (chartWidth - 2 * padding)) / (data.months.length - 1);
            const y = chartHeight - padding - ((data.values[index] - minValue) / (maxValue - minValue)) * (chartHeight - 2 * padding);
            return `<circle cx="${x}" cy="${y}" r="4" fill="#3B82F6"/>`;
          }).join('')}
          
          <!-- Y-axis labels -->
          <text x="5" y="25" font-size="10" fill="#6b7280">₹${(maxValue/100000).toFixed(1)}L</text>
          <text x="5" y="${chartHeight - 10}" font-size="10" fill="#6b7280">₹${(minValue/100000).toFixed(1)}L</text>
          
          <!-- X-axis labels -->
          ${data.months.map((month, index) => {
            if (index % 2 === 0) { // Show every other month to avoid crowding
              const x = padding + (index * (chartWidth - 2 * padding)) / (data.months.length - 1);
              return `<text x="${x}" y="${chartHeight - 5}" font-size="10" fill="#6b7280" text-anchor="middle">${month.substring(0, 3)}</text>`;
            }
            return '';
          }).join('')}
        </svg>
        <div style="text-align: center; margin-top: 8px; font-size: 12px; color: #6b7280;">
          Portfolio Growth: ₹${(data.values[0]/100000).toFixed(1)}L → ₹${(data.values[data.values.length-1]/100000).toFixed(1)}L
        </div>
      </div>
    `;
  }

  private static generateHoldingsPage(data: StandardPDFData): string {
    const holdings = data.holdings || [];
    
    return `
      <!-- PAGE 2 - Holdings Details -->
      <div class="pdf-page" style="background: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 12px; border: 1px solid #e5e7eb; padding: 32px; margin-bottom: 32px; min-height: auto; page-break-after: always;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 8px;">
            <img 
              src="/lovable-uploads/884b7fa3-86c8-4d42-8abf-8bd2cc7fcddb.png" 
              alt="SIP Brewery Logo" 
              style="width: 48px; height: 48px; object-fit: contain;"
            />
            <div style="text-align: left;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">SIP Brewery</h1>
              <p style="margin: 0; font-size: 16px; font-weight: 500; color: #f59e0b;">Brewing Wealth</p>
            </div>
          </div>
          <h2 style="font-size: 20px; font-weight: bold; color: #3b82f6; margin: 16px 0 0 0;">📊 Portfolio Holdings Breakdown</h2>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
        </div>

        <div style="space-y: 12px; flex: 1;">
          ${holdings.length > 0 ? holdings.map(holding => `
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
              <h3 style="font-weight: bold; font-size: 16px; margin: 0 0 8px 0; color: #1e40af;">${holding.schemeName}</h3>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 12px;">
                <div><strong>Type:</strong> ${holding.investmentType}</div>
                <div><strong>Units:</strong> ${holding.units.toFixed(3)}</div>
                <div><strong>NAV:</strong> ₹${holding.currentNav.toFixed(2)}</div>
                <div><strong>Invested:</strong> ₹${holding.investedAmount.toLocaleString('en-IN')}</div>
                <div><strong>Current:</strong> ₹${holding.marketValue.toLocaleString('en-IN')}</div>
                <div style="color: ${holding.pnlPercentage >= 0 ? '#22c55e' : '#ef4444'}; font-weight: bold;"><strong>Returns:</strong> ${holding.pnlPercentage >= 0 ? '+' : ''}${holding.pnlPercentage.toFixed(1)}%</div>
              </div>
            </div>
          `).join('') : `
            <div style="background: #f0f9ff; border: 1px solid #93c5fd; border-radius: 8px; padding: 24px; text-align: center;">
              <h3 style="color: #1e40af; font-size: 18px; margin: 0 0 8px 0;">Ready to Start Your Investment Journey?</h3>
              <p style="color: #3730a3; margin: 0;">You don't have any mutual fund holdings yet. Start investing today to build your wealth!</p>
            </div>
          `}
        </div>

        <!-- Footer -->
        <div style="font-size: 12px; text-align: center; color: #6b7280; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0;">SIP Brewery © 2024 | AMFI ARN-XXXXX | BSE Member | Page 2 of ${this.calculatePageCount(data)}</p>
          <p style="margin: 4px 0 0 0;">All amounts in ₹. Returns calculated on current NAV.</p>
        </div>
      </div>
    `;
  }

  private static generateAnalysisPage(data: StandardPDFData): string {
    // Generate content based on statement type
    const content = this.generateStatementSpecificContent(data);
    
    return `
      <!-- PAGE 3 - Analysis & Recommendations -->
      <div class="pdf-page" style="background: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 12px; border: 1px solid #e5e7eb; padding: 32px; min-height: auto;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 8px;">
            <img 
              src="/lovable-uploads/884b7fa3-86c8-4d42-8abf-8bd2cc7fcddb.png" 
              alt="SIP Brewery Logo" 
              style="width: 48px; height: 48px; object-fit: contain;"
            />
            <div style="text-align: left;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">SIP Brewery</h1>
              <p style="margin: 0; font-size: 16px; font-weight: 500; color: #f59e0b;">Brewing Wealth</p>
            </div>
          </div>
          <h2 style="font-size: 20px; font-weight: bold; color: #3b82f6; margin: 16px 0 0 0;">${content.title}</h2>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
        </div>

        <div style="space-y: 16px; flex: 1;">
          ${content.sections}
        </div>

        <!-- Footer -->
        <div style="font-size: 12px; text-align: center; color: #6b7280; margin-top: auto; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0;">SIP Brewery © 2024 | AMFI ARN-XXXXX | BSE Member | Page ${this.calculatePageCount(data)} of ${this.calculatePageCount(data)}</p>
          <p style="margin: 4px 0 0 0;">This report is for informational purposes only. Not financial advice. Please consult your financial advisor.</p>
        </div>
      </div>
    `;
  }

  private static generateStatementSpecificContent(data: StandardPDFData): { title: string; sections: string } {
    switch (data.category) {
      case 'tax':
        return this.generateTaxSpecificContent(data);
      case 'sip':
        return this.generateSIPSpecificContent(data);
      case 'transaction':
        return this.generateTransactionSpecificContent(data);
      case 'performance':
        return this.generatePerformanceSpecificContent(data);
      default:
        return this.generateDefaultContent(data);
    }
  }

  private static generateTaxSpecificContent(data: StandardPDFData): { title: string; sections: string } {
    const taxData = data.taxData || {
      financialYear: '2024-25',
      elssInvestment: 50000,
      taxSaved: 15000,
      capitalGains: { shortTerm: 25000, longTerm: 45000, taxable: 55000 }
    };

    return {
      title: '📊 Tax Analysis & Planning Report',
      sections: `
        <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #fbbf24;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 8px 0;">💰 Tax Savings Summary (FY ${taxData.financialYear})</h3>
          <div style="space-y: 4px; font-size: 14px;">
            <div><strong>ELSS Investment:</strong> ₹${taxData.elssInvestment.toLocaleString('en-IN')}</div>
            <div><strong>Tax Saved under 80C:</strong> ₹${taxData.taxSaved.toLocaleString('en-IN')}</div>
            <div><strong>Remaining 80C Limit:</strong> ₹${(150000 - taxData.elssInvestment).toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">📈 Capital Gains Analysis</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Short Term Capital Gains:</strong> ₹${taxData.capitalGains.shortTerm.toLocaleString('en-IN')} (Tax Rate: 15%)</div>
            <div><strong>Long Term Capital Gains:</strong> ₹${taxData.capitalGains.longTerm.toLocaleString('en-IN')} (Tax Rate: 10% above ₹1L)</div>
            <div><strong>Total Taxable Gains:</strong> ₹${taxData.capitalGains.taxable.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style="background: #f0fdf4; padding: 24px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">🎯 Tax Planning Recommendations</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>ELSS Opportunity:</strong> Invest ₹${(150000 - taxData.elssInvestment).toLocaleString('en-IN')} more to maximize 80C deduction.</div>
            <div><strong>Tax Harvesting:</strong> Consider booking losses to offset capital gains liability.</div>
            <div><strong>Annual Planning:</strong> Systematic ELSS SIPs can optimize your tax planning.</div>
          </div>
        </div>

        <div style="background: #faf5ff; padding: 24px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">📅 Important Tax Dates</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>March 31:</strong> Last date for 80C investments for current FY</div>
            <div><strong>July 31:</strong> ITR filing deadline</div>
            <div><strong>Quarterly Review:</strong> Monitor capital gains and plan tax harvesting</div>
          </div>
        </div>
      `
    };
  }

  private static generateSIPSpecificContent(data: StandardPDFData): { title: string; sections: string } {
    const sipData = data.sipData || {
      activeSIPs: 4,
      totalSIPAmount: 15000,
      nextInstallmentDate: '2024-01-15'
    };

    return {
      title: '🔄 SIP Analysis & Performance Report',
      sections: `
        <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 8px 0;">🎯 SIP Portfolio Summary</h3>
          <div style="space-y: 4px; font-size: 14px;">
            <div><strong>Active SIPs:</strong> ${sipData.activeSIPs} schemes</div>
            <div><strong>Monthly SIP Amount:</strong> ₹${sipData.totalSIPAmount.toLocaleString('en-IN')}</div>
            <div><strong>Next Installment:</strong> ${sipData.nextInstallmentDate}</div>
          </div>
        </div>

        <div style="background: #f0fdf4; padding: 24px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">📈 SIP Performance Highlights</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Rupee Cost Averaging:</strong> Your systematic approach has optimized purchase costs.</div>
            <div><strong>Discipline Factor:</strong> 100% SIP success rate - excellent investment discipline!</div>
            <div><strong>Compound Growth:</strong> Regular investments are building significant wealth over time.</div>
          </div>
        </div>

        <div style="background: #fef3c7; padding: 24px; border-radius: 8px; border-left: 4px solid #fbbf24;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">⚡ SIP Optimization Tips</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Annual Step-up:</strong> Consider increasing SIP by 10% annually to beat inflation.</div>
            <div><strong>Market Volatility:</strong> Continue SIPs during market downturns for better returns.</div>
            <div><strong>Goal Alignment:</strong> Ensure SIP amounts align with your financial goals and timeline.</div>
          </div>
        </div>

        <div style="background: #faf5ff; padding: 24px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">🚀 Future SIP Strategy</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Portfolio Diversification:</strong> Consider adding international funds to your SIP portfolio.</div>
            <div><strong>Tax Efficiency:</strong> Include ELSS funds for tax benefits under Section 80C.</div>
            <div><strong>Long-term Vision:</strong> Stay invested for 10+ years to maximize compound growth.</div>
          </div>
        </div>
      `
    };
  }

  private static generateTransactionSpecificContent(data: StandardPDFData): { title: string; sections: string } {
    const transactionData = data.transactionData || {
      totalTransactions: 24,
      lastTransaction: '2024-01-10',
      transactionTypes: ['SIP', 'Redemption', 'Switch']
    };

    return {
      title: '📋 Transaction Analysis & History Report',
      sections: `
        <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 8px 0;">📊 Transaction Summary</h3>
          <div style="space-y: 4px; font-size: 14px;">
            <div><strong>Total Transactions:</strong> ${transactionData.totalTransactions}</div>
            <div><strong>Last Transaction:</strong> ${transactionData.lastTransaction}</div>
            <div><strong>Transaction Types:</strong> ${transactionData.transactionTypes.join(', ')}</div>
          </div>
        </div>

        <div style="background: #f0fdf4; padding: 24px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">✅ Transaction Pattern Analysis</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Investment Frequency:</strong> Regular monthly investments showing excellent discipline.</div>
            <div><strong>Redemption Pattern:</strong> Minimal redemptions indicate long-term investment approach.</div>
            <div><strong>Portfolio Rebalancing:</strong> Strategic switches optimizing portfolio performance.</div>
          </div>
        </div>

        <div style="background: #fef3c7; padding: 24px; border-radius: 8px; border-left: 4px solid #fbbf24;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">⚠️ Transaction Efficiency</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Timing Analysis:</strong> Well-timed investments during market volatility.</div>
            <div><strong>Cost Optimization:</strong> Direct plan usage minimizing expense ratios.</div>
            <div><strong>Tax Efficiency:</strong> Strategic timing of redemptions for tax optimization.</div>
          </div>
        </div>

        <div style="background: #faf5ff; padding: 24px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">📈 Future Transaction Strategy</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Systematic Approach:</strong> Continue systematic investments for long-term wealth creation.</div>
            <div><strong>Rebalancing Schedule:</strong> Plan quarterly reviews for portfolio rebalancing.</div>
            <div><strong>Goal-based Investing:</strong> Align future transactions with specific financial goals.</div>
          </div>
        </div>
      `
    };
  }

  private static generatePerformanceSpecificContent(data: StandardPDFData): { title: string; sections: string } {
    return {
      title: '🚀 Performance Analysis & Benchmark Comparison',
      sections: `
        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 8px 0;">🎯 Performance Metrics</h3>
          <div style="space-y: 4px; font-size: 14px;">
            <div><strong>Portfolio XIRR:</strong> ${data.xirr.toFixed(2)}% (Excellent performance!)</div>
            <div><strong>Benchmark Comparison:</strong> Outperforming Nifty 50 by ${(data.xirr - 12).toFixed(1)}%</div>
            <div><strong>Risk-Adjusted Returns:</strong> Superior Sharpe ratio indicating optimal risk management</div>
          </div>
        </div>

        <div style="background: #dbeafe; padding: 24px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">📊 Rolling Returns Analysis</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>1-Year Return:</strong> Consistent positive returns across market cycles</div>
            <div><strong>3-Year CAGR:</strong> Strong compound annual growth demonstrating portfolio stability</div>
            <div><strong>5-Year Track Record:</strong> Long-term wealth creation with disciplined approach</div>
          </div>
        </div>

        <div style="background: #fef3c7; padding: 24px; border-radius: 8px; border-left: 4px solid #fbbf24;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">⚡ Alpha Generation</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Fund Selection:</strong> Well-researched fund choices generating significant alpha</div>
            <div><strong>Asset Allocation:</strong> Optimal diversification contributing to consistent returns</div>
            <div><strong>Market Timing:</strong> Strategic entry and exit decisions enhancing performance</div>
          </div>
        </div>

        <div style="background: #faf5ff; padding: 24px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">🎯 Performance Outlook</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Sustainable Growth:</strong> Current strategy positioned for continued outperformance</div>
            <div><strong>Risk Management:</strong> Balanced approach ensuring long-term capital preservation</div>
            <div><strong>Optimization Opportunities:</strong> Minor adjustments can further enhance returns</div>
          </div>
        </div>
      `
    };
  }

  private static generateDefaultContent(data: StandardPDFData): { title: string; sections: string } {
    return {
      title: '💡 Investment Analysis & Recommendations',
      sections: `
        <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #fbbf24;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 8px 0;">💡 Portfolio Analysis Summary</h3>
          <div style="space-y: 4px; font-size: 14px;">
            <div><strong>Asset Allocation:</strong> Large Cap (45%), Mid Cap (25%), Small Cap (20%), Flexi Cap (10%)</div>
            <div><strong>Risk Level:</strong> Moderate to High</div>
            <div><strong>Diversification:</strong> Well-balanced across market capitalizations</div>
          </div>
        </div>

        <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">🎯 Investment Goals & Progress</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Current Progress:</strong> You're on track to achieve your financial goals with consistent SIP investments.</div>
            <div><strong>Next Steps:</strong> Consider increasing SIP amount by 10% annually to combat inflation.</div>
            <div><strong>Tax Planning:</strong> Review ELSS funds for Section 80C benefits in the next financial year.</div>
          </div>
        </div>

        <div style="background: #f0fdf4; padding: 24px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">⚡ Performance Highlights</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Portfolio Performance:</strong> Your XIRR of ${data.xirr.toFixed(2)}% significantly outperforms market average.</div>
            <div><strong>Consistency:</strong> Regular SIP investments have resulted in excellent rupee-cost averaging.</div>
            <div><strong>Growth Trajectory:</strong> Portfolio shows strong upward momentum with balanced risk.</div>
          </div>
        </div>

        <div style="background: #faf5ff; padding: 24px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">🚀 Future Opportunities</h3>
          <div style="space-y: 8px; font-size: 14px;">
            <div><strong>Market Outlook:</strong> Current market conditions favor continued SIP investments.</div>
            <div><strong>New Categories:</strong> Consider exposure to international funds and sector-specific ETFs.</div>
            <div><strong>Long-term Vision:</strong> Your disciplined approach will compound significantly over time.</div>
          </div>
        </div>
      `
    };
  }

  private static calculatePageCount(data: StandardPDFData): number {
    const holdings = data.holdings || [];
    const holdingItemHeight = 80;
    const availableContentHeight = 1050 - 150 - 120; // page - header - footer
    const holdingsPerPage = Math.floor(availableContentHeight / holdingItemHeight);
    const holdingsPages = holdings.length > 0 ? Math.ceil(holdings.length / holdingsPerPage) : 1;
    
    return 1 + holdingsPages + 1; // Overview + Holdings + Analysis
  }
}