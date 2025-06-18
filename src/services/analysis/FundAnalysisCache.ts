
import { CategoryTopFunds } from './FundAnalysisTypes';

export class FundAnalysisCache {
  private static readonly CACHE_KEY = 'fund_analysis_results';
  private static readonly TIMESTAMP_KEY = 'fund_analysis_timestamp';
  private static readonly CACHE_DURATION_HOURS = 24;

  static saveAnalysisResults(results: CategoryTopFunds[]): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(results));
      localStorage.setItem(this.TIMESTAMP_KEY, Date.now().toString());
      console.log('FundAnalysisCache: Analysis results saved to localStorage');
    } catch (error) {
      console.error('FundAnalysisCache: Error saving analysis results:', error);
    }
  }

  static loadAnalysisResults(): CategoryTopFunds[] | null {
    try {
      const results = localStorage.getItem(this.CACHE_KEY);
      const timestamp = localStorage.getItem(this.TIMESTAMP_KEY);
      
      if (results && timestamp) {
        const ageInHours = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60);
        
        // Return cached results if less than 24 hours old
        if (ageInHours < this.CACHE_DURATION_HOURS) {
          console.log('FundAnalysisCache: Returning cached analysis results');
          return JSON.parse(results);
        }
      }
      
      console.log('FundAnalysisCache: No valid cached results found');
      return null;
    } catch (error) {
      console.error('FundAnalysisCache: Error loading analysis results:', error);
      return null;
    }
  }

  static getTopFundsForCategory(category: string, count: number = 10): any[] {
    const cachedResults = this.loadAnalysisResults();
    if (!cachedResults) return [];

    const categoryData = cachedResults.find(cat => cat.category === category);
    return categoryData ? categoryData.funds.slice(0, count) : [];
  }

  static clearCache(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY);
      localStorage.removeItem(this.TIMESTAMP_KEY);
      console.log('FundAnalysisCache: Cache cleared');
    } catch (error) {
      console.error('FundAnalysisCache: Error clearing cache:', error);
    }
  }
}
