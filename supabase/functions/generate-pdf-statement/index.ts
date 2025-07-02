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
    const { statementUrl, fileName = 'statement.pdf' } = await req.json();

    if (!statementUrl) {
      return new Response(
        JSON.stringify({ error: 'Statement URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating PDF from URL:', statementUrl);

    // Use a more reliable HTML-to-PDF service approach
    // Since Puppeteer in Deno Edge Functions can be unreliable,
    // we'll use a simpler approach with built-in browser capabilities
    
    const htmlContent = await fetch(statementUrl).then(res => res.text());
    
    if (!htmlContent) {
      throw new Error('Could not fetch HTML content from statement URL');
    }

    // Create a complete HTML document that's optimized for PDF generation
    const pdfOptimizedHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIP Brewery Statement</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.4;
            color: #333;
            margin: 0;
            padding: 0;
            background: white;
        }
        .page-break {
            page-break-before: always;
        }
        @media print {
            .no-print { display: none !important; }
            .page-break { page-break-before: always; }
        }
    </style>
</head>
<body>
    ${htmlContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')}
</body>
</html>`;

    // For now, return a fallback response suggesting browser print
    // In production, you would integrate with a PDF generation service
    // like PDFShift, DocRaptor, or similar
    
    return new Response(
      JSON.stringify({ 
        error: 'PDF generation via Puppeteer not available in this environment',
        fallback: 'Please use browser print-to-PDF feature',
        statementUrl: statementUrl,
        suggestion: 'Open the statement preview and use Ctrl+P (Cmd+P) → Save as PDF'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('PDF generation error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'PDF generation failed',
        message: error.message,
        suggestion: 'Try using browser print-to-PDF as fallback'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});