
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
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found')
    }

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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert blog writer who creates engaging, well-structured content.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const generatedContent = data.choices[0].message.content

    // Parse the JSON response
    let blog
    try {
      blog = JSON.parse(generatedContent)
    } catch (error) {
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
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
