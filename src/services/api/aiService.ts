import { BaseApiService } from './baseApiService';

interface PortfolioInsight {
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  confidence: number;
  action: string;
  expectedImpact: string;
}

interface Recommendation {
  type: 'BUY' | 'SELL' | 'HOLD' | 'FUND_SWITCH';
  fund?: string;
  fromFund?: string;
  toFund?: string;
  amount?: number;
  reason: string;
  confidence: number;
  expectedReturn?: number;
  risk?: string;
}

interface PortfolioInsightsResponse {
  insights: PortfolioInsight[];
  recommendations: Recommendation[];
}

interface MarketAnalysis {
  trend: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  factors: string[];
}

interface PersonalizedRecommendationsResponse {
  recommendations: Recommendation[];
  marketAnalysis: MarketAnalysis;
}

interface AGIContext {
  userId: string;
  riskProfile: string;
  investmentGoals: string[];
  timeHorizon: string;
  marketConditions: {
    trend: string;
    volatility: string;
    sentiment: string;
  };
}

interface AGIInitializeResponse {
  agiContext: AGIContext;
  autonomousMode: boolean;
}

interface MarketPrediction {
  market: string;
  direction: 'up' | 'down' | 'neutral';
  probability: number;
  confidence: number;
  factors: string[];
}

interface MarketPredictionsResponse {
  timeframe: string;
  predictions: MarketPrediction[];
  confidence: number;
  generatedAt: string;
}

export class AIService extends BaseApiService {
  async getPortfolioInsights(): Promise<PortfolioInsightsResponse> {
    return this.get<PortfolioInsightsResponse>('/api/ai/portfolio-insights');
  }

  async getPersonalizedRecommendations(userId: string): Promise<PersonalizedRecommendationsResponse> {
    return this.get<PersonalizedRecommendationsResponse>(`/api/agi/recommendations/${userId}`);
  }

  async initializeAGI(userId: string): Promise<AGIInitializeResponse> {
    return this.post<AGIInitializeResponse>('/api/agi/initialize', { userId });
  }

  async getMarketPredictions(timeframe: string = '30d'): Promise<MarketPredictionsResponse> {
    const endpoint = `/api/agi/predictions?timeframe=${timeframe}`;
    return this.get<MarketPredictionsResponse>(endpoint);
  }
}

export const aiService = new AIService();