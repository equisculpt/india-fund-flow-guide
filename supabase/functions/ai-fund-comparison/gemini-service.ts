
import { generateAIPrompt } from './prompt-generator.ts';
import { FundAnalysisData } from './types.ts';

export const callGeminiAPI = async (fundAnalysisData: FundAnalysisData[], geminiApiKey: string) => {
  const aiPrompt = generateAIPrompt(fundAnalysisData, fundAnalysisData.length);

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: aiPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

export const parseAIResponse = (aiResponse: string) => {
  try {
    // Extract JSON from the response (remove any markdown formatting)
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found in AI response');
    }
  } catch (parseError) {
    console.error('Failed to parse AI response as JSON:', parseError);
    throw parseError;
  }
};
