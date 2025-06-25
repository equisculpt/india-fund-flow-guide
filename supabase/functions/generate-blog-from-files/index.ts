
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
You are an expert blog writer. Generate a high-quality, engaging blog post based on the following:

EXTRACTED CONTENT FROM PDF FILES:
${fileNames.map((name: string, idx: number) => `File ${idx + 1}: ${name}`).join('\n')}

${extractedContent}

REQUIREMENTS:
${requirements}

Please generate a blog post with the following JSON structure:
{
  "title": "Compelling blog title",
  "content": "Full blog content with proper paragraphs separated by \\n",
  "excerpt": "Brief description/summary for preview",
  "tags": ["tag1", "tag2", "tag3"],
  "slug": "url-friendly-slug"
}

Guidelines:
- Make it engaging and well-structured
- Include relevant headings and subheadings in the content
- Ensure it's SEO-friendly
- Write in a professional yet accessible tone
- Include actionable insights where appropriate
- Ensure content flows logically from introduction to conclusion
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
      blog = JSON.parse(generatedContent)
      console.log('Successfully parsed blog JSON')
    } catch (error) {
      console.error('Failed to parse JSON response, using fallback:', error)
      // Fallback if JSON parsing fails
      blog = {
        title: "Generated Blog Post",
        content: generatedContent,
        excerpt: "AI-generated blog post from uploaded files",
        tags: ["AI", "Generated"],
        slug: "ai-generated-blog-" + Date.now()
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
