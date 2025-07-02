import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { reportType, clientCode, category, reportName, format = 'pdf' } = await req.json();
    
    console.log('PDF Shift generation request:', { reportType, clientCode, category, reportName });
    
    // Get the PDF Shift API key and validate it
    const pdfShiftApiKey = Deno.env.get('PDFSHIFT_API_KEY');
    if (!pdfShiftApiKey) {
      console.error('PDF Shift API key not found in environment');
      throw new Error('PDF Shift API key not configured');
    }
    console.log('PDF Shift API key found:', pdfShiftApiKey.substring(0, 8) + '...');

    // Debug: log the request to understand what's happening
    console.log('PDF Shift request:', { reportType, clientCode, category, reportName });

    // Create comprehensive HTML content for better PDF generation
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${category.toUpperCase()} Statement - ${reportName}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                background: white;
                padding: 20px;
                min-height: 100vh;
            }
            .header { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; 
                padding: 30px; 
                border-radius: 10px; 
                margin-bottom: 30px; 
                text-align: center;
            }
            .header h1 { font-size: 28px; margin-bottom: 10px; font-weight: 600; }
            .header p { font-size: 16px; opacity: 0.9; margin: 5px 0; }
            .content { 
                padding: 30px; 
                background: #f8f9fa; 
                border-radius: 10px; 
                margin-bottom: 30px;
                min-height: 400px;
            }
            .content h2 { 
                color: #2d3748; 
                font-size: 24px; 
                margin-bottom: 20px; 
                border-bottom: 2px solid #667eea;
                padding-bottom: 10px;
            }
            .content p { font-size: 16px; margin-bottom: 15px; }
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 20px 0;
            }
            .stat-card {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                text-align: center;
            }
            .stat-value { font-size: 24px; font-weight: bold; color: #667eea; }
            .stat-label { font-size: 14px; color: #666; margin-top: 5px; }
            .footer { 
                text-align: center; 
                margin-top: 40px; 
                padding: 20px;
                border-top: 1px solid #e2e8f0;
                font-size: 12px; 
                color: #666; 
            }
            .disclaimer {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                font-size: 12px;
            }
            @media print {
                body { margin: 0; padding: 20px; }
                .header { break-inside: avoid; }
                .content { break-inside: avoid; }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>SIP Brewery - ${category.toUpperCase()} Statement</h1>
            <p><strong>Report:</strong> ${reportName}</p>
            <p><strong>Client Code:</strong> ${clientCode}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}</p>
        </div>
        
        <div class="content">
            <h2>${category.charAt(0).toUpperCase() + category.slice(1)} Portfolio Summary</h2>
            <p>This comprehensive ${category} report provides detailed insights into your investment portfolio performance and analysis.</p>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">₹2,45,000</div>
                    <div class="stat-label">Total Investment</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">₹2,89,500</div>
                    <div class="stat-label">Current Value</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">+18.16%</div>
                    <div class="stat-label">Total Returns</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">15.2%</div>
                    <div class="stat-label">Annualized Return</div>
                </div>
            </div>
            
            <h3 style="margin: 30px 0 15px 0; color: #2d3748;">Key Highlights:</h3>
            <ul style="margin-left: 20px; line-height: 1.8;">
                <li>Portfolio performance exceeds benchmark by 3.2%</li>
                <li>Well-diversified across ${category === 'equity' ? 'multiple sectors' : 'asset classes'}</li>
                <li>Consistent SIP investments showing rupee cost averaging benefits</li>
                <li>Risk-adjusted returns within acceptable parameters</li>
            </ul>
            
            <div class="disclaimer">
                <strong>Disclaimer:</strong> This is a sample ${category} report generated for demonstration purposes. 
                Actual investment values and returns may vary. Past performance does not guarantee future results.
            </div>
        </div>
        
        <div class="footer">
            <p><strong>SIP Brewery</strong> - Professional Investment Platform</p>
            <p>Generated on ${new Date().toISOString().split('T')[0]} at ${new Date().toLocaleTimeString('en-IN')}</p>
            <p>For support, contact: support@sipbrewery.com | +91-XXXX-XXXXXX</p>
        </div>
    </body>
    </html>
    `;
    
    console.log('Using HTML content for PDF generation');

    // PDF Shift configuration with correct API options
    const pdfShiftOptions = {
      source: htmlContent,
      format: 'A4',
      margin: '15mm',
      landscape: false,
      timeout: 30, // Maximum allowed timeout is 30 seconds
      delay: 3000  // Wait 3 seconds for content to fully load (in milliseconds)
    };

    console.log('Calling PDF Shift API with options:', JSON.stringify(pdfShiftOptions, null, 2));
    
    // Make request to PDF Shift API with correct authentication
    const pdfShiftResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'X-API-Key': pdfShiftApiKey,  // Correct authentication method
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pdfShiftOptions),
    });

    console.log('PDF Shift response status:', pdfShiftResponse.status);
    console.log('PDF Shift response headers:', Object.fromEntries(pdfShiftResponse.headers.entries()));

    if (!pdfShiftResponse.ok) {
      const errorText = await pdfShiftResponse.text();
      console.error('PDF Shift API error:', pdfShiftResponse.status, errorText);
      throw new Error(`PDF generation failed: ${pdfShiftResponse.status} - ${errorText}`);
    }

    // Get the PDF as binary data
    const pdfArrayBuffer = await pdfShiftResponse.arrayBuffer();
    const pdfBytes = new Uint8Array(pdfArrayBuffer);
    console.log('PDF generated successfully, size:', pdfBytes.length, 'bytes');

    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 10);
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    const filename = `${categoryName}_Statement_${clientCode}_${timestamp}.pdf`;

    // Return the PDF with proper headers
    return new Response(pdfBytes, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBytes.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error in PDF Shift generation:', error);
    
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