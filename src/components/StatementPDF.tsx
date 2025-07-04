import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import BreweryLogo from './BreweryLogo';

// Register Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

interface Props {
  name: string;
  clientCode: string;
  totalInvested: number;
  currentValue: number;
  returnsPercentage: number;
  xirr: number;
  months: string[];
  values: number[];
}

const StatementPDF: React.FC<Props> = ({
  name,
  clientCode,
  totalInvested,
  currentValue,
  returnsPercentage,
  xirr,
  months,
  values
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Portfolio Value',
          data: values,
          borderColor: 'hsl(var(--primary))',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          backgroundColor: 'hsl(var(--primary) / 0.1)',
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    return () => chart.destroy();
  }, [months, values]);

  const downloadPDF = async () => {
    try {
      console.log('🎨 Generating beautiful PDF using browser rendering...');
      
      if (!captureRef.current) return;
      
      // Create PDF with multiple pages
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeight = 297; // A4 height in mm
      const pageWidth = 210; // A4 width in mm
      
      // Get all page sections
      const pages = captureRef.current.querySelectorAll('.pdf-page');
      
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

      pdf.save(`SIP-Brewery-Statement-${clientCode}-${new Date().toISOString().slice(0, 10)}.pdf`);
      console.log('✅ Beautiful multi-page PDF downloaded successfully');
      
    } catch (error) {
      console.error('❌ PDF generation error:', error);
    }
  };

  // Emoji Insights
  const insight = xirr > 15
    ? { emoji: '🚀', title: 'Excellent Growth', comment: 'You are in the top 20% investors!' }
    : xirr > 10
      ? { emoji: '📈', title: 'Solid Performance', comment: 'Keep investing steadily.' }
      : { emoji: '🧐', title: 'Scope for Growth', comment: 'Consider reviewing your fund mix.' };

  return (
    <div className="p-6 bg-background min-h-screen font-sans">
      <div ref={captureRef} className="max-w-3xl mx-auto">
        
        {/* PAGE 1 - Overview */}
        <div className="pdf-page bg-card shadow-xl rounded-xl border p-8 mb-8" style={{ minHeight: '1050px', maxHeight: '1050px' }}>
          {/* Header */}
          <div className="text-center mb-6 flex items-center justify-center gap-3">
            <h1 className="text-3xl font-bold text-primary">SIP Brewery</h1>
            <div className="bg-primary/10 p-2 rounded-lg">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">Brewing Wealth, One SIP at a Time</p>
            <hr className="my-4 border-border" />
          </div>

          {/* User Info */}
          <div className="grid grid-cols-2 gap-4 text-foreground text-sm mb-6">
            <div><strong>Name:</strong> {name}</div>
            <div><strong>Client Code:</strong> {clientCode}</div>
            <div><strong>PAN:</strong> ABCDE1234F</div>
            <div><strong>Phone:</strong> +91-9876543210</div>
            <div><strong>Email:</strong> investor@sipbrewery.com</div>
            <div><strong>KYC Status:</strong> Verified</div>
          </div>

          {/* Portfolio Summary */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-secondary/50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-muted-foreground text-sm">Total Invested</h3>
              <p className="text-xl font-bold text-foreground">₹{totalInvested.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="text-muted-foreground text-sm">Current Value</h3>
              <p className="text-xl font-bold text-foreground">₹{currentValue.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-muted-foreground text-sm">Returns</h3>
              <p className="text-xl font-bold text-foreground">{returnsPercentage.toFixed(2)}%</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-muted-foreground text-sm">XIRR</h3>
              <p className="text-xl font-bold text-foreground">{xirr.toFixed(2)}%</p>
            </div>
          </div>

          {/* AI Insight */}
          <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary mb-6">
            <h3 className="font-bold text-lg text-foreground">{insight.emoji} {insight.title}</h3>
            <p className="text-sm text-muted-foreground">{insight.comment}</p>
          </div>

          {/* Chart Section */}
          <div className="bg-card border rounded-xl shadow p-4 mb-auto">
            <h2 className="text-lg font-semibold text-foreground mb-4">Portfolio Trend (Last 12 Months)</h2>
            <canvas ref={chartRef} width="500" height="300" />
          </div>

          {/* Footer */}
          <div className="text-xs text-center text-muted-foreground mt-auto pt-6 border-t border-border">
            <p>SIP Brewery © 2024 | AMFI ARN-XXXXX | BSE Member | Page 1 of 3</p>
            <p className="mt-1">Generated on: {new Date().toLocaleDateString('en-IN')} at {new Date().toLocaleTimeString('en-IN')}</p>
          </div>
        </div>

        {/* PAGE 2+ - Holdings Details (Can span multiple pages for large portfolios) */}
        <div className="pdf-page bg-card shadow-xl rounded-xl border p-8 mb-8" style={{ minHeight: 'auto' }}>
          {/* Header */}
          <div className="text-center mb-6 flex items-center justify-center gap-3">
            <h1 className="text-2xl font-bold text-primary">SIP Brewery</h1>
            <div className="bg-primary/10 p-2 rounded-lg">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-primary">📊 Portfolio Holdings Breakdown</h2>
            <hr className="my-4 border-border" />
          </div>

          <div className="space-y-3 flex-1">
            <div className="bg-card border rounded-lg p-3">
              <h3 className="font-bold text-base mb-2 text-blue-600">HDFC Top 100 Fund - Direct Growth</h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div><strong>Type:</strong> SIP</div>
                <div><strong>Units:</strong> 1,234.56</div>
                <div><strong>NAV:</strong> ₹856.32</div>
                <div><strong>Invested:</strong> ₹3,50,000</div>
                <div><strong>Current:</strong> ₹4,85,673</div>
                <div className="text-green-600 font-bold"><strong>Returns:</strong> +38.8%</div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-3">
              <h3 className="font-bold text-base mb-2 text-blue-600">Axis Small Cap Fund - Direct Growth</h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div><strong>Type:</strong> SIP</div>
                <div><strong>Units:</strong> 876.23</div>
                <div><strong>NAV:</strong> ₹612.45</div>
                <div><strong>Invested:</strong> ₹2,50,000</div>
                <div><strong>Current:</strong> ₹3,36,789</div>
                <div className="text-green-600 font-bold"><strong>Returns:</strong> +34.7%</div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-3">
              <h3 className="font-bold text-base mb-2 text-blue-600">Mirae Asset Large Cap Fund - Direct</h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div><strong>Type:</strong> Lumpsum</div>
                <div><strong>Units:</strong> 2,156.78</div>
                <div><strong>NAV:</strong> ₹298.67</div>
                <div><strong>Invested:</strong> ₹5,00,000</div>
                <div><strong>Current:</strong> ₹6,44,234</div>
                <div className="text-green-600 font-bold"><strong>Returns:</strong> +28.8%</div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-3">
              <h3 className="font-bold text-base mb-2 text-blue-600">SBI Blue Chip Fund - Direct Growth</h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div><strong>Type:</strong> SIP</div>
                <div><strong>Units:</strong> 934.12</div>
                <div><strong>NAV:</strong> ₹445.89</div>
                <div><strong>Invested:</strong> ₹3,00,000</div>
                <div><strong>Current:</strong> ₹4,16,567</div>
                <div className="text-green-600 font-bold"><strong>Returns:</strong> +38.9%</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-center text-muted-foreground pt-4 border-t border-border">
            <p>SIP Brewery © 2024 | AMFI ARN-XXXXX | BSE Member | Page 2 of 3</p>
            <p className="mt-1">All amounts in ₹. Returns calculated on current NAV.</p>
          </div>
        </div>

        {/* PAGE 3+ - Analysis & Recommendations (Always starts on new page) */}
        <div className="pdf-page bg-card shadow-xl rounded-xl border p-8" style={{ minHeight: 'auto' }}>
          {/* Header */}
          <div className="text-center mb-6 flex items-center justify-center gap-3">
            <h1 className="text-2xl font-bold text-primary">SIP Brewery</h1>
            <div className="bg-primary/10 p-2 rounded-lg">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-primary">💡 Investment Analysis & Recommendations</h2>
            <hr className="my-4 border-border" />
          </div>

          <div className="space-y-4 flex-1">
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg mb-2">💡 Portfolio Analysis Summary</h3>
              <div className="space-y-1 text-sm">
                <div><strong>Asset Allocation:</strong> Large Cap (45%), Mid Cap (25%), Small Cap (20%), Flexi Cap (10%)</div>
                <div><strong>Risk Level:</strong> Moderate to High</div>
                <div><strong>Diversification:</strong> Well-balanced across market capitalizations</div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-3">🎯 Investment Goals & Progress</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Current Progress:</strong> You're on track to achieve your financial goals with consistent SIP investments.</div>
                <div><strong>Next Steps:</strong> Consider increasing SIP amount by 10% annually to combat inflation.</div>
                <div><strong>Tax Planning:</strong> Review ELSS funds for Section 80C benefits in the next financial year.</div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-3">⚡ Performance Highlights</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Portfolio Performance:</strong> Your XIRR of {xirr.toFixed(2)}% significantly outperforms market average.</div>
                <div><strong>Consistency:</strong> Regular SIP investments have resulted in excellent rupee-cost averaging.</div>
                <div><strong>Growth Trajectory:</strong> Portfolio shows strong upward momentum with balanced risk.</div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg mb-3">⚠️ Risk Management</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Volatility Assessment:</strong> Your portfolio shows healthy volatility with strong upside potential.</div>
                <div><strong>Rebalancing:</strong> Consider rebalancing quarterly to maintain optimal asset allocation.</div>
                <div><strong>Emergency Fund:</strong> Ensure you have 6-12 months of expenses in liquid funds.</div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-bold text-lg mb-3">🚀 Future Opportunities</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Market Outlook:</strong> Current market conditions favor continued SIP investments.</div>
                <div><strong>New Categories:</strong> Consider exposure to international funds and sector-specific ETFs.</div>
                <div><strong>Long-term Vision:</strong> Your disciplined approach will compound significantly over time.</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-center text-muted-foreground mt-auto pt-6 border-t border-border">
            <p>SIP Brewery © 2024 | AMFI ARN-XXXXX | BSE Member | Page 3 of 3</p>
            <p className="mt-1">This report is for informational purposes only. Not financial advice. Please consult your financial advisor.</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
        <button
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          onClick={downloadPDF}
        >
          Download Beautiful PDF Statement
        </button>
      </div>
    </div>
  );
};

export default StatementPDF;