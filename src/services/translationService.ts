
import { supabase } from '@/integrations/supabase/client';

export class TranslationService {
  static async translateContent(content: string, targetLanguage: string): Promise<string> {
    if (targetLanguage === 'en') {
      return content;
    }

    try {
      const { data, error } = await supabase.functions.invoke('translate-content', {
        body: {
          content,
          targetLanguage
        }
      });

      if (error) {
        console.error('Translation error:', error);
        return content; // Return original content if translation fails
      }

      return data.translatedContent || content;
    } catch (error) {
      console.error('Translation service error:', error);
      return content;
    }
  }

  static async translateAIResponse(response: string, targetLanguage: string): Promise<string> {
    return this.translateContent(response, targetLanguage);
  }

  static async translateBlogContent(blogContent: any, targetLanguage: string): Promise<any> {
    if (targetLanguage === 'en') {
      return blogContent;
    }

    try {
      const translated = {
        ...blogContent,
        title: await this.translateContent(blogContent.title, targetLanguage),
        description: await this.translateContent(blogContent.description, targetLanguage),
        content: await this.translateContent(blogContent.content, targetLanguage)
      };

      return translated;
    } catch (error) {
      console.error('Blog translation error:', error);
      return blogContent;
    }
  }
}
