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

    // Test with a simple, guaranteed-working URL first
    const testMode = true; // Set to false once working
    
    let sourceUrl;
    if (testMode) {
      // Use a simple HTML string for testing
      sourceUrl = `<html><body><h1>Test PDF Report</h1><p>Category: ${category}</p><p>Report: ${reportName}</p><p>Client: ${clientCode}</p><p>Generated: ${new Date().toLocaleDateString()}</p></body></html>`;
    } else {
      // Use the actual report URL
      const baseUrl = 'https://fda643ee-be23-498f-9eb0-809d67236773.lovableproject.com';
      const params = new URLSearchParams({
        type: reportType,
        client: clientCode,
        category: category,
        reportName: reportName
      });
      sourceUrl = `${baseUrl}/statement-preview?${params.toString()}`;
    }
    
    console.log('PDF Source:', testMode ? 'HTML String' : sourceUrl);

    // Minimal PDF Shift configuration for testing
    const pdfShiftOptions = {
      source: sourceUrl,
      format: 'A4'
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