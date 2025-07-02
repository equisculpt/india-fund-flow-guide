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

    // Configure PDF Shift options for high-quality output
    const pdfShiftOptions = {
      source: sourceUrl,
      landscape: false,
      format: 'A4',
      margin: '15mm',
      zoom: 1.0,
      delay: 2000, // Wait 2 seconds for content to load
      footer: {
        height: '15mm',
        content: `
          <div style="font-size: 8px; color: #666; text-align: center; width: 100%; padding: 5px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>SIP Brewery - Confidential</span>
              <span>Page {{page}} of {{total}}</span>
              <span>Generated: ${new Date().toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        `
      },
      css: `
        @page {
          margin: 15mm 15mm 20mm 15mm;
        }
        
        /* Ensure proper page breaks */
        .page-break { 
          page-break-before: always !important; 
        }
        .avoid-break { 
          page-break-inside: avoid !important; 
        }
        .no-print { 
          display: none !important; 
        }
        
        /* Optimize for print */
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        /* Ensure tables don't break awkwardly */
        .holdings-table tr {
          page-break-inside: avoid !important;
        }
        
        /* Keep sections together */
        .section {
          page-break-inside: avoid !important;
        }
        
        .ai-insights {
          page-break-inside: avoid !important;
        }
        
        .metrics-grid {
          page-break-inside: avoid !important;
        }
      `,
      sandbox: false
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