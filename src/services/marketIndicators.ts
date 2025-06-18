
interface MarketIndicators {
  volatilityIndex: number;
  valuationMetric: number;
  sentimentScore: number;
  liquidityFlow: number;
}

export class MarketIndicatorCalculator {
  static calculateVolatilityIndex(): number {
    // Simulate VIX-like calculation
    const baseVolatility = 5;
    const monthlyVariation = Math.sin(Date.now() / (1000 * 60 * 60 * 24 * 30)) * 2;
    const randomShock = Math.random() > 0.9 ? Math.random() * 3 : 0;
    return Math.max(1, Math.min(10, baseVolatility + monthlyVariation + randomShock));
  }

  static calculateValuationMetric(): number {
    // Simulate P/E ratio based metric
    const baseValuation = 6;
    const cyclicalComponent = Math.cos(Date.now() / (1000 * 60 * 60 * 24 * 90)) * 2;
    return Math.max(1, Math.min(10, baseValuation + cyclicalComponent));
  }

  static calculateSentimentScore(): number {
    const baseSentiment = 5;
    const newsFlow = Math.random() * 4 - 2; // -2 to +2
    return Math.max(1, Math.min(10, baseSentiment + newsFlow));
  }

  static calculateLiquidityFlow(): number {
    const currentMonth = new Date().getMonth();
    // Higher liquidity in certain months (bonus seasons, etc.)
    const seasonalBoost = [3, 11, 0].includes(currentMonth) ? 1.5 : 0;
    const baseFlow = 5 + seasonalBoost;
    const randomVariation = Math.random() * 2 - 1;
    return Math.max(1, Math.min(10, baseFlow + randomVariation));
  }

  static calculateAllIndicators(): MarketIndicators {
    return {
      volatilityIndex: this.calculateVolatilityIndex(),
      valuationMetric: this.calculateValuationMetric(),
      sentimentScore: this.calculateSentimentScore(),
      liquidityFlow: this.calculateLiquidityFlow()
    };
  }
}
