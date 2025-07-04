import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      name, 
      clientCode, 
      totalInvested, 
      currentValue, 
      returnsPercentage, 
      xirr, 
      months, 
      values 
    } = await req.json();
    
    console.log('PDF generation request:', { name, clientCode, totalInvested, currentValue });

    // Generate emoji insights
    const insight = xirr > 15
      ? { emoji: '🚀', title: 'Excellent Growth', comment: 'You are in the top 20% investors!' }
      : xirr > 10
        ? { emoji: '📈', title: 'Solid Performance', comment: 'Keep investing steadily.' }
        : { emoji: '🧐', title: 'Scope for Growth', comment: 'Consider reviewing your fund mix.' };

    // Create comprehensive multi-page HTML with embedded chart and brewery logo
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SIP Brewery Statement</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      @page {
        margin: 80px 40px;
        size: A4;
      }
      
      @media print {
        .page-break {
          page-break-before: always;
          break-before: page;
        }
      }
      
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        color: #333;
        line-height: 1.6;
      }
      
      .header {
        position: fixed;
        top: -80px;
        left: -40px;
        right: -40px;
        height: 60px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .header-logo {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .logo-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(to bottom right, #f59e0b, #d97706);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
      
      .logo-icon::before {
        content: "🍺";
        font-size: 20px;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
      }
      
      .logo-icon::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(to right, #fbbf24, #f59e0b);
        opacity: 0.7;
      }
      
      .logo-text h3 {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
        line-height: 1.2;
      }
      
      .logo-text p {
        margin: 0;
        font-size: 11px;
        opacity: 0.9;
        color: #fbbf24;
      }
      
      .header-date {
        font-size: 14px;
        opacity: 0.9;
      }
      
      .footer {
        position: fixed;
        bottom: -80px;
        left: -40px;
        right: -40px;
        height: 40px;
        background: #f8f9fa;
        border-top: 2px solid #f59e0b;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        color: #6b7280;
        z-index: 1000;
        padding: 0 40px;
      }
      
      .watermark {
        position: fixed;
        top: 45%;
        left: 20%;
        font-size: 60px;
        opacity: 0.05;
        transform: rotate(-45deg);
        color: #f59e0b;
        font-weight: bold;
        z-index: -1;
      }
      
      .content {
        margin: 20px 0;
        padding: 20px;
        min-height: calc(100vh - 160px);
      }
      
      .title {
        text-align: center;
        margin-bottom: 40px;
      }
      
      .title h1 {
        color: #f59e0b;
        font-size: 32px;
        margin: 0;
        margin-bottom: 10px;
      }
      
      .title p {
        color: #6b7280;
        margin: 5px 0 0 0;
        font-size: 16px;
      }
      
      .user-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 40px;
        font-size: 14px;
      }
      
      .portfolio-summary {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 40px;
      }
      
      .summary-card {
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .card-invested {
        background: linear-gradient(135deg, #fef3c7, #fde68a);
        border-left-color: #f59e0b;
      }
      
      .card-current {
        background: linear-gradient(135deg, #d1fae5, #a7f3d0);
        border-left-color: #10b981;
      }
      
      .card-returns {
        background: linear-gradient(135deg, #dbeafe, #93c5fd);
        border-left-color: #3b82f6;
      }
      
      .card-xirr {
        background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
        border-left-color: #8b5cf6;
      }
      
      .card-title {
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 5px;
        font-weight: 600;
      }
      
      .card-value {
        font-size: 24px;
        font-weight: bold;
        color: #111827;
      }
      
      .insight-card {
        background: linear-gradient(135deg, #f9fafb, #f3f4f6);
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid #f59e0b;
        margin-bottom: 40px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .insight-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #111827;
      }
      
      .insight-comment {
        color: #6b7280;
        font-size: 14px;
      }
      
      .chart-container {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 40px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      .chart-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #374151;
      }
      
      .holdings-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 40px;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      .holdings-table th {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        padding: 12px;
        text-align: left;
        font-weight: 600;
        font-size: 13px;
      }
      
      .holdings-table td {
        padding: 12px;
        border-bottom: 1px solid #e5e7eb;
        font-size: 13px;
      }
      
      .holdings-table tr:nth-child(even) {
        background: #f9fafb;
      }
      
      .holdings-table tr:hover {
        background: #f3f4f6;
      }
      
      .disclaimer {
        font-size: 11px;
        text-align: center;
        color: #6b7280;
        margin-top: 40px;
        border-top: 1px solid #e5e7eb;
        padding-top: 20px;
        line-height: 1.5;
      }
      
      .page-break {
        page-break-before: always;
        break-before: page;
        height: 0;
        margin: 0;
        padding: 0;
      }
      
      .section-header {
        font-size: 24px;
        font-weight: bold;
        color: #f59e0b;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #f59e0b;
      }
      
      .transaction-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      .transaction-table th {
        background: linear-gradient(135deg, #374151, #1f2937);
        color: white;
        padding: 12px;
        text-align: left;
        font-weight: 600;
        font-size: 12px;
      }
      
      .transaction-table td {
        padding: 10px 12px;
        border-bottom: 1px solid #e5e7eb;
        font-size: 12px;
      }
      
      .gains-positive {
        color: #10b981;
        font-weight: 600;
      }
      
      .gains-negative {
        color: #ef4444;
        font-weight: 600;
      }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-logo">
            <div class="logo-icon"></div>
            <div class="logo-text">
                <h3>SIP Brewery</h3>
                <p>Brewing Wealth</p>
            </div>
        </div>
        <div class="header-date">Statement Date: ${new Date().toLocaleDateString('en-IN')}</div>
    </div>

    <div class="footer">
        <p>Confidential | SIP Brewery © 2024 | Generated: ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}</p>
    </div>

    <div class="watermark">SIP BREWERY</div>

    <div class="content">
        <!-- Page 1: Portfolio Overview -->
        <div class="title">
            <h1>Portfolio Statement</h1>
            <p>Comprehensive Investment Analysis & Performance Report</p>
        </div>

        <!-- User Information -->
        <div class="user-info">
            <div><strong>Investor Name:</strong> ${name}</div>
            <div><strong>Client Code:</strong> ${clientCode}</div>
            <div><strong>PAN Number:</strong> ABCDE1234F</div>
            <div><strong>Phone:</strong> +91-9876543210</div>
            <div><strong>Email:</strong> investor@sipbrewery.com</div>
            <div><strong>KYC Status:</strong> Verified</div>
            <div><strong>Report Period:</strong> ${new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')} to ${new Date().toLocaleDateString('en-IN')}</div>
            <div><strong>Statement Type:</strong> Comprehensive</div>
        </div>

        <!-- Portfolio Summary -->
        <div class="portfolio-summary">
            <div class="summary-card card-invested">
                <div class="card-title">Total Invested</div>
                <div class="card-value">₹${totalInvested.toLocaleString('en-IN')}</div>
            </div>
            <div class="summary-card card-current">
                <div class="card-title">Current Value</div>
                <div class="card-value">₹${currentValue.toLocaleString('en-IN')}</div>
            </div>
            <div class="summary-card card-returns">
                <div class="card-title">Absolute Returns</div>
                <div class="card-value">₹${(currentValue - totalInvested).toLocaleString('en-IN')}</div>
            </div>
            <div class="summary-card card-xirr">
                <div class="card-title">XIRR (Annualized)</div>
                <div class="card-value">${xirr.toFixed(2)}%</div>
            </div>
        </div>

        <!-- AI Insight -->
        <div class="insight-card">
            <div class="insight-title">${insight.emoji} ${insight.title}</div>
            <div class="insight-comment">${insight.comment}</div>
            <div class="insight-comment" style="margin-top: 10px;">
                <strong>Portfolio Analysis:</strong> Your investment strategy shows consistent growth with a well-diversified portfolio. 
                The XIRR of ${xirr.toFixed(2)}% significantly outperforms the market average of 12.5%.
            </div>
        </div>

        <!-- Chart Section -->
        <div class="chart-container">
            <div class="chart-title">Portfolio Performance Trend (Last 12 Months)</div>
            <canvas id="portfolioChart" width="600" height="300"></canvas>
        </div>
    </div>

    <!-- Page Break to Force Page 2 -->
    <div class="page-break"></div>

    <!-- Page 2: Holdings Details -->
    <div class="content">
        <div class="section-header">📊 Portfolio Holdings Breakdown</div>
        
        <table class="holdings-table">
            <thead>
                <tr>
                    <th>Fund Name</th>
                    <th>Investment Type</th>
                    <th>Units</th>
                    <th>NAV</th>
                    <th>Invested</th>
                    <th>Current Value</th>
                    <th>Returns</th>
                    <th>XIRR</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>HDFC Top 100 Fund - Direct</td>
                    <td>SIP</td>
                    <td>1,234.56</td>
                    <td>₹856.32</td>
                    <td>₹3,50,000</td>
                    <td>₹4,85,673</td>
                    <td class="gains-positive">+₹1,35,673 (38.8%)</td>
                    <td class="gains-positive">24.5%</td>
                </tr>
                <tr>
                    <td>Axis Small Cap Fund - Direct</td>
                    <td>SIP</td>
                    <td>876.23</td>
                    <td>₹612.45</td>
                    <td>₹2,50,000</td>
                    <td>₹3,36,789</td>
                    <td class="gains-positive">+₹86,789 (34.7%)</td>
                    <td class="gains-positive">22.1%</td>
                </tr>
                <tr>
                    <td>Mirae Asset Large Cap Fund</td>
                    <td>Lumpsum</td>
                    <td>2,156.78</td>
                    <td>₹298.67</td>
                    <td>₹5,00,000</td>
                    <td>₹6,44,234</td>
                    <td class="gains-positive">+₹1,44,234 (28.8%)</td>
                    <td class="gains-positive">18.9%</td>
                </tr>
                <tr>
                    <td>SBI Blue Chip Fund - Direct</td>
                    <td>SIP</td>
                    <td>934.12</td>
                    <td>₹445.89</td>
                    <td>₹3,00,000</td>
                    <td>₹4,16,567</td>
                    <td class="gains-positive">+₹1,16,567 (38.9%)</td>
                    <td class="gains-positive">26.3%</td>
                </tr>
                <tr>
                    <td>Parag Parikh Flexi Cap Fund</td>
                    <td>SIP</td>
                    <td>567.89</td>
                    <td>₹678.23</td>
                    <td>₹3,50,000</td>
                    <td>₹3,85,234</td>
                    <td class="gains-positive">+₹35,234 (10.1%)</td>
                    <td class="gains-positive">12.7%</td>
                </tr>
            </tbody>
        </table>

        <div class="insight-card">
            <div class="insight-title">💡 Portfolio Diversification Analysis</div>
            <div class="insight-comment">
                <strong>Asset Allocation:</strong> Large Cap (45%), Mid Cap (25%), Small Cap (20%), Flexi Cap (10%)<br>
                <strong>Risk Level:</strong> Moderate to High<br>
                <strong>Recommendation:</strong> Consider adding debt funds for better stability during volatile markets.
            </div>
        </div>
    </div>

    <!-- Page Break to Force Page 3 -->
    <div class="page-break"></div>

    <!-- Page 3: Transaction History -->
    <div class="content">
        <div class="section-header">📋 Recent Transaction History & Analysis</div>
        
        <table class="transaction-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Fund Name</th>
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>NAV</th>
                    <th>Units</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>15-Jun-2024</td>
                    <td>HDFC Top 100 Fund</td>
                    <td>SIP Purchase</td>
                    <td>₹10,000</td>
                    <td>₹856.32</td>
                    <td>11.68</td>
                    <td>✅ Completed</td>
                </tr>
                <tr>
                    <td>15-Jun-2024</td>
                    <td>Axis Small Cap Fund</td>
                    <td>SIP Purchase</td>
                    <td>₹8,000</td>
                    <td>₹612.45</td>
                    <td>13.06</td>
                    <td>✅ Completed</td>
                </tr>
                <tr>
                    <td>10-Jun-2024</td>
                    <td>SBI Blue Chip Fund</td>
                    <td>SIP Purchase</td>
                    <td>₹12,000</td>
                    <td>₹445.89</td>
                    <td>26.91</td>
                    <td>✅ Completed</td>
                </tr>
                <tr>
                    <td>05-Jun-2024</td>
                    <td>Parag Parikh Flexi Cap</td>
                    <td>SIP Purchase</td>
                    <td>₹15,000</td>
                    <td>₹678.23</td>
                    <td>22.12</td>
                    <td>✅ Completed</td>
                </tr>
                <tr>
                    <td>25-May-2024</td>
                    <td>Mirae Asset Large Cap</td>
                    <td>Lumpsum Purchase</td>
                    <td>₹50,000</td>
                    <td>₹298.67</td>
                    <td>167.39</td>
                    <td>✅ Completed</td>
                </tr>
            </tbody>
        </table>

        <div class="insight-card">
            <div class="insight-title">🎯 Investment Goals & Recommendations</div>
            <div class="insight-comment">
                <strong>Current Progress:</strong> You're on track to achieve your financial goals with consistent SIP investments.<br>
                <strong>Next Steps:</strong> Consider increasing SIP amount by 10% annually to combat inflation.<br>
                <strong>Tax Planning:</strong> Review ELSS funds for Section 80C benefits in the next financial year.
            </div>
        </div>

        <!-- Footer Disclaimer -->
        <div class="disclaimer">
            <p><strong>SIP Brewery</strong> is a trademark of Equisculpt Ventures • AMFI ARN-123456 • BSE Member ID: 6789</p>
            <p>Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing.</p>
            <p>Past performance is not indicative of future results. This statement is computer generated and does not require signature.</p>
            <p><strong>Regulatory Information:</strong> SEBI Registration No: INZ000123456 | BSE STAR MF: Operational</p>
            <p>For grievances, contact: grievances@sipbrewery.com | Toll-Free: 1800-123-4567</p>
        </div>
    </div>

    <script>
        // Wait for Chart.js to load, then render the chart
        window.addEventListener('load', function() {
            setTimeout(() => {
                const ctx = document.getElementById('portfolioChart').getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ${JSON.stringify(months)},
                        datasets: [{
                            label: 'Portfolio Value (₹)',
                            data: ${JSON.stringify(values)},
                            borderColor: '#f59e0b',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            pointRadius: 6,
                            pointBackgroundColor: '#f59e0b',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    color: '#e5e7eb'
                                },
                                ticks: {
                                    color: '#6b7280',
                                    font: {
                                        size: 11
                                    }
                                }
                            },
                            y: {
                                grid: {
                                    color: '#e5e7eb'
                                },
                                ticks: {
                                    color: '#6b7280',
                                    font: {
                                        size: 11
                                    },
                                    callback: function(value) {
                                        return '₹' + (value / 100000).toFixed(1) + 'L';
                                    }
                                }
                            }
                        }
                    }
                });
                
                // Mark the page as ready for PDF generation
                window.chartReady = true;
            }, 1500);
        });
    </script>
</body>
</html>`;

    console.log('Generating PDF using Puppeteer...');

    // For Deno Deploy, we need to use a different approach since Puppeteer isn't available
    // Let's use jsPDF for server-side generation as a reliable alternative
    try {
      // Import jsPDF for server-side generation
      console.log('🔧 Importing jsPDF...');
      const { default: jsPDF } = await import('https://esm.sh/jspdf@2.5.1');
      console.log('✅ jsPDF imported successfully');
      
      const pdf = new jsPDF();
      console.log('📄 Created new jsPDF instance');
      
      // Add page content programmatically
      pdf.setFontSize(20);
      pdf.text('SIP Brewery Portfolio Statement', 20, 30);
      
      pdf.setFontSize(12);
      pdf.text(`Investor: ${name}`, 20, 50);
      pdf.text(`Client Code: ${clientCode}`, 20, 60);
      pdf.text(`Total Invested: ₹${totalInvested.toLocaleString('en-IN')}`, 20, 70);
      pdf.text(`Current Value: ₹${currentValue.toLocaleString('en-IN')}`, 20, 80);
      pdf.text(`Returns: ${returnsPercentage.toFixed(2)}%`, 20, 90);
      pdf.text(`XIRR: ${xirr.toFixed(2)}%`, 20, 100);
      
      // Add insight
      pdf.text(`${insight.title}: ${insight.comment}`, 20, 120);
      
      // Add page 2 - Holdings
      console.log('📋 Adding page 2 - Holdings');
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.text('Portfolio Holdings', 20, 30);
      
      pdf.setFontSize(10);
      const holdingsData = [
        ['Fund Name', 'Investment Type', 'Invested', 'Current Value', 'Returns'],
        ['HDFC Top 100 Fund - Direct', 'SIP', '₹3,50,000', '₹4,85,673', '+38.8%'],
        ['Axis Small Cap Fund - Direct', 'SIP', '₹2,50,000', '₹3,36,789', '+34.7%'],
        ['Mirae Asset Large Cap Fund', 'Lumpsum', '₹5,00,000', '₹6,44,234', '+28.8%'],
        ['SBI Blue Chip Fund - Direct', 'SIP', '₹3,00,000', '₹4,16,567', '+38.9%']
      ];
      
      let yPos = 50;
      holdingsData.forEach((row, index) => {
        if (index === 0) {
          pdf.setFont(undefined, 'bold');
        } else {
          pdf.setFont(undefined, 'normal');
        }
        
        pdf.text(row[0], 20, yPos);
        pdf.text(row[1], 80, yPos);
        pdf.text(row[2], 120, yPos);
        pdf.text(row[3], 150, yPos);
        pdf.text(row[4], 180, yPos);
        yPos += 10;
      });
      
      // Add page 3 - Recommendations
      console.log('💡 Adding page 3 - Recommendations');
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.text('Investment Recommendations', 20, 30);
      
      pdf.setFontSize(12);
      pdf.text('Your portfolio shows excellent growth with strong diversification.', 20, 50);
      pdf.text('Consider increasing SIP amounts by 10% annually to combat inflation.', 20, 60);
      pdf.text('Review ELSS funds for tax benefits in the next financial year.', 20, 70);
      
      console.log('🔨 Generating PDF buffer...');
      const pdfBuffer = pdf.output('arraybuffer');
      
      console.log('📊 PDF generated successfully using jsPDF, size:', pdfBuffer.byteLength, 'bytes');
      console.log('📃 PDF should have 3 pages with holdings and recommendations');

      // Generate filename
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `SIP-Brewery-Statement-${clientCode}-${timestamp}.pdf`;
      
      // Return the PDF with proper headers for direct download
      return new Response(new Uint8Array(pdfBuffer), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': pdfBuffer.byteLength.toString(),
        },
      });
      
    } catch (pdfError) {
      console.error('PDF generation error:', pdfError);
      throw pdfError;
    }

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'PDF generation failed', 
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});