
import { StableComparisonCache } from "@/services/stableComparisonCache";
import { FundWithDetails, EnhancedComparisonResult } from './types';
import { MetricsEstimationService } from './MetricsEstimationService';
import { AIComparisonService } from './AIComparisonService';
import { FallbackComparisonService } from './FallbackComparisonService';

export { FundWithDetails, EnhancedComparisonResult } from './types';

export class FundComparisonLogic {
  static async performComparison(funds: FundWithDetails[]): Promise<EnhancedComparisonResult | null> {
    if (funds.length < 2) return null;

    const fundIds = funds.map(f => f.schemeCode);
    
    // Check for cached stable result
    const cachedResult = StableComparisonCache.getCachedComparison(fundIds);
    
    if (cachedResult && !StableComparisonCache.shouldRefreshComparison(cachedResult, funds)) {
      console.log('FundComparisonLogic: Using stable cached AI comparison result');
      return {
        ...cachedResult.analysis,
        isStableResult: true,
        validUntil: cachedResult.validUntil
      };
    }

    console.log('FundComparisonLogic: Performing fresh AI comparison for', funds.length, 'funds');

    try {
      // Enhance fund data with additional metrics for AI analysis
      const enhancedFunds = funds.map(fund => MetricsEstimationService.enhanceFundData(fund));

      // Call the AI comparison service
      const result = await AIComparisonService.performAIComparison(enhancedFunds);

      // Cache the stable result
      StableComparisonCache.cacheComparison(fundIds, result, enhancedFunds);

      return result;

    } catch (error) {
      console.error('FundComparisonLogic: Error in AI comparison:', error);
      
      // Fallback to basic comparison if AI fails
      return FallbackComparisonService.performBasicComparison(funds);
    }
  }
}
