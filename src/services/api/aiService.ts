import { BaseApiService } from './baseApiService';

interface AIInsight {
  type: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  action?: string;
  expectedImpact?: string;
}

interface AIRecommendation {
  type: string;
  fund?: string;
  amount?: number;
  reason: string;
  confidence: number;
}

interface MarketAnalysis {
  trend: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  factors: string[];
}

interface AIPortfolioInsightsResponse {
  insights: AIInsight[];
  recommendations: AIRecommendation[];
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
  autonomousMode: boolean;
}

interface MarketPrediction {
  market: string;
  direction: 'up' | 'down' | 'sideways';
  probability: number;
  confidence: number;
  factors: string[];
}

export class AIService extends BaseApiService {
  // AI Portfolio Insights
  async getPortfolioInsights(): Promise<AIPortfolioInsightsResponse> {
    return this.get('/api/ai/portfolio-insights');
  }

  async getPersonalizedRecommendations(userId?: string): Promise<any> {
    const endpoint = userId ? `/api/agi/recommendations/${userId}` : '/api/agi/recommendations';
    return this.get(endpoint);
  }

  async getMarketTrends(): Promise<any> {
    return this.get('/api/agi/market-trends');
  }

  async analyzeFund(fundCode: string): Promise<any> {
    return this.get(`/api/agi/analyze-fund/${fundCode}`);
  }

  async getSimilarFunds(fundCode: string): Promise<any> {
    return this.get(`/api/agi/similar-funds/${fundCode}`);
  }

  // AGI System
  async initializeAGI(userId: string): Promise<{ agiContext: AGIContext }> {
    return this.post('/api/agi/initialize', { userId });
  }

  async getMarketPredictions(timeframe: string = '30d'): Promise<{
    timeframe: string;
    predictions: MarketPrediction[];
    confidence: number;
    generatedAt: string;
  }> {
    return this.get(`/api/agi/predictions?timeframe=${timeframe}`);
  }

  // AI Fund Analysis
  async getAIFundAnalysis(fundCode: string): Promise<any> {
    return this.post('/api/ai/fund-analysis', { fundCode });
  }

  async getFundComparison(fundCodes: string[]): Promise<any> {
    return this.post('/api/ai/fund-comparison', { funds: fundCodes });
  }
}

export const aiService = new AIService();

// Export individual functions for backward compatibility
export const getPortfolioInsights = () => aiService.getPortfolioInsights();
export const getPersonalizedRecommendations = (userId: string) => aiService.getPersonalizedRecommendations(userId);
export const initializeAGI = (userId: string) => aiService.initializeAGI(userId);
export const getMarketPredictions = (timeframe?: string) => aiService.getMarketPredictions(timeframe);
export const getAIFundAnalysis = (fundCode: string) => aiService.getAIFundAnalysis(fundCode);