
import { MutualFundSearchService } from './mutualFundSearchService';

interface FundAnalysisResult {
  schemeCode: string;
  schemeName: string;
  category: string;
  nav: number;
  navDate: string;
  fundHouse: string;
  aiScore: number;
  performanceScore: number;
  volatilityScore: number;
  expenseScore: number;
  overallRank: number;
}

interface CategoryTopFunds {
  category: string;
  funds: FundAnalysisResult[];
  lastUpdated: string;
}

export class FundAnalysisService {
  private static readonly CATEGORIES = [
    'Large Cap',
    'Mid Cap', 
    'Small Cap',
    'Multi Cap',
    'Flexi Cap',
    'ELSS',
    'Debt',
    'Hybrid',
    'Index',
    'Sectoral/Thematic'
  ];

  static async performFullMarketAnalysis(): Promise<CategoryTopFunds[]> {
    console.log('FundAnalysisService: Starting full market analysis...');
    
    try {
      // Get all available funds from the API
      const allFunds = await MutualFundSearchService.getAllFunds();
      console.log(`FundAnalysisService: Analyzing ${allFunds.length} funds`);

      // Get detailed information for all funds (in batches to avoid overwhelming the API)
      const batchSize = 50;
      const analysisResults: FundAnalysisResult[] = [];

      for (let i = 0; i < allFunds.length; i += batchSize) {
        const batch = allFunds.slice(i, i + batchSize);
        console.log(`FundAnalysisService: Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(allFunds.length/batchSize)}`);
        
        const batchCodes = batch.map(fund => fund.schemeCode.toString());
        const detailedResults = await MutualFundSearchService.getMultipleFundDetails(batchCodes);

        // Analyze each fund in the batch
        for (const fund of batch) {
          const details = detailedResults.get(fund.schemeCode.toString());
          if (details && details.nav > 0) {
            const analysis = this.analyzeFund(details);
            if (analysis) {
              analysisResults.push(analysis);
            }
          }
        }

        // Add delay between batches to be respectful to the API
        if (i + batchSize < allFunds.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      console.log(`FundAnalysisService: Completed analysis of ${analysisResults.length} funds`);

      // Group by category and get top 10 for each
      const categoryResults: CategoryTopFunds[] = [];

      for (const category of this.CATEGORIES) {
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

      console.log(`FundAnalysisService: Generated top 10 lists for ${categoryResults.length} categories`);
      return categoryResults;

    } catch (error) {
      console.error('FundAnalysisService: Error during market analysis:', error);
      throw error;
    }
  }

  private static analyzeFund(fundDetails: any): FundAnalysisResult | null {
    try {
      // Calculate performance score based on NAV trends (mock calculation)
      const performanceScore = this.calculatePerformanceScore(fundDetails);
      
      // Calculate volatility score (lower volatility = higher score)
      const volatilityScore = this.calculateVolatilityScore(fundDetails);
      
      // Calculate expense score (lower expense = higher score)
      const expenseScore = this.calculateExpenseScore(fundDetails);
      
      // Calculate overall AI score
      const aiScore = (performanceScore * 0.4) + (volatilityScore * 0.3) + (expenseScore * 0.3);

      return {
        schemeCode: fundDetails.schemeCode,
        schemeName: fundDetails.schemeName,
        category: fundDetails.category,
        nav: fundDetails.nav,
        navDate: fundDetails.navDate,
        fundHouse: fundDetails.fundHouse,
        aiScore: Math.round(aiScore * 10) / 10,
        performanceScore: Math.round(performanceScore * 10) / 10,
        volatilityScore: Math.round(volatilityScore * 10) / 10,
        expenseScore: Math.round(expenseScore * 10) / 10,
        overallRank: 0 // Will be set after sorting
      };
    } catch (error) {
      console.error('FundAnalysisService: Error analyzing fund:', fundDetails.schemeCode, error);
      return null;
    }
  }

  private static calculatePerformanceScore(fundDetails: any): number {
    // Mock performance calculation based on NAV and fund characteristics
    const baseScore = Math.min(fundDetails.nav / 100, 10); // Higher NAV generally indicates longer track record
    
    // Category-based adjustments
    let categoryMultiplier = 1.0;
    switch (fundDetails.category) {
      case 'Small Cap':
        categoryMultiplier = 1.2; // Higher potential returns
        break;
      case 'Mid Cap':
        categoryMultiplier = 1.1;
        break;
      case 'Large Cap':
        categoryMultiplier = 0.9; // More stable but lower returns
        break;
      case 'ELSS':
        categoryMultiplier = 1.05; // Tax benefits
        break;
      default:
        categoryMultiplier = 1.0;
    }

    // Add some randomness to simulate real performance analysis
    const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2

    return Math.min(baseScore * categoryMultiplier * randomFactor, 10);
  }

  private static calculateVolatilityScore(fundDetails: any): number {
    // Mock volatility calculation (in real implementation, would use historical data)
    let baseVolatility = 5.0; // Default volatility

    // Category-based volatility estimates
    switch (fundDetails.category) {
      case 'Small Cap':
        baseVolatility = 8.5;
        break;
      case 'Mid Cap':
        baseVolatility = 7.0;
        break;
      case 'Large Cap':
        baseVolatility = 4.5;
        break;
      case 'Debt':
        baseVolatility = 2.0;
        break;
      case 'Hybrid':
        baseVolatility = 3.5;
        break;
      default:
        baseVolatility = 6.0;
    }

    // Convert volatility to score (lower volatility = higher score)
    const volatilityScore = Math.max(10 - baseVolatility, 1);
    return volatilityScore + (Math.random() * 2 - 1); // Add some variance
  }

  private static calculateExpenseScore(fundDetails: any): number {
    // Mock expense ratio calculation
    let estimatedExpense = 1.5; // Default expense ratio

    // Fund house based estimates (some AMCs typically have lower expenses)
    if (fundDetails.fundHouse?.includes('UTI') || fundDetails.fundHouse?.includes('Index')) {
      estimatedExpense = 0.5;
    } else if (fundDetails.fundHouse?.includes('SBI') || fundDetails.fundHouse?.includes('HDFC')) {
      estimatedExpense = 1.0;
    }

    // Category adjustments
    if (fundDetails.category === 'Index') {
      estimatedExpense = 0.3;
    } else if (fundDetails.category === 'Debt') {
      estimatedExpense = 0.8;
    }

    // Convert expense ratio to score (lower expense = higher score)
    const expenseScore = Math.max(10 - (estimatedExpense * 3), 1);
    return expenseScore;
  }

  // Method to save analysis results to localStorage for quick access
  static saveAnalysisResults(results: CategoryTopFunds[]): void {
    try {
      localStorage.setItem('fund_analysis_results', JSON.stringify(results));
      localStorage.setItem('fund_analysis_timestamp', Date.now().toString());
      console.log('FundAnalysisService: Analysis results saved to localStorage');
    } catch (error) {
      console.error('FundAnalysisService: Error saving analysis results:', error);
    }
  }

  // Method to load analysis results from localStorage
  static loadAnalysisResults(): CategoryTopFunds[] | null {
    try {
      const results = localStorage.getItem('fund_analysis_results');
      const timestamp = localStorage.getItem('fund_analysis_timestamp');
      
      if (results && timestamp) {
        const ageInHours = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60);
        
        // Return cached results if less than 24 hours old
        if (ageInHours < 24) {
          console.log('FundAnalysisService: Returning cached analysis results');
          return JSON.parse(results);
        }
      }
      
      console.log('FundAnalysisService: No valid cached results found');
      return null;
    } catch (error) {
      console.error('FundAnalysisService: Error loading analysis results:', error);
      return null;
    }
  }

  // Get top funds for a specific category
  static getTopFundsForCategory(category: string, count: number = 10): FundAnalysisResult[] {
    const cachedResults = this.loadAnalysisResults();
    if (!cachedResults) return [];

    const categoryData = cachedResults.find(cat => cat.category === category);
    return categoryData ? categoryData.funds.slice(0, count) : [];
  }
}
