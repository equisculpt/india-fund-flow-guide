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

    // Create simple, reliable HTML content that will definitely render
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${category.toUpperCase()} Statement - ${reportName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            padding: 20px;
            font-size: 14px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
        }
        
        .header {
            background: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 14px;
            margin: 5px 0;
        }
        
        .content {
            padding: 20px;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            margin-bottom: 30px;
        }
        
        .content h2 {
            color: #1f2937;
            font-size: 20px;
            margin-bottom: 15px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 5px;
        }
        
        .content p {
            margin-bottom: 15px;
            font-size: 14px;
        }
        
        .stats {
            display: table;
            width: 100%;
            margin: 20px 0;
        }
        
        .stat-row {
            display: table-row;
        }
        
        .stat-cell {
            display: table-cell;
            padding: 10px;
            border: 1px solid #d1d5db;
            background: white;
            text-align: center;
        }
        
        .stat-label {
            font-weight: bold;
            color: #374151;
        }
        
        .stat-value {
            font-size: 18px;
            color: #2563eb;
            font-weight: bold;
        }
        
        .highlights {
            margin: 20px 0;
        }
        
        .highlights ul {
            margin-left: 20px;
        }
        
        .highlights li {
            margin-bottom: 8px;
        }
        
        .disclaimer {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            font-size: 12px;
            border-radius: 4px;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 15px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
        }
        
        @media print {
            body { margin: 0; }
            .container { max-width: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>SIP Brewery - ${category.charAt(0).toUpperCase() + category.slice(1)} Statement</h1>
            <p><strong>Report:</strong> ${reportName}</p>
            <p><strong>Client Code:</strong> ${clientCode}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
        </div>
        
        <div class="content">
            <h2>${category.charAt(0).toUpperCase() + category.slice(1)} Portfolio Summary</h2>
            <p>This comprehensive ${category} report provides detailed insights into your investment portfolio performance and analysis.</p>
            
            <div class="stats">
                <div class="stat-row">
                    <div class="stat-cell">
                        <div class="stat-label">Total Investment</div>
                        <div class="stat-value">₹2,45,000</div>
                    </div>
                    <div class="stat-cell">
                        <div class="stat-label">Current Value</div>
                        <div class="stat-value">₹2,89,500</div>
                    </div>
                </div>
                <div class="stat-row">
                    <div class="stat-cell">
                        <div class="stat-label">Total Returns</div>
                        <div class="stat-value">+18.16%</div>
                    </div>
                    <div class="stat-cell">
                        <div class="stat-label">Annualized Return</div>
                        <div class="stat-value">15.2%</div>
                    </div>
                </div>
            </div>
            
            <div class="highlights">
                <h3 style="margin-bottom: 10px; color: #1f2937;">Key Highlights:</h3>
                <ul>
                    <li>Portfolio performance exceeds benchmark by 3.2%</li>
                    <li>Well-diversified across multiple asset classes</li>
                    <li>Consistent SIP investments showing rupee cost averaging benefits</li>
                    <li>Risk-adjusted returns within acceptable parameters</li>
                </ul>
            </div>
            
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
    </div>
</body>
</html>`;
    
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