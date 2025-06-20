
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LANGUAGE_NAMES: Record<string, string> = {
  'hi': 'Hindi',
  'bn': 'Bengali',
  'te': 'Telugu',
  'mr': 'Marathi',
  'ta': 'Tamil',
  'gu': 'Gujarati',
  'ur': 'Urdu',
  'kn': 'Kannada',
  'ml': 'Malayalam',
  'or': 'Odia',
  'pa': 'Punjabi',
  'as': 'Assamese',
  'ne': 'Nepali',
  'sd': 'Sindhi',
  'ks': 'Kashmiri',
  'kok': 'Konkani',
  'mai': 'Maithili',
  'sat': 'Santali',
  'doi': 'Dogri',
  'mni': 'Manipuri',
  'brx': 'Bodo'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, targetLanguage } = await req.json();

    if (!content || !targetLanguage) {
      throw new Error('Content and target language are required');
    }

    if (targetLanguage === 'en') {
      return new Response(
        JSON.stringify({ translatedContent: content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const languageName = LANGUAGE_NAMES[targetLanguage] || targetLanguage;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator specializing in Indian languages. Translate the following content to ${languageName} while:
            1. Maintaining the original meaning and context
            2. Using appropriate financial and investment terminology
            3. Keeping technical terms (like SIP, NAV, etc.) in English where commonly used
            4. Ensuring cultural appropriateness for Indian audience
            5. Maintaining the same formatting and structure`
          },
          {
            role: 'user',
            content: `Please translate this content to ${languageName}:\n\n${content}`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    const aiData = await response.json();
    
    if (aiData.error) {
      throw new Error(aiData.error.message);
    }

    const translatedContent = aiData.choices[0].message.content;

    return new Response(
      JSON.stringify({ 
        translatedContent,
        originalContent: content,
        targetLanguage: languageName
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Translation error:', error);
    
    // Return original content if translation fails
    const { content } = await req.json().catch(() => ({ content: '' }));
    
    return new Response(
      JSON.stringify({ 
        translatedContent: content,
        error: 'Translation failed, showing original content',
        details: error.message
      }),
      { 
        status: 200, // Return 200 to avoid breaking the UI
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
