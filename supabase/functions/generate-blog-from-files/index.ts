
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { extractedContent, requirements, fileNames } = await req.json()
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      console.error('Gemini API key not found in environment variables')
      console.log('Available env vars:', Object.keys(Deno.env.toObject()))
      throw new Error('Gemini API key not configured. Please add your Gemini API key to the edge function secrets as GEMINI_API_KEY.')
    }

    console.log('Gemini API Key configured:', geminiApiKey ? 'Yes' : 'No')
    console.log('Generating blog for files:', fileNames)

    const prompt = `
You are an expert financial blog writer specializing in investment analysis. Generate a comprehensive, engaging blog post based on the following:

EXTRACTED CONTENT FROM FILES:
${fileNames.map((name: string, idx: number) => `File ${idx + 1}: ${name}`).join('\n')}

${extractedContent}

REQUIREMENTS:
${requirements}

Create a blog post following this structure and format it as valid JSON:

{
  "title": "Compelling, SEO-friendly title (60-70 characters)",
  "content": "Full blog content with proper formatting using \\n for line breaks and \\n\\n for paragraph separation",
  "excerpt": "Engaging 2-3 sentence summary for preview (150-160 characters)",
  "tags": ["relevant", "seo", "tags", "5-8 tags"],
  "slug": "url-friendly-slug-with-hyphens"
}

CONTENT STRUCTURE REQUIREMENTS:
1. **Opening Hook**: Start with an engaging introduction that highlights the key investment opportunity or theme
2. **Executive Summary**: Brief overview of main points with key financial metrics
3. **Detailed Analysis**: 
   - Company/sector overview with business model
   - Financial performance with specific numbers and percentages
   - Market positioning and competitive landscape
   - Growth prospects and future outlook
4. **Investment Considerations**:
   - Key strengths and opportunities
   - Risk factors and challenges
   - Timeline and important dates
5. **Actionable Insights**: Clear takeaways for investors
6. **Compliance Disclaimer**: Standard investment disclaimer

FORMATTING GUIDELINES:
- Use **bold text** for section headings and key points
- Include specific financial data (₹ amounts, percentages, dates)
- Create clear paragraph breaks with \\n\\n
- Use bullet points with • for lists
- Include timeline information in a structured format
- Add numerical data that can be visualized
- Ensure content is engaging yet professional
- Target 1500-2500 words for comprehensive analysis

IMPORTANT: Return ONLY valid JSON. Do not include markdown formatting, code blocks, or any text outside the JSON structure.
`

    console.log('Making request to Gemini API...')
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4000,
        }
      }),
    })

    console.log('Gemini API response status:', response.status)
    
    if (!response.ok) {
      const errorData = await response.text()
      console.error('Gemini API error response:', errorData)
      throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorData}`)
    }

    const data = await response.json()
    console.log('Gemini API response received successfully')
    
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text

    // Parse the JSON response
    let blog
    try {
      // Clean the response to extract JSON if it's wrapped in markdown
      const cleanedContent = generatedContent.replace(/```json\n?|\n?```/g, '').trim()
      blog = JSON.parse(cleanedContent)
      console.log('Successfully parsed blog JSON')
    } catch (error) {
      console.error('Failed to parse JSON response, using fallback:', error)
      // Enhanced fallback with better structure
      const lines = generatedContent.split('\n').filter(line => line.trim())
      const title = lines.find(line => line.includes('title') || line.includes('Title')) || "AI-Generated Investment Analysis"
      const cleanTitle = title.replace(/[^\w\s:()-]/g, '').replace(/title:?\s*/i, '').trim()
      
      blog = {
        title: cleanTitle.substring(0, 100) || "Investment Analysis from Uploaded Documents",
        content: generatedContent,
        excerpt: "Comprehensive investment analysis based on detailed document review and financial data evaluation.",
        tags: ["Investment", "Analysis", "Finance", "AI-Generated"],
        slug: "investment-analysis-" + Date.now()
      }
    }

    return new Response(
      JSON.stringify({ success: true, blog }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error generating blog:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check edge function logs for more information'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
