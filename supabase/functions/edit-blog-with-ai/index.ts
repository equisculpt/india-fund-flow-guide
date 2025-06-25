
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
    const { currentBlog, userRequest, chatHistory } = await req.json()
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found')
    }

    const chatContext = chatHistory.map((msg: any) => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n')

    const prompt = `
You are helping to edit a blog post. Here's the current blog:

TITLE: ${currentBlog.title}
EXCERPT: ${currentBlog.excerpt}
CONTENT: ${currentBlog.content}
TAGS: ${currentBlog.tags.join(', ')}
SLUG: ${currentBlog.slug}

PREVIOUS CHAT CONTEXT:
${chatContext}

USER REQUEST: ${userRequest}

Please modify the blog according to the user's request and return the updated blog in the same JSON format:
{
  "title": "Updated title if needed",
  "content": "Updated content with changes",
  "excerpt": "Updated excerpt if needed",
  "tags": ["updated", "tags", "if", "needed"],
  "slug": "updated-slug-if-needed"
}

Also provide a brief response explaining what changes you made.

Return your response in this format:
{
  "updatedBlog": { the blog object },
  "response": "Brief explanation of changes made"
}
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
          { role: 'system', content: 'You are an expert blog editor who helps improve content based on user feedback.' },
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
    const result = JSON.parse(data.choices[0].message.content)

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error editing blog:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
