
interface AIPortfolioInsightsProps {
  portfolioData: any;
}

const AIPortfolioInsights = ({ portfolioData }: AIPortfolioInsightsProps) => {
  if (!portfolioData) return null;

  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <h4 className="font-semibold text-blue-800 mb-2 text-center">Portfolio Intelligence</h4>
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <span className="text-blue-600 font-medium">Holdings:</span>
          <p>{portfolioData.holdings.length} stocks</p>
        </div>
        <div className="text-center">
          <span className="text-blue-600 font-medium">AUM:</span>
          <p>₹{portfolioData.aum.toFixed(0)} Cr</p>
        </div>
        <div className="text-center">
          <span className="text-blue-600 font-medium">Turnover:</span>
          <p>{portfolioData.portfolioTurnover.toFixed(1)}% annually</p>
        </div>
      </div>
    </div>
  );
};

export default AIPortfolioInsights;
