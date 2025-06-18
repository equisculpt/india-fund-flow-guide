import { MarketPhaseDetector, MarketPhase } from './marketPhaseDetector';
import { MarketIndicatorCalculator } from './marketIndicators';
import { AllocationRecommendationEngine } from './allocationRecommendations';

interface MarketCycleData {
  phase: MarketPhase;
  confidenceLevel: number;
  timeInPhase: number;
  nextPhaseExpected: string;
  allocationRecommendation: {
    equity: number;
    debt: number;
    smallCap: number;
    midCap: number;
    largeCap: number;
  };
  reasoning: string;
  marketIndicators: {
    volatilityIndex: number;
    valuationMetric: number;
    sentimentScore: number;
    liquidityFlow: number;
  };
}

interface MarketTrigger {
  type: 'MAJOR_CHANGE' | 'PHASE_SHIFT' | 'EXTERNAL_SHOCK';
  timestamp: string;
  description: string;
  impactLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export class MarketCycleAnalyzer {
  private static readonly CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

  static getCurrentMarketCycle(): MarketCycleData {
    const cached = this.getCachedMarketData();
    if (cached && this.isCacheValid(cached)) {
      console.log('MarketCycleAnalyzer: Using cached market cycle data');
      return cached.data;
    }

    console.log('MarketCycleAnalyzer: Calculating fresh market cycle analysis');
    const newAnalysis = this.performMarketAnalysis();
    this.cacheMarketData(newAnalysis);
    return newAnalysis;
  }

  private static performMarketAnalysis(): MarketCycleData {
    const phaseAnalysis = MarketPhaseDetector.detectCurrentPhase();
    const marketIndicators = MarketIndicatorCalculator.calculateAllIndicators();
    const allocationRecommendation = AllocationRecommendationEngine.generateRecommendation(phaseAnalysis.phase);

    return {
      phase: phaseAnalysis.phase,
      confidenceLevel: phaseAnalysis.confidenceLevel,
      timeInPhase: phaseAnalysis.timeInPhase,
      nextPhaseExpected: phaseAnalysis.nextPhaseExpected,
      allocationRecommendation,
      reasoning: phaseAnalysis.reasoning,
      marketIndicators
    };
  }

  private static getCachedMarketData(): { data: MarketCycleData; timestamp: number } | null {
    try {
      const cached = localStorage.getItem('market_cycle_analysis');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  private static isCacheValid(cached: { timestamp: number }): boolean {
    const age = Date.now() - cached.timestamp;
    return age < this.CACHE_DURATION;
  }

  private static cacheMarketData(data: MarketCycleData): void {
    try {
      const cacheEntry = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem('market_cycle_analysis', JSON.stringify(cacheEntry));
    } catch (error) {
      console.error('MarketCycleAnalyzer: Failed to cache market data:', error);
    }
  }

  static shouldRecalculateFundComparison(): boolean {
    const lastTrigger = this.getLastMajorTrigger();
    const lastComparison = this.getLastComparisonTimestamp();
    
    if (lastTrigger && lastComparison && lastTrigger.timestamp > lastComparison) {
      return true;
    }

    const daysSinceLastComparison = lastComparison ? 
      (Date.now() - parseInt(lastComparison)) / (1000 * 60 * 60 * 24) : 999;
    
    return daysSinceLastComparison > 1;
  }

  private static getLastMajorTrigger(): MarketTrigger | null {
    try {
      const trigger = localStorage.getItem('last_major_market_trigger');
      return trigger ? JSON.parse(trigger) : null;
    } catch {
      return null;
    }
  }

  private static getLastComparisonTimestamp(): string | null {
    return localStorage.getItem('last_fund_comparison_timestamp');
  }

  static recordMajorMarketEvent(description: string, impactLevel: 'LOW' | 'MEDIUM' | 'HIGH'): void {
    const trigger: MarketTrigger = {
      type: 'MAJOR_CHANGE',
      timestamp: new Date().toISOString(),
      description,
      impactLevel
    };
    
    localStorage.setItem('last_major_market_trigger', JSON.stringify(trigger));
    
    if (impactLevel === 'HIGH') {
      localStorage.removeItem('market_cycle_analysis');
    }
  }

  static updateComparisonTimestamp(): void {
    localStorage.setItem('last_fund_comparison_timestamp', Date.now().toString());
  }
}
