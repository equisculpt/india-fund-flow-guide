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
   * Create the PDF container with perfect styling and layout
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

    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
        
        <!-- PAGE 1 - Overview -->
        <div class="pdf-page" style="background: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 12px; border: 1px solid #e5e7eb; padding: 32px; margin-bottom: 32px; min-height: 1050px; max-height: 1050px; page-break-after: always;">
          
          <!-- Header -->
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

          <!-- User Info -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px; margin-bottom: 24px;">
            <div><strong>Name:</strong> ${data.name}</div>
            <div><strong>Client Code:</strong> ${data.clientCode}</div>
            <div><strong>PAN:</strong> ABCDE1234F</div>
            <div><strong>Phone:</strong> +91-9876543210</div>
            <div><strong>Email:</strong> investor@sipbrewery.com</div>
            <div><strong>KYC Status:</strong> Verified</div>
          </div>

          <!-- Portfolio Summary -->
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

          <!-- AI Insight -->
          <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 24px;">
            <h3 style="font-weight: bold; font-size: 18px; color: #374151; margin: 0 0 8px 0;">${insight.emoji} ${insight.title}</h3>
            <p style="font-size: 14px; color: #6b7280; margin: 0;">${insight.comment}</p>
          </div>

          <!-- Chart Section -->
          ${this.generateChartSection(data)}

          <!-- Footer -->
          <div style="font-size: 12px; text-align: center; color: #6b7280; margin-top: auto; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0;">SIP Brewery © 2024 | AMFI ARN-XXXXX | BSE Member | Page 1 of ${this.calculatePageCount(data)}</p>
            <p style="margin: 4px 0 0 0;">Generated on: ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}</p>
          </div>
        </div>

        ${this.generateHoldingsPage(data)}
        ${this.generateAnalysisPage(data)}
      </div>
    `;

    return container;
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

    return `
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: auto;">
        <h2 style="font-size: 18px; font-weight: 600; color: #374151; margin: 0 0 16px 0;">Portfolio Trend (Last 12 Months)</h2>
        <canvas id="portfolio-chart" width="500" height="300"></canvas>
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
          <h2 style="font-size: 20px; font-weight: bold; color: #3b82f6; margin: 16px 0 0 0;">💡 Investment Analysis & Recommendations</h2>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
        </div>

        <div style="space-y: 16px; flex: 1;">
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

          <div style="background: #fef3c7; padding: 24px; border-radius: 8px; border-left: 4px solid #fbbf24;">
            <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 12px 0;">⚠️ Risk Management</h3>
            <div style="space-y: 8px; font-size: 14px;">
              <div><strong>Volatility Assessment:</strong> Your portfolio shows healthy volatility with strong upside potential.</div>
              <div><strong>Rebalancing:</strong> Consider rebalancing quarterly to maintain optimal asset allocation.</div>
              <div><strong>Emergency Fund:</strong> Ensure you have 6-12 months of expenses in liquid funds.</div>
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
        </div>

        <!-- Footer -->
        <div style="font-size: 12px; text-align: center; color: #6b7280; margin-top: auto; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0;">SIP Brewery © 2024 | AMFI ARN-XXXXX | BSE Member | Page ${this.calculatePageCount(data)} of ${this.calculatePageCount(data)}</p>
          <p style="margin: 4px 0 0 0;">This report is for informational purposes only. Not financial advice. Please consult your financial advisor.</p>
        </div>
      </div>
    `;
  }

  private static calculatePageCount(data: StandardPDFData): number {
    return 3; // Overview + Holdings + Analysis
  }
}