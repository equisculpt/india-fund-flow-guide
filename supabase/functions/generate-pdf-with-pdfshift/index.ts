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

    // Create minimal HTML with just logo and basic text
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test</title>
</head>
<body style="padding: 20px; font-family: Arial;">
    <img src="https://via.placeholder.com/200x100/2563eb/ffffff?text=SIP+BREWERY" alt="SIP Brewery Logo" style="display: block; margin: 0 auto 20px;">
    <h1 style="text-align: center; color: #2563eb;">SIP Brewery</h1>
    <p style="text-align: center;">Test PDF Document</p>
    <p style="text-align: center;">Generated: ${new Date().toLocaleString()}</p>
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