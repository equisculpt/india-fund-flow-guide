
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

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

    const prompt = `You are a professional translator specializing in Indian languages. Translate the following content to ${languageName} while:
1. Maintaining the original meaning and context
2. Using appropriate financial and investment terminology
3. Keeping technical terms (like SIP, NAV, etc.) in English where commonly used
4. Ensuring cultural appropriateness for Indian audience
5. Maintaining the same formatting and structure

Please translate this content to ${languageName}:

${content}`;

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
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2000,
        }
      }),
    });

    const geminiData = await response.json();
    
    if (geminiData.error) {
      console.error('Gemini API error:', geminiData.error);
      throw new Error(geminiData.error.message);
    }

    const translatedContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!translatedContent) {
      throw new Error('No translation received from Gemini');
    }

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
