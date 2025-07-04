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
      
      // Use html2canvas to capture the beautiful styled content
      const canvas = await html2canvas(captureRef.current, { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: captureRef.current.scrollWidth,
        height: captureRef.current.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/png');

      // Create PDF with proper sizing
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // If content is too long, split into multiple pages
      const pageHeight = 297; // A4 height in mm
      let position = 0;
      
      while (position < pdfHeight) {
        if (position > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(
          imgData, 
          'PNG', 
          0, 
          -position, 
          pdfWidth, 
          pdfHeight
        );
        
        position += pageHeight;
      }

      pdf.save(`SIP-Brewery-Statement-${clientCode}-${new Date().toISOString().slice(0, 10)}.pdf`);
      console.log('✅ Beautiful PDF downloaded successfully');
      
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
      <div ref={captureRef} className="bg-card shadow-xl rounded-xl max-w-3xl mx-auto border">
        
        {/* PAGE 1 - Overview */}
        <div className="p-8 min-h-[1000px] page-break-after">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">SIP Brewery 📄</h1>
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
          <div className="grid grid-cols-2 gap-6 mb-8">
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
          <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary mb-8">
            <h3 className="font-bold text-lg text-foreground">{insight.emoji} {insight.title}</h3>
            <p className="text-sm text-muted-foreground">{insight.comment}</p>
          </div>

          {/* Chart Section */}
          <div className="bg-card border rounded-xl shadow p-4 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Portfolio Trend (Last 6 Months)</h2>
            <canvas ref={chartRef} width="500" height="300" />
          </div>
        </div>

        {/* PAGE 2 - Holdings Details */}
        <div className="p-8 min-h-[1000px] page-break-after">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">📊 Portfolio Holdings Breakdown</h1>
            <hr className="my-4 border-border" />
          </div>

          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">HDFC Top 100 Fund - Direct Growth</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Investment Type:</strong> SIP</div>
                <div><strong>Units:</strong> 1,234.56</div>
                <div><strong>NAV:</strong> ₹856.32</div>
                <div><strong>Invested:</strong> ₹3,50,000</div>
                <div><strong>Current Value:</strong> ₹4,85,673</div>
                <div className="text-green-600 font-bold"><strong>Returns:</strong> +₹1,35,673 (38.8%)</div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Axis Small Cap Fund - Direct Growth</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Investment Type:</strong> SIP</div>
                <div><strong>Units:</strong> 876.23</div>
                <div><strong>NAV:</strong> ₹612.45</div>
                <div><strong>Invested:</strong> ₹2,50,000</div>
                <div><strong>Current Value:</strong> ₹3,36,789</div>
                <div className="text-green-600 font-bold"><strong>Returns:</strong> +₹86,789 (34.7%)</div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Mirae Asset Large Cap Fund - Direct</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Investment Type:</strong> Lumpsum</div>
                <div><strong>Units:</strong> 2,156.78</div>
                <div><strong>NAV:</strong> ₹298.67</div>
                <div><strong>Invested:</strong> ₹5,00,000</div>
                <div><strong>Current Value:</strong> ₹6,44,234</div>
                <div className="text-green-600 font-bold"><strong>Returns:</strong> +₹1,44,234 (28.8%)</div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">SBI Blue Chip Fund - Direct Growth</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Investment Type:</strong> SIP</div>
                <div><strong>Units:</strong> 934.12</div>
                <div><strong>NAV:</strong> ₹445.89</div>
                <div><strong>Invested:</strong> ₹3,00,000</div>
                <div><strong>Current Value:</strong> ₹4,16,567</div>
                <div className="text-green-600 font-bold"><strong>Returns:</strong> +₹1,16,567 (38.9%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 3 - Analysis & Recommendations */}
        <div className="p-8 min-h-[1000px]">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">💡 Investment Analysis & Recommendations</h1>
            <hr className="my-4 border-border" />
          </div>

          <div className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
              <h3 className="font-bold text-lg text-foreground mb-3">📈 Portfolio Diversification Analysis</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Asset Allocation:</strong> Large Cap (45%), Mid Cap (25%), Small Cap (20%), Flexi Cap (10%)</div>
                <div><strong>Risk Level:</strong> Moderate to High</div>
                <div><strong>Recommendation:</strong> Consider adding debt funds for better stability during volatile markets.</div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-3">🎯 Investment Goals & Progress</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Current Progress:</strong> You're on track to achieve your financial goals with consistent SIP investments.</div>
                <div><strong>Next Steps:</strong> Consider increasing SIP amount by 10% annually to combat inflation.</div>
                <div><strong>Tax Planning:</strong> Review ELSS funds for Section 80C benefits in the next financial year.</div>
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

            <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-3">🚀 Future Opportunities</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Market Outlook:</strong> Current market conditions favor continued SIP investments.</div>
                <div><strong>New Categories:</strong> Consider exposure to international funds and sector-specific ETFs.</div>
                <div><strong>Long-term Vision:</strong> Your disciplined approach will compound significantly over time.</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-center text-muted-foreground mt-12">
            <hr className="my-4 border-border" />
            <p>SIP Brewery is a trademark of Equisculpt Ventures • AMFI ARN-XXXXX • BSE Member</p>
            <p className="mt-1">This report is for informational purposes only. Not financial advice.</p>
            <p className="mt-1">Generated on: {new Date().toLocaleDateString('en-IN')} at {new Date().toLocaleTimeString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
        <button
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default StatementPDF;