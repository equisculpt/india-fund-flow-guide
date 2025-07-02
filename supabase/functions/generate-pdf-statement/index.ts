import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

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

    // Launch Puppeteer to generate PDF
    const command = new Deno.Command('deno', {
      args: [
        'run',
        '--allow-net',
        '--allow-run',
        '--allow-read',
        '--allow-write',
        '--allow-env',
        'https://deno.land/x/puppeteer@16.2.0/mod.ts'
      ],
      stdin: 'piped',
      stdout: 'piped',
      stderr: 'piped',
    });

    const puppeteerScript = `
      import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });

      const page = await browser.newPage();
      
      // Set viewport for better rendering
      await page.setViewport({ width: 1200, height: 800 });
      
      // Navigate to the statement page
      await page.goto('${statementUrl}', { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Wait for any dynamic content to load
      await page.waitForTimeout(2000);

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { 
          top: '15mm', 
          bottom: '15mm', 
          left: '10mm', 
          right: '10mm' 
        },
        displayHeaderFooter: false,
        preferCSSPageSize: true,
      });

      await browser.close();

      // Write PDF to stdout as base64
      const base64 = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
      console.log(base64);
    `;

    const process = command.spawn();
    
    // Write the Puppeteer script to stdin
    const writer = process.stdin.getWriter();
    await writer.write(new TextEncoder().encode(puppeteerScript));
    await writer.close();

    const { code, stdout, stderr } = await process.output();

    if (code !== 0) {
      const error = new TextDecoder().decode(stderr);
      console.error('Puppeteer error:', error);
      
      // Fallback: Return a simple HTML to PDF conversion notice
      return new Response(
        JSON.stringify({ 
          error: 'PDF generation temporarily unavailable',
          fallback: 'Please use browser print-to-PDF feature',
          details: error 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the base64 PDF from stdout
    const base64PDF = new TextDecoder().decode(stdout).trim();
    
    if (!base64PDF) {
      throw new Error('No PDF data received from Puppeteer');
    }

    // Convert base64 back to binary
    const pdfData = Uint8Array.from(atob(base64PDF), c => c.charCodeAt(0));

    console.log('PDF generated successfully, size:', pdfData.length);

    return new Response(pdfData, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': pdfData.length.toString(),
      },
    });

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