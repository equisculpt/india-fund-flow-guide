
interface StableComparisonResult {
  analysis: any;
  timestamp: string;
  validUntil: string;
  fundDataHash: string;
  marketContextHash: string;
}

export class StableComparisonCache {
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private static readonly CACHE_KEY_PREFIX = 'stable_ai_comparison_';

  static generateFundDataHash(funds: any[]): string {
    const dataString = funds.map(fund => 
      `${fund.schemeCode}_${fund.nav}_${fund.navDate}_${fund.returns1Y}_${fund.returns3Y}_${fund.expenseRatio}`
    ).join('|');
    
    return btoa(dataString).slice(0, 16);
  }

  static generateMarketContextHash(): string {
    const marketData = {
      date: new Date().toDateString(), // Changes daily
      // Add other market indicators that should trigger refresh
    };
    
    return btoa(JSON.stringify(marketData)).slice(0, 16);
  }

  static getCachedComparison(fundIds: string[]): StableComparisonResult | null {
    try {
      const cacheKey = this.generateCacheKey(fundIds);
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) return null;
      
      const result: StableComparisonResult = JSON.parse(cached);
      
      // Check if cache is still valid
      const now = new Date().getTime();
      const validUntil = new Date(result.validUntil).getTime();
      
      if (now > validUntil) {
        localStorage.removeItem(cacheKey);
        return null;
      }
      
      return result;
    } catch (error) {
      console.error('StableComparisonCache: Error reading cache:', error);
      return null;
    }
  }

  static shouldRefreshComparison(
    cachedResult: StableComparisonResult, 
    currentFunds: any[]
  ): boolean {
    const currentFundHash = this.generateFundDataHash(currentFunds);
    const currentMarketHash = this.generateMarketContextHash();
    
    // Refresh if fund data changed
    if (cachedResult.fundDataHash !== currentFundHash) {
      console.log('StableComparisonCache: Fund data changed, refreshing...');
      return true;
    }
    
    // Refresh if market context changed significantly
    if (cachedResult.marketContextHash !== currentMarketHash) {
      console.log('StableComparisonCache: Market context changed, refreshing...');
      return true;
    }
    
    return false;
  }

  static cacheComparison(
    fundIds: string[], 
    analysis: any, 
    funds: any[]
  ): void {
    try {
      const cacheKey = this.generateCacheKey(fundIds);
      const validUntil = new Date(Date.now() + this.CACHE_DURATION).toISOString();
      
      const cacheData: StableComparisonResult = {
        analysis,
        timestamp: new Date().toISOString(),
        validUntil,
        fundDataHash: this.generateFundDataHash(funds),
        marketContextHash: this.generateMarketContextHash()
      };
      
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      console.log('StableComparisonCache: Cached comparison result');
    } catch (error) {
      console.error('StableComparisonCache: Error caching result:', error);
    }
  }

  private static generateCacheKey(fundIds: string[]): string {
    const sortedIds = fundIds.sort().join('_');
    return `${this.CACHE_KEY_PREFIX}${sortedIds}`;
  }

  static clearCache(): void {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.CACHE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      console.log('StableComparisonCache: Cache cleared');
    } catch (error) {
      console.error('StableComparisonCache: Error clearing cache:', error);
    }
  }
}
