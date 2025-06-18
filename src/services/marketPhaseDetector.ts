
import { MarketIndicatorCalculator } from './marketIndicators';

export type MarketPhase = 'Bottom' | 'Recovery' | 'Growth' | 'Peak' | 'Correction';

interface PhaseAnalysis {
  phase: MarketPhase;
  confidenceLevel: number;
  timeInPhase: number;
  nextPhaseExpected: string;
  reasoning: string;
}

export class MarketPhaseDetector {
  static detectCurrentPhase(): PhaseAnalysis {
    const indicators = MarketIndicatorCalculator.calculateAllIndicators();
    const { volatilityIndex, valuationMetric } = indicators;

    let phase: MarketPhase = 'Growth';
    let timeInPhase = Math.floor(Math.random() * 12) + 1;
    let confidenceLevel = 7;

    // Determine market phase based on indicators
    if (volatilityIndex > 7 && valuationMetric > 8) {
      phase = 'Peak';
      confidenceLevel = 8;
    } else if (volatilityIndex > 8 && valuationMetric < 4) {
      phase = 'Bottom';
      confidenceLevel = 9;
    } else if (volatilityIndex < 5 && valuationMetric < 6) {
      phase = 'Recovery';
      confidenceLevel = 7;
    } else if (volatilityIndex > 6 && valuationMetric > 6) {
      phase = 'Correction';
      confidenceLevel = 6;
    }

    return {
      phase,
      confidenceLevel,
      timeInPhase,
      nextPhaseExpected: this.getNextPhaseTimeline(phase),
      reasoning: this.generatePhaseReasoning(phase, volatilityIndex, valuationMetric)
    };
  }

  private static getNextPhaseTimeline(currentPhase: MarketPhase): string {
    const timelines = {
      'Bottom': '6-12 months for recovery to begin',
      'Recovery': '12-18 months for full growth phase',
      'Growth': '18-24 months before peak concerns',
      'Peak': '3-9 months before correction begins',
      'Correction': '6-15 months for market to find bottom'
    };
    
    return timelines[currentPhase] || '12-18 months for next major phase';
  }

  private static generatePhaseReasoning(phase: MarketPhase, volatility: number, valuation: number): string {
    const reasoningMap = {
      'Bottom': `Market is at cycle bottom with high volatility (${volatility.toFixed(1)}) but attractive valuations (${valuation.toFixed(1)}). Ideal time for aggressive equity allocation.`,
      'Recovery': `Market showing early recovery signs with improving sentiment and reasonable valuations. Balanced equity allocation recommended.`,
      'Growth': `Market in sustained growth phase with moderate volatility and fair valuations. Maintain healthy equity exposure.`,
      'Peak': `Market approaching peak levels with elevated valuations (${valuation.toFixed(1)}) and increasing volatility (${volatility.toFixed(1)}). Shift towards defensive allocation.`,
      'Correction': `Market in correction phase. Gradual accumulation recommended with focus on large-cap stability.`
    };
    
    return reasoningMap[phase] || 'Market conditions are mixed, balanced allocation recommended.';
  }
}
