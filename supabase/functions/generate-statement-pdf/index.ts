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

    // Create comprehensive HTML with embedded chart
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SIP Brewery Statement</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      @page {
        margin: 100px 50px;
        size: A4;
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
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        color: white;
        display: flex;
        align-items: center;
        padding: 0 40px;
        z-index: 1000;
      }
      
      .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: #f8f9fa;
        border-top: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #6b7280;
        z-index: 1000;
      }
      
      .watermark {
        position: fixed;
        top: 45%;
        left: 20%;
        font-size: 60px;
        opacity: 0.05;
        transform: rotate(-45deg);
        color: #2563eb;
        font-weight: bold;
        z-index: -1;
      }
      
      .content {
        margin: 100px 0;
        padding: 40px;
      }
      
      .title {
        text-align: center;
        margin-bottom: 40px;
      }
      
      .title h1 {
        color: #2563eb;
        font-size: 32px;
        margin: 0;
      }
      
      .title p {
        color: #6b7280;
        margin: 5px 0 0 0;
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
      }
      
      .card-invested {
        background: #fef3c7;
        border-left-color: #f59e0b;
      }
      
      .card-current {
        background: #d1fae5;
        border-left-color: #10b981;
      }
      
      .card-returns {
        background: #dbeafe;
        border-left-color: #3b82f6;
      }
      
      .card-xirr {
        background: #e0e7ff;
        border-left-color: #8b5cf6;
      }
      
      .card-title {
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 5px;
      }
      
      .card-value {
        font-size: 24px;
        font-weight: bold;
        color: #111827;
      }
      
      .insight-card {
        background: #f9fafb;
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid #2563eb;
        margin-bottom: 40px;
      }
      
      .insight-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
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
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .chart-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #374151;
      }
      
      .disclaimer {
        font-size: 11px;
        text-align: center;
        color: #6b7280;
        margin-top: 40px;
        border-top: 1px solid #e5e7eb;
        padding-top: 20px;
      }
      
      .page-break {
        page-break-after: always;
      }
    </style>
</head>
<body>
    <div class="header">
        <h3>📊 SIP Brewery - Investment Statement</h3>
    </div>

    <div class="footer">
        <p>Confidential | SIP Brewery © 2024 | Page 1 of 1</p>
    </div>

    <div class="watermark">SIP BREWERY</div>

    <div class="content">
        <!-- Title Section -->
        <div class="title">
            <h1>SIP Brewery 📄</h1>
            <p>Brewing Wealth, One SIP at a Time</p>
        </div>

        <!-- User Information -->
        <div class="user-info">
            <div><strong>Name:</strong> ${name}</div>
            <div><strong>Client Code:</strong> ${clientCode}</div>
            <div><strong>Report Date:</strong> ${new Date().toLocaleDateString('en-IN')}</div>
            <div><strong>Report Type:</strong> Portfolio Statement</div>
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
                <div class="card-title">Returns</div>
                <div class="card-value">${returnsPercentage.toFixed(2)}%</div>
            </div>
            <div class="summary-card card-xirr">
                <div class="card-title">XIRR</div>
                <div class="card-value">${xirr.toFixed(2)}%</div>
            </div>
        </div>

        <!-- AI Insight -->
        <div class="insight-card">
            <div class="insight-title">${insight.emoji} ${insight.title}</div>
            <div class="insight-comment">${insight.comment}</div>
        </div>

        <!-- Chart Section -->
        <div class="chart-container">
            <div class="chart-title">Portfolio Performance Trend (Last 6 Months)</div>
            <canvas id="portfolioChart" width="600" height="300"></canvas>
        </div>

        <!-- Disclaimer -->
        <div class="disclaimer">
            <p>SIP Brewery is a trademark of Equisculpt Ventures • AMFI ARN-XXXXX • BSE Member</p>
            <p>This report is for informational purposes only. Past performance does not guarantee future results.</p>
            <p>Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully.</p>
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
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            pointRadius: 5,
                            pointBackgroundColor: '#2563eb',
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
                                    color: '#6b7280'
                                }
                            },
                            y: {
                                grid: {
                                    color: '#e5e7eb'
                                },
                                ticks: {
                                    color: '#6b7280',
                                    callback: function(value) {
                                        return '₹' + value.toLocaleString('en-IN');
                                    }
                                }
                            }
                        }
                    }
                });
                
                // Mark the page as ready for PDF generation
                window.chartReady = true;
            }, 1000);
        });
    </script>
</body>
</html>`;

    console.log('Generating PDF using Puppeteer...');

    // Use Puppeteer via the browser API available in Deno Deploy
    const puppeteer = await import('https://deno.land/x/puppeteer@16.2.0/mod.ts');
    
    const browser = await puppeteer.default.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security'
      ]
    });

    const page = await browser.newPage();
    
    // Set content and wait for chart to render
    await page.setContent(htmlContent);
    
    // Wait for Chart.js to load and render
    await page.waitForFunction(() => window.chartReady === true, { timeout: 10000 });
    
    // Generate PDF with proper formatting
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '100px',
        bottom: '100px',
        left: '50px',
        right: '50px'
      },
      displayHeaderFooter: false // We handle headers/footers in HTML
    });

    await browser.close();

    console.log('PDF generated successfully, size:', pdfBuffer.length, 'bytes');

    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `SIP-Brewery-Statement-${clientCode}-${timestamp}.pdf`;

    // Return the PDF with proper headers for direct download
    return new Response(pdfBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

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