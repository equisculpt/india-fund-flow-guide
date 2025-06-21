
interface ComparisonPageState {
  funds: any[];
}

export const generateSEOContent = (hasFundsToCompare: boolean, state: ComparisonPageState | null) => {
  if (hasFundsToCompare && state?.funds && state.funds.length > 0) {
    const fundNames = state.funds.map(fund => fund.schemeName).join(' vs ');
    return {
      title: `Compare ${fundNames} - AI Fund Analysis | SIP Brewery`,
      description: `AI-powered comparison of ${fundNames}. Get detailed analysis, performance metrics, risk assessment and investment recommendations from India's leading mutual fund platform.`,
      keywords: `${fundNames}, mutual fund comparison, AI fund analysis, performance comparison, investment research, SIP Brewery`
    };
  }
  
  return {
    title: "AI Mutual Fund Comparison Tool - Compare Best Mutual Funds 2024 | SIP Brewery",
    description: "Compare mutual funds with AI-powered analysis. Get detailed performance metrics, risk assessment, and investment recommendations. India's most advanced fund comparison tool.",
    keywords: "mutual fund comparison, AI fund analysis, best mutual funds 2024, fund comparison tool, investment research, performance analysis, SIP Brewery"
  };
};
