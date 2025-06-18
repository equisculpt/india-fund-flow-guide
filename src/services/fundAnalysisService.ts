
import { MutualFundSearchService } from './mutualFundSearchService';
import { FundScoring } from './analysis/FundScoring';
import { FundAnalysisCache } from './analysis/FundAnalysisCache';
import { FundAnalysisUtils } from './analysis/FundAnalysisUtils';
import { CategoryTopFunds, FUND_CATEGORIES, FundAnalysisResult } from './analysis/FundAnalysisTypes';

export class FundAnalysisService {
  private static readonly BATCH_SIZE = 50;

  static async performFullMarketAnalysis(): Promise<CategoryTopFunds[]> {
    console.log('FundAnalysisService: Starting full market analysis...');
    
    try {
      // Get all available funds from the API
      const allFunds = await MutualFundSearchService.getAllFunds();
      console.log(`FundAnalysisService: Analyzing ${allFunds.length} funds`);

      // Process funds in batches
      const analysisResults = await this.processFundsInBatches(allFunds);

      console.log(`FundAnalysisService: Completed analysis of ${analysisResults.length} funds`);

      // Group by category and get top 10 for each
      const categoryResults = this.generateCategoryResults(analysisResults);

      console.log(`FundAnalysisService: Generated top 10 lists for ${categoryResults.length} categories`);
      return categoryResults;

    } catch (error) {
      console.error('FundAnalysisService: Error during market analysis:', error);
      throw error;
    }
  }

  private static async processFundsInBatches(allFunds: any[]): Promise<FundAnalysisResult[]> {
    return FundAnalysisUtils.processFundsInBatches(
      allFunds,
      this.BATCH_SIZE,
      async (batch) => {
        const batchCodes = batch.map(fund => fund.schemeCode.toString());
        const detailedResults = await MutualFundSearchService.getMultipleFundDetails(batchCodes);

        const batchAnalysis: FundAnalysisResult[] = [];
        for (const fund of batch) {
          const details = detailedResults.get(fund.schemeCode.toString());
          if (details && details.nav > 0) {
            const analysis = FundScoring.analyzeFund(details);
            if (analysis) {
              batchAnalysis.push(analysis);
            }
          }
        }
        return batchAnalysis;
      }
    );
  }

  private static generateCategoryResults(analysisResults: FundAnalysisResult[]): CategoryTopFunds[] {
    const categoryResults: CategoryTopFunds[] = [];

    for (const category of FUND_CATEGORIES) {
      const categoryFunds = analysisResults
        .filter(fund => fund.category === category)
        .sort((a, b) => b.aiScore - a.aiScore) // Sort by AI score descending
        .slice(0, 10); // Take top 10

      if (categoryFunds.length > 0) {
        categoryResults.push({
          category,
          funds: categoryFunds,
          lastUpdated: new Date().toISOString()
        });
      }
    }

    return categoryResults;
  }

  // Delegate cache methods to FundAnalysisCache
  static saveAnalysisResults = FundAnalysisCache.saveAnalysisResults;
  static loadAnalysisResults = FundAnalysisCache.loadAnalysisResults;
  static getTopFundsForCategory = FundAnalysisCache.getTopFundsForCategory;
}
