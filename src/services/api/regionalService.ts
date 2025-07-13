import { BaseApiService } from './baseApiService';

interface RegionalContent {
  language: string;
  section: string;
  content: Record<string, string>;
}

interface TranslationResponse {
  originalText: string;
  translatedText: string;
  targetLanguage: string;
  confidence?: number;
}

interface LanguagePreference {
  userId: string;
  preferredLanguage: string;
  region: string;
  dateFormat: string;
  currencyFormat: string;
}

export class RegionalService extends BaseApiService {
  // Content Localization
  async getRegionalContent(params: {
    language: string;
    section: string;
  }): Promise<RegionalContent> {
    const { language, section } = params;
    return this.get(`/api/regional/content?language=${language}&section=${section}`);
  }

  async getAllLanguages(): Promise<{
    languages: Array<{
      code: string;
      name: string;
      nativeName: string;
      supported: boolean;
    }>;
  }> {
    return this.get('/api/regional/languages');
  }

  // Translation Services
  async translateText(params: {
    text: string;
    targetLanguage: string;
    sourceLanguage?: string;
  }): Promise<TranslationResponse> {
    return this.post('/api/regional/translate', params);
  }

  async translateBulk(params: {
    texts: string[];
    targetLanguage: string;
    sourceLanguage?: string;
  }): Promise<{
    translations: TranslationResponse[];
  }> {
    return this.post('/api/regional/translate-bulk', params);
  }

  // Regional Preferences
  async getUserLanguagePreference(): Promise<LanguagePreference> {
    return this.get('/api/regional/user-preference');
  }

  async setUserLanguagePreference(params: {
    preferredLanguage: string;
    region?: string;
    dateFormat?: string;
    currencyFormat?: string;
  }): Promise<LanguagePreference> {
    return this.post('/api/regional/user-preference', params);
  }

  // Regional Market Data
  async getRegionalMarketData(params: {
    region: string;
    language?: string;
  }): Promise<{
    region: string;
    marketData: any;
    localizedTerms: Record<string, string>;
  }> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.set(key, value);
    });
    return this.get(`/api/regional/market-data?${queryParams.toString()}`);
  }

  // Regional Compliance
  async getRegionalCompliance(region: string): Promise<{
    region: string;
    complianceRules: any[];
    disclaimers: Record<string, string>;
    regulations: any[];
  }> {
    return this.get(`/api/regional/compliance?region=${region}`);
  }

  // Currency Conversion
  async convertCurrency(params: {
    amount: number;
    fromCurrency: string;
    toCurrency: string;
  }): Promise<{
    amount: number;
    fromCurrency: string;
    toCurrency: string;
    convertedAmount: number;
    exchangeRate: number;
    lastUpdated: string;
  }> {
    return this.post('/api/regional/currency-convert', params);
  }
}

export const regionalService = new RegionalService();

// Export individual functions for backward compatibility
export const getRegionalContent = (params: any) => regionalService.getRegionalContent(params);
export const translateText = (params: any) => regionalService.translateText(params);
export const getUserLanguagePreference = () => regionalService.getUserLanguagePreference();
export const setUserLanguagePreference = (params: any) => regionalService.setUserLanguagePreference(params);
export const getRegionalMarketData = (params: any) => regionalService.getRegionalMarketData(params);