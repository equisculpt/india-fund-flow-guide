
import { FundData, FundAnalysisData } from './types.ts';

export const transformFundData = (funds: FundData[]): FundAnalysisData[] => {
  return funds.map((fund: FundData) => ({
    name: fund.schemeName,
    category: fund.category,
    fundHouse: fund.fundHouse,
    currentNAV: fund.nav,
    navDate: fund.navDate,
    performance: {
      oneMonth: fund.returns1M || 0,
      twoMonth: fund.returns2M || 0,
      threeMonth: fund.returns3M || 0,
      sixMonth: fund.returns6M || 0,
      oneYear: fund.returns1Y || 0,
      twoYear: fund.returns2Y || 0,
      threeYear: fund.returns3Y || 0,
      fourYear: fund.returns4Y || 0,
      fiveYear: fund.returns5Y || 0
    },
    financialMetrics: {
      expenseRatio: fund.expenseRatio || 0,
      aum: fund.aum || 0,
      sharpeRatio: fund.sharpeRatio || 0,
      beta: fund.beta || 1,
      alpha: fund.alpha || 0,
      volatility: fund.volatility || 0
    },
    fundManager: {
      tenure: fund.fundManagerTenure || 0,
      experience: fund.fundManagerExperience || 'Not available'
    }
  }));
};
