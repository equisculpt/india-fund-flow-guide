import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { htmlContent, fileName = 'statement.pdf' } = await req.json();

    if (!htmlContent) {
      return new Response(
        JSON.stringify({ error: 'HTML content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Converting HTML to PDF:', fileName);

    // Use PDFShift API for reliable HTML-to-PDF conversion
    // This is a professional service that handles all the complexity
    const pdfShiftResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa('api:' + (Deno.env.get('PDFSHIFT_API_KEY') || 'test_key')),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: htmlContent,
        format: 'A4',
        margin: '20mm',
        print_background: true,
        landscape: false,
        wait_for: 2000, // Wait 2 seconds for dynamic content
      }),
    });

    if (!pdfShiftResponse.ok) {
      // Fallback: Create a simple PDF placeholder
      console.log('PDFShift not available, creating fallback response');
      
      return new Response(
        JSON.stringify({ 
          error: 'Professional PDF generation service not configured',
          fallback: true,
          htmlContent: htmlContent.substring(0, 200) + '...',
          suggestion: 'Configure PDFShift API key for automatic PDF generation'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const pdfBuffer = await pdfShiftResponse.arrayBuffer();

    console.log('PDF generated successfully, size:', pdfBuffer.byteLength);

    return new Response(pdfBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'PDF generation failed',
        message: error.message,
        suggestion: 'Configure professional PDF service for automatic generation'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});