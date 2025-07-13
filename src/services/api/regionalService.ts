import { BaseApiService } from './baseApiService';

interface RegionalContentRequest {
  language: string;
  section: string;
}

interface RegionalContentResponse {
  language: string;
  section: string;
  content: Record<string, string>;
}

interface TranslateRequest {
  text: string;
  targetLanguage: string;
}

interface TranslateResponse {
  originalText: string;
  translatedText: string;
  targetLanguage: string;
}

export class RegionalService extends BaseApiService {
  async getRegionalContent(params: RegionalContentRequest): Promise<RegionalContentResponse> {
    const queryParams = new URLSearchParams({
      language: params.language,
      section: params.section
    });

    const endpoint = `/api/regional/content?${queryParams.toString()}`;
    return this.get<RegionalContentResponse>(endpoint);
  }

  async translateText(translateData: TranslateRequest): Promise<TranslateResponse> {
    return this.post<TranslateResponse>('/api/regional/translate', translateData);
  }
}

export const regionalService = new RegionalService();