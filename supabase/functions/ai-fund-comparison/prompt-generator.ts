
import { FundAnalysisData } from './types.ts';
import { getMarketContext } from './market-context.ts';

export const generateAIPrompt = (fundAnalysisData: FundAnalysisData[], fundsCount: number): string => {
  const marketContext = getMarketContext();

  return `
As an expert financial analyst providing research insights for mutual fund comparison, please provide a comprehensive comparison of the following ${fundsCount} mutual funds. Consider the current market environment and provide detailed research insights:

CURRENT MARKET CONTEXT:
${marketContext}

FUNDS TO COMPARE:
${fundAnalysisData.map((fund, index) => `
${index + 1}. ${fund.name}
   - Category: ${fund.category}
   - Fund House: ${fund.fundHouse}
   - Current NAV: ₹${fund.currentNAV}
   - AUM: ₹${fund.financialMetrics.aum} Crores
   - Expense Ratio: ${fund.financialMetrics.expenseRatio}%
   
   Performance Returns:
   - 1 Month: ${fund.performance.oneMonth}%
   - 2 Month: ${fund.performance.twoMonth}%
   - 3 Month: ${fund.performance.threeMonth}%
   - 6 Month: ${fund.performance.sixMonth}%
   - 1 Year: ${fund.performance.oneYear}%
   - 2 Year: ${fund.performance.twoYear}%
   - 3 Year: ${fund.performance.threeYear}%
   - 4 Year: ${fund.performance.fourYear}%
   - 5 Year: ${fund.performance.fiveYear}%
   
   Risk Metrics:
   - Sharpe Ratio: ${fund.financialMetrics.sharpeRatio}
   - Beta: ${fund.financialMetrics.beta}
   - Alpha: ${fund.financialMetrics.alpha}
   - Volatility: ${fund.financialMetrics.volatility}%
   
   Fund Manager:
   - Tenure: ${fund.fundManager.tenure} years
   - Experience: ${fund.fundManager.experience}
`).join('\n')}

IMPORTANT: As this analysis is being prepared for AMFI registered mutual fund distributors (not SEBI registered investment advisors), please ensure compliance with AMFI regulations:

1. DO NOT use terms like "BUY", "SELL", "STRONG BUY", "STRONG SELL"
2. Instead use: "SUITABLE", "CONSIDER", "REVIEW", "CAUTION", "AVOID"
3. Emphasize that this is research for informational purposes only
4. Include appropriate disclaimers about commission earning and need for professional advice

Based on the current market context provided above, analyze the current market phase and provide your assessment. Consider factors like market volatility, sectoral trends, liquidity conditions, and economic indicators to determine the current phase (Recovery, Growth, Peak, Correction, etc.).

Please provide your analysis in the following JSON format:

{
  "overallWinner": {
    "fundName": "Name of the fund that appears most suitable overall",
    "aiScore": 8.5,
    "reasoning": "Detailed explanation of why this fund appears most suitable for research purposes"
  },
  "individualAnalysis": [
    {
      "fundName": "Fund Name",
      "aiScore": 8.5,
      "rating": "SUITABLE",
      "confidence": 85,
      "strengths": ["List of key strengths"],
      "concerns": ["List of concerns"],
      "performanceAnalysis": "Detailed performance analysis",
      "riskAnalysis": "Risk assessment",
      "fundManagerAnalysis": "Fund manager evaluation",
      "expenseAnalysis": "Expense ratio evaluation",
      "recommendation": "Research-based insights with investment horizon considerations"
    }
  ],
  "categoryComparison": {
    "bestForShortTerm": "Fund name that may be suitable for 6-12 months",
    "bestForMediumTerm": "Fund name that may be suitable for 2-3 years", 
    "bestForLongTerm": "Fund name that may be suitable for 5+ years",
    "lowestRisk": "Relatively safer fund option",
    "highestPotential": "Fund with higher growth potential (with higher risk)"
  },
  "marketContext": {
    "currentMarketPhase": "Your assessment of current market phase based on the context provided",
    "allocationAdvice": "Portfolio allocation research insights based on current market conditions",
    "timingAdvice": "Investment timing research insights considering current market phase"
  },
  "keyInsights": [
    "Important research insight 1",
    "Important research insight 2", 
    "Important research insight 3"
  ],
  "conclusionAndRecommendation": "Final comprehensive research conclusion for informational purposes"
}

Provide ratings as: SUITABLE, CONSIDER, REVIEW, CAUTION, AVOID
Score funds on a scale of 1-10 where 10 is exceptional
Be thorough, analytical, and provide actionable research insights based on the comprehensive data and current market context provided.
Remember: This is research analysis for informational purposes only, not investment advice.
`;
};
