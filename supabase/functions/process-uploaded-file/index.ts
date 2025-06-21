
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { fileId, filePath } = await req.json()

    // Get file from storage
    const { data: fileData, error: downloadError } = await supabaseClient.storage
      .from('chat-uploads')
      .download(filePath)

    if (downloadError) {
      throw new Error(`Failed to download file: ${downloadError.message}`)
    }

    // Convert file to text (simplified extraction)
    const fileBuffer = await fileData.arrayBuffer()
    const fileText = await extractTextFromFile(fileBuffer, filePath)

    // Update database with extracted content
    const { error: updateError } = await supabaseClient
      .from('uploaded_files')
      .update({
        extracted_content: fileText,
        is_processed: true
      })
      .eq('id', fileId)

    if (updateError) {
      throw new Error(`Failed to update file: ${updateError.message}`)
    }

    return new Response(
      JSON.stringify({ success: true, extractedContent: fileText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('File processing error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to process file' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function extractTextFromFile(buffer: ArrayBuffer, filePath: string): Promise<string> {
  const fileName = filePath.toLowerCase()
  
  if (fileName.endsWith('.pdf')) {
    // For PDF files - in production, you'd use a proper PDF parser
    return `Extracted content from PDF file.\n\nThis is a simulated extraction. In production, this would contain the actual text from your PDF document including:\n\n- Document sections and headings\n- Paragraph content\n- Tables and data\n- Key insights and analysis\n\nThe content would be properly parsed and structured for blog creation and analysis.`
  } 
  
  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
    // For Excel files - in production, you'd use a proper Excel parser
    return `Extracted content from Excel file.\n\nThis is a simulated extraction. In production, this would contain:\n\n- Spreadsheet data and values\n- Chart information\n- Formulas and calculations\n- Data analysis and insights\n\nThe structured data would be converted to readable text for content creation.`
  }
  
  if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    // For Word documents - in production, you'd use a proper Word parser
    return `Extracted content from Word document.\n\nThis is a simulated extraction. In production, this would contain the actual document text including:\n\n- Formatted content\n- Headers and sections\n- Tables and lists\n- Embedded data and analysis\n\nAll formatting would be preserved and converted appropriately.`
  }
  
  // Default text extraction
  try {
    const decoder = new TextDecoder()
    return decoder.decode(buffer)
  } catch {
    return `Content extracted from uploaded file.\n\nFile format processed successfully. In production, this would contain the actual extracted text content from your document ready for analysis and blog creation.`
  }
}
