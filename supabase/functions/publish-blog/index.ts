
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
    const { blog, sourceFiles } = await req.json()
    
    console.log('Publishing blog request:', { 
      title: blog?.title, 
      sourceFiles: sourceFiles?.length 
    })

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Generate a unique slug if not provided
    const blogSlug = blog.slug || `blog-${Date.now()}`

    // Insert the blog post into the database
    const { data, error } = await supabaseClient
      .from('blog_posts')
      .insert({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt,
        slug: blogSlug,
        tags: blog.tags || [],
        status: 'published',
        author_id: '00000000-0000-0000-0000-000000000000', // System user ID
        published_at: new Date().toISOString(),
        category: 'ipo-analysis',
        moderation_status: 'approved'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw new Error(`Database error: ${error.message}`)
    }

    console.log('Blog published successfully:', data?.id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        blogId: data.id,
        slug: blogSlug,
        message: 'Blog published successfully!'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error publishing blog:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
