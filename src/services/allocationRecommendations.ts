
import { MarketPhase } from './marketPhaseDetector';

interface AllocationRecommendation {
  equity: number;
  debt: number;
  smallCap: number;
  midCap: number;
  largeCap: number;
}

export class AllocationRecommendationEngine {
  static generateRecommendation(phase: MarketPhase): AllocationRecommendation {
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
}
