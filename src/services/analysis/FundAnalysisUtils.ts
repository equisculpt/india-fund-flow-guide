
export class FundAnalysisUtils {
  static async processFundsInBatches<T>(
    items: T[],
    batchSize: number,
    processor: (batch: T[]) => Promise<any[]>,
    onProgress?: (completed: number, total: number) => void
  ): Promise<any[]> {
    const results: any[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      console.log(`FundAnalysisUtils: Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(items.length/batchSize)}`);
      
      const batchResults = await processor(batch);
      results.push(...batchResults);
      
      // Report progress
      if (onProgress) {
        onProgress(i + batch.length, items.length);
      }

      // Add delay between batches to be respectful to the API
      if (i + batchSize < items.length) {
        await this.delay(1000);
      }
    }

    return results;
  }

  static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static groupByCategory(funds: any[]): { [category: string]: any[] } {
    return funds.reduce((groups, fund) => {
      const category = fund.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(fund);
      return groups;
    }, {});
  }

  static sortAndRankFunds(funds: any[]): any[] {
    return funds
      .sort((a, b) => b.aiScore - a.aiScore) // Sort by AI score descending
      .map((fund, index) => ({
        ...fund,
        overallRank: index + 1
      }));
  }
}
