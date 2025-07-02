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
    
    // Get the PDF Shift API key
    const pdfShiftApiKey = Deno.env.get('PDFSHIFT_API_KEY');
    if (!pdfShiftApiKey) {
      throw new Error('PDF Shift API key not configured');
    }

    // Debug: log the request to understand what's happening
    console.log('PDF Shift request:', { reportType, clientCode, category, reportName });
    
    // Get the PDF Shift API key and validate it
    const pdfShiftApiKey = Deno.env.get('PDFSHIFT_API_KEY');
    if (!pdfShiftApiKey) {
      console.error('PDF Shift API key not found in environment');
      throw new Error('PDF Shift API key not configured');
    }
    console.log('PDF Shift API key found:', pdfShiftApiKey.substring(0, 8) + '...');

    // Create simple test HTML instead of loading complex URL
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${category.toUpperCase()} Statement</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { padding: 20px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>SIP Brewery - ${category.toUpperCase()} Statement</h1>
            <p>Report: ${reportName}</p>
            <p>Client: ${clientCode}</p>
            <p>Generated: ${new Date().toLocaleDateString('en-IN')}</p>
        </div>
        <div class="content">
            <h2>Portfolio Summary</h2>
            <p>This is a test ${category} report generated using PDF Shift API.</p>
            <p>The integration is working successfully!</p>
        </div>
        <div class="footer">
            <p>SIP Brewery - Professional Investment Platform</p>
            <p>Generated on ${new Date().toISOString()}</p>
        </div>
    </body>
    </html>
    `;
    
    console.log('Using HTML content for PDF generation');

    // PDF Shift configuration with HTML content
    const pdfShiftOptions = {
      source: htmlContent,
      format: 'A4',
      margin: '15mm',
      landscape: false
    };

    console.log('Calling PDF Shift API with options:', JSON.stringify(pdfShiftOptions, null, 2));
    
    // Make request to PDF Shift API
    const pdfShiftResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`api:${pdfShiftApiKey}`)}`,
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