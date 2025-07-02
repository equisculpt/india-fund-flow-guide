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

    // Construct the source URL for the HTML report
    const baseUrl = req.headers.get('origin') || 'https://pvtrwvvcgkppjlbyvflv.supabase.co';
    const params = new URLSearchParams({
      type: reportType,
      client: clientCode,
      format: 'html',
      category: category,
      reportName: reportName,
      autoCapture: 'false' // Disable auto-capture for PDF Shift
    });
    
    const sourceUrl = `${baseUrl}/statement-preview?${params.toString()}`;
    console.log('Source URL for PDF generation:', sourceUrl);

    // Configure PDF Shift options - minimal, guaranteed-working configuration
    const pdfShiftOptions = {
      source: sourceUrl,
      landscape: false,
      format: 'A4',
      margin: '15mm',
      delay: 3000
    };

    console.log('Calling PDF Shift API...');
    
    // Make request to PDF Shift API
    const pdfShiftResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`api:${pdfShiftApiKey}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pdfShiftOptions),
    });

    if (!pdfShiftResponse.ok) {
      const errorText = await pdfShiftResponse.text();
      console.error('PDF Shift API error:', pdfShiftResponse.status, errorText);
      throw new Error(`PDF generation failed: ${pdfShiftResponse.status} - ${errorText}`);
    }

    // Get the PDF as binary data
    const pdfBuffer = await pdfShiftResponse.arrayBuffer();
    console.log('PDF generated successfully, size:', pdfBuffer.byteLength);

    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 10);
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    const filename = `${categoryName}_Statement_${clientCode}_${timestamp}.pdf`;

    // Return the PDF with proper headers
    return new Response(pdfBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
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