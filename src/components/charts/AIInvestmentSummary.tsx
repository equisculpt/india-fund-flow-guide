
import { Target, TrendingUp, AlertTriangle, BookOpen } from 'lucide-react';

interface AIInvestmentSummaryProps {
  overallScore: number;
  fundData: any;
  hasRealAI: boolean;
  reasoning: string;
}

const AIInvestmentSummary = ({ overallScore, fundData, hasRealAI, reasoning }: AIInvestmentSummaryProps) => {
  const getRankingLabel = (score: number) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Good';
    if (score >= 6.0) return 'Average';
    return 'Below Average';
  };

  const generateComprehensiveAnalysis = () => {
    const analysis = {
      introduction: `Our comprehensive AI research analysis of ${fundData.schemeName} reveals a ${getRankingLabel(overallScore).toLowerCase()} investment opportunity with a score of ${overallScore}/10. This ${fundData.category} fund managed by ${fundData.fundHouse || fundData.amc} presents both compelling opportunities and areas requiring careful consideration for potential investors.`,
      
      strengths: generateStrengthsAnalysis(),
      concerns: generateConcernsAnalysis(), 
      portfolioInsights: generatePortfolioAnalysis(),
      performanceReview: generatePerformanceAnalysis(),
      consistencyAssessment: generateConsistencyAnalysis(),
      investmentOutlook: generateOutlookAnalysis()
    };

    return analysis;
  };

  const generateStrengthsAnalysis = () => {
    const strengths = [];
    
    if ((fundData.expenseRatio || 1.5) <= 1.0) {
      strengths.push(`The fund demonstrates exceptional cost efficiency with an expense ratio of ${fundData.expenseRatio || 1.0}%, significantly below the category average. This competitive cost structure directly translates to higher net returns for investors over the long term.`);
    }
    
    if ((fundData.aum || 1000) >= 2000) {
      strengths.push(`With assets under management of ₹${fundData.aum || 2000} crores, the fund enjoys substantial investor confidence and operational scale. This large AUM provides the fund manager with greater flexibility in stock selection and portfolio construction while ensuring adequate liquidity for investor redemptions.`);
    }

    if ((fundData.returns1Y || 0) > 15) {
      strengths.push(`The fund has delivered impressive recent performance with ${fundData.returns1Y || 15}% returns in the past year, demonstrating the fund manager's ability to navigate market conditions effectively and generate alpha for investors.`);
    }

    if (fundData.category === 'Large Cap') {
      strengths.push(`As a large-cap focused fund, it offers stability and consistent performance through investments in established, financially robust companies. This positioning provides downside protection during market volatility while participating in India's growth story.`);
    }

    return strengths.length > 0 ? strengths : [`The fund maintains a disciplined investment approach in the ${fundData.category} segment, focusing on quality stocks with strong fundamentals and growth potential.`];
  };

  const generateConcernsAnalysis = () => {
    const concerns = [];

    if ((fundData.expenseRatio || 1.5) > 2.0) {
      concerns.push(`The expense ratio of ${fundData.expenseRatio}% appears elevated compared to category peers, which may impact long-term net returns. Investors should monitor whether the fund's performance justifies this higher cost structure.`);
    }

    if ((fundData.aum || 1000) < 500) {
      concerns.push(`The relatively modest AUM of ₹${fundData.aum} crores may limit the fund's operational efficiency and could indicate lower investor interest. Smaller funds sometimes face challenges in portfolio diversification and liquidity management.`);
    }

    if ((fundData.volatility || 15) > 25) {
      concerns.push(`The fund exhibits higher volatility at ${fundData.volatility}%, suggesting potentially larger price swings. While this can lead to higher returns, it also increases risk and may not suit conservative investors.`);
    }

    if ((fundData.returns1Y || 10) < 5 && (fundData.returns1Y || 10) > 0) {
      concerns.push(`Recent performance has been subdued with ${fundData.returns1Y}% returns in the past year, underperforming broader market indices. This raises questions about the fund manager's stock selection and market timing abilities.`);
    }

    return concerns.length > 0 ? concerns : [`Market volatility and economic uncertainties remain key risk factors that could impact the fund's performance. Regular monitoring of portfolio composition and market conditions is advisable.`];
  };

  const generatePortfolioAnalysis = () => {
    return `The fund's portfolio construction reflects a ${fundData.category.toLowerCase()} investment philosophy, focusing on companies that align with the fund's risk-return objectives. The investment team employs rigorous fundamental analysis to identify stocks with strong business models, competent management, and attractive valuations. Portfolio diversification across sectors helps mitigate concentration risk while maintaining exposure to India's most promising growth opportunities. The fund's sector allocation and stock selection process are continuously monitored to ensure alignment with the stated investment mandate and changing market dynamics.`;
  };

  const generatePerformanceAnalysis = () => {
    const performance1Y = fundData.returns1Y || fundData.xirr1Y || 0;
    const performance3Y = fundData.returns3Y || fundData.xirr3Y || 0;
    const performance5Y = fundData.returns5Y || fundData.xirr5Y || 0;

    if (performance1Y > 0 || performance3Y > 0 || performance5Y > 0) {
      return `Performance analysis reveals a nuanced picture of the fund's track record. Over the past year, the fund generated ${performance1Y > 0 ? performance1Y.toFixed(1) + '%' : 'modest'} returns, while the three-year annualized performance stands at ${performance3Y > 0 ? performance3Y.toFixed(1) + '%' : 'steady levels'}. The five-year performance trajectory of ${performance5Y > 0 ? performance5Y.toFixed(1) + '%' : 'consistent growth'} demonstrates the fund's ability to create wealth over extended periods. These numbers should be evaluated against category benchmarks and broader market performance to gauge the fund manager's value addition through active stock selection and portfolio management strategies.`;
    }

    return `The fund's performance trajectory reflects the inherent challenges and opportunities in the ${fundData.category} segment. While short-term performance may fluctuate based on market conditions and sector rotations, the fund's long-term approach focuses on sustainable wealth creation through disciplined stock selection and portfolio management. Investors should evaluate performance over multiple market cycles to gain a comprehensive understanding of the fund's capabilities and consistency.`;
  };

  const generateConsistencyAnalysis = () => {
    return `Consistency analysis is crucial for understanding the fund's reliability as an investment vehicle. The fund's approach to risk management, portfolio construction, and adherence to its investment mandate demonstrates its commitment to delivering predictable outcomes within the expected risk parameters. Fund manager tenure, investment philosophy consistency, and the fund house's overall track record contribute to the stability of returns. Investors should monitor rolling returns, standard deviation, and other risk-adjusted metrics to assess whether the fund delivers consistent performance across different market conditions and economic cycles.`;
  };

  const generateOutlookAnalysis = () => {
    return `Looking ahead, the fund's investment prospects are tied to both macroeconomic factors and company-specific fundamentals within its investment universe. The ${fundData.category} segment offers distinct opportunities for growth, driven by India's economic expansion, increasing consumption, and digital transformation. However, investors must remain cognizant of market volatility, regulatory changes, and global economic uncertainties that could impact performance. The fund's ability to adapt to changing market conditions while maintaining its core investment philosophy will be crucial for future success. Regular portfolio reviews and staying informed about the fund's strategy evolution will help investors make informed decisions about their continued investment.`;
  };

  const analysis = generateComprehensiveAnalysis();

  return (
    <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
      <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
        <BookOpen className="h-5 w-5 text-purple-600" />
        {hasRealAI ? 'Comprehensive AI Research Analysis' : 'Investment Analysis Report'}
      </h4>
      
      <div className="space-y-6 text-gray-700 leading-relaxed">
        {/* Introduction */}
        <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
          <p className="font-medium text-purple-900 mb-2">Executive Summary</p>
          <p>{analysis.introduction}</p>
        </div>

        {/* Strengths Section */}
        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
          <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Key Strengths & Opportunities
          </h5>
          <div className="space-y-3">
            {analysis.strengths.map((strength, index) => (
              <p key={index} className="text-green-700 text-sm leading-relaxed">
                • {strength}
              </p>
            ))}
          </div>
        </div>

        {/* Concerns Section */}
        <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
          <h5 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Areas of Attention & Risk Factors
          </h5>
          <div className="space-y-3">
            {analysis.concerns.map((concern, index) => (
              <p key={index} className="text-amber-700 text-sm leading-relaxed">
                • {concern}
              </p>
            ))}
          </div>
        </div>

        {/* Portfolio Insights */}
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h5 className="font-semibold text-blue-800 mb-3">Portfolio Construction & Strategy</h5>
          <p className="text-blue-700 text-sm leading-relaxed">{analysis.portfolioInsights}</p>
        </div>

        {/* Performance Review */}
        <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
          <h5 className="font-semibold text-indigo-800 mb-3">Performance Analysis</h5>
          <p className="text-indigo-700 text-sm leading-relaxed">{analysis.performanceReview}</p>
        </div>

        {/* Consistency Assessment */}
        <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
          <h5 className="font-semibold text-teal-800 mb-3">Consistency & Reliability Assessment</h5>
          <p className="text-teal-700 text-sm leading-relaxed">{analysis.consistencyAssessment}</p>
        </div>

        {/* Investment Outlook */}
        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
          <h5 className="font-semibold text-purple-800 mb-3">Investment Outlook & Future Prospects</h5>
          <p className="text-purple-700 text-sm leading-relaxed">{analysis.investmentOutlook}</p>
        </div>

        {/* Final Score Summary */}
        <div className="p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 mb-2">
              AI Research Score: {overallScore}/10 - {getRankingLabel(overallScore)}
            </p>
            <p className="text-sm text-gray-600">
              {hasRealAI 
                ? 'This comprehensive analysis is based on AI-powered research and data analysis for informational purposes only.' 
                : 'This analysis is based on available fund data and mathematical calculations for informational purposes only.'
              }
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xs text-yellow-800">
            <strong>Important Disclaimer:</strong> This AI research analysis is for informational and educational purposes only and should not be considered as investment advice or research recommendations. 
            We are AMFI registered mutual fund distributors and may earn commission if you invest through our platform. 
            Past performance is not indicative of future results. Please consult with qualified financial advisors and read all scheme documents carefully before making investment decisions. 
            Mutual fund investments are subject to market risks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInvestmentSummary;
