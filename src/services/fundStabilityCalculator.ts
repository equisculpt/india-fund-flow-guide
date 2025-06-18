
export class FundStabilityCalculator {
  static calculateStabilityScore(
    fundId: string, 
    baseScore: number, 
    marketCycle: any
  ): {
    baseScore: number;
    marketAdjustedScore: number;
    confidence: number;
    nextReviewDate: string;
  } {
    // Calculate market adjustment based on fund category and market cycle
    const marketAdjustment = this.calculateMarketAdjustment(fundId, marketCycle);
    
    // Apply market adjustment to base score
    const marketAdjustedScore = Math.min(10, Math.max(0, baseScore + marketAdjustment));
    
    // Calculate confidence based on market stability
    const confidence = this.calculateConfidence(marketCycle);
    
    // Set next review date (7 days from now)
    const nextReviewDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    
    return {
      baseScore,
      marketAdjustedScore: Math.round(marketAdjustedScore * 10) / 10,
      confidence,
      nextReviewDate
    };
  }

  private static calculateMarketAdjustment(fundId: string, marketCycle: any): number {
    // Base market adjustment on current market phase
    const phaseAdjustments: { [key: string]: number } = {
      'Growth': 0.5,
      'Peak': 0.2,
      'Correction': -0.3,
      'Recovery': 0.3,
      'Bear Market': -0.5
    };
    
    const baseAdjustment = phaseAdjustments[marketCycle.phase] || 0;
    
    // Add some randomness for fund-specific factors
    const fundSpecificAdjustment = (Math.random() - 0.5) * 0.4;
    
    return baseAdjustment + fundSpecificAdjustment;
  }

  private static calculateConfidence(marketCycle: any): number {
    // Higher confidence in stable market conditions
    const baseConfidence = marketCycle.confidenceLevel || 7;
    
    // Adjust based on market volatility
    const volatilityAdjustment = Math.random() * 2 - 1; // -1 to +1
    
    return Math.min(10, Math.max(5, baseConfidence + volatilityAdjustment));
  }
}
