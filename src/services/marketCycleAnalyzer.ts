
interface MarketCycleData {
  phase: 'Bottom' | 'Recovery' | 'Growth' | 'Peak' | 'Correction';
  confidenceLevel: number; // 1-10
  timeInPhase: number; // months
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
  private static readonly MAJOR_CHANGE_THRESHOLD = 15; // 15% change triggers recalculation

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
    // Simulate market analysis based on various indicators
    const currentMonth = new Date().getMonth();
    const marketVolatility = this.calculateVolatilityIndex();
    const valuationLevel = this.calculateValuationMetric();
    const sentimentScore = this.calculateSentimentScore();
    const liquidityFlow = this.calculateLiquidityFlow();

    // Determine market phase based on indicators
    let phase: MarketCycleData['phase'] = 'Growth';
    let timeInPhase = Math.floor(Math.random() * 12) + 1;
    let confidenceLevel = 7;

    if (marketVolatility > 7 && valuationLevel > 8) {
      phase = 'Peak';
      confidenceLevel = 8;
    } else if (marketVolatility > 8 && valuationLevel < 4) {
      phase = 'Bottom';
      confidenceLevel = 9;
    } else if (marketVolatility < 5 && valuationLevel < 6) {
      phase = 'Recovery';
      confidenceLevel = 7;
    } else if (marketVolatility > 6 && valuationLevel > 6) {
      phase = 'Correction';
      confidenceLevel = 6;
    }

    // Generate allocation recommendations based on phase
    const allocation = this.generateAllocationRecommendation(phase, marketVolatility, valuationLevel);
    
    return {
      phase,
      confidenceLevel,
      timeInPhase,
      nextPhaseExpected: this.getNextPhaseTimeline(phase),
      allocationRecommendation: allocation,
      reasoning: this.generateMarketReasoning(phase, marketVolatility, valuationLevel),
      marketIndicators: {
        volatilityIndex: marketVolatility,
        valuationMetric: valuationLevel,
        sentimentScore,
        liquidityFlow
      }
    };
  }

  private static generateAllocationRecommendation(
    phase: MarketCycleData['phase'], 
    volatility: number, 
    valuation: number
  ) {
    switch (phase) {
      case 'Bottom':
        return {
          equity: 75,
          debt: 25,
          smallCap: 35,
          midCap: 25,
          largeCap: 15
        };
      case 'Recovery':
        return {
          equity: 80,
          debt: 20,
          smallCap: 30,
          midCap: 30,
          largeCap: 20
        };
      case 'Growth':
        return {
          equity: 70,
          debt: 30,
          smallCap: 25,
          midCap: 25,
          largeCap: 20
        };
      case 'Peak':
        return {
          equity: 45,
          debt: 55,
          smallCap: 10,
          midCap: 15,
          largeCap: 20
        };
      case 'Correction':
        return {
          equity: 60,
          debt: 40,
          smallCap: 15,
          midCap: 20,
          largeCap: 25
        };
      default:
        return {
          equity: 65,
          debt: 35,
          smallCap: 20,
          midCap: 25,
          largeCap: 20
        };
    }
  }

  private static generateMarketReasoning(phase: string, volatility: number, valuation: number): string {
    const reasoningMap = {
      'Bottom': `Market is at cycle bottom with high volatility (${volatility.toFixed(1)}) but attractive valuations (${valuation.toFixed(1)}). Ideal time for aggressive equity allocation, especially small and mid-caps which offer maximum upside potential.`,
      'Recovery': `Market showing early recovery signs with improving sentiment and reasonable valuations. Balanced equity allocation across market caps recommended as recovery broadens.`,
      'Growth': `Market in sustained growth phase with moderate volatility and fair valuations. Maintain healthy equity exposure while being selective on quality.`,
      'Peak': `Market approaching peak levels with elevated valuations (${valuation.toFixed(1)}) and increasing volatility (${volatility.toFixed(1)}). Shift towards defensive allocation with higher debt component.`,
      'Correction': `Market in correction phase. Gradual accumulation recommended with focus on large-cap stability while maintaining some debt allocation for safety.`
    };
    
    return reasoningMap[phase] || 'Market conditions are mixed, balanced allocation recommended.';
  }

  private static getNextPhaseTimeline(currentPhase: string): string {
    const timelines = {
      'Bottom': '6-12 months for recovery to begin',
      'Recovery': '12-18 months for full growth phase',
      'Growth': '18-24 months before peak concerns',
      'Peak': '3-9 months before correction begins',
      'Correction': '6-15 months for market to find bottom'
    };
    
    return timelines[currentPhase] || '12-18 months for next major phase';
  }

  private static calculateVolatilityIndex(): number {
    // Simulate VIX-like calculation
    const baseVolatility = 5;
    const monthlyVariation = Math.sin(Date.now() / (1000 * 60 * 60 * 24 * 30)) * 2;
    const randomShock = Math.random() > 0.9 ? Math.random() * 3 : 0;
    return Math.max(1, Math.min(10, baseVolatility + monthlyVariation + randomShock));
  }

  private static calculateValuationMetric(): number {
    // Simulate P/E ratio based metric
    const baseValuation = 6;
    const cyclicalComponent = Math.cos(Date.now() / (1000 * 60 * 60 * 24 * 90)) * 2;
    return Math.max(1, Math.min(10, baseValuation + cyclicalComponent));
  }

  private static calculateSentimentScore(): number {
    const baseSentiment = 5;
    const newsFlow = Math.random() * 4 - 2; // -2 to +2
    return Math.max(1, Math.min(10, baseSentiment + newsFlow));
  }

  private static calculateLiquidityFlow(): number {
    const currentMonth = new Date().getMonth();
    // Higher liquidity in certain months (bonus seasons, etc.)
    const seasonalBoost = [3, 11, 0].includes(currentMonth) ? 1.5 : 0;
    const baseFlow = 5 + seasonalBoost;
    const randomVariation = Math.random() * 2 - 1;
    return Math.max(1, Math.min(10, baseFlow + randomVariation));
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
    
    // Recalculate if there's been a major trigger since last comparison
    if (lastTrigger && lastComparison && lastTrigger.timestamp > lastComparison) {
      return true;
    }

    // Recalculate if no comparison in last 24 hours
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
      // Clear cached market analysis for immediate recalculation
      localStorage.removeItem('market_cycle_analysis');
    }
  }

  static updateComparisonTimestamp(): void {
    localStorage.setItem('last_fund_comparison_timestamp', Date.now().toString());
  }
}
