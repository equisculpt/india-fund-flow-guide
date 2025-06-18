
import React from 'react';

interface FundRecommendation {
  id: string;
  schemeCode: string;
  schemeName: string;
  category: string;
  aiScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  expectedReturn: number;
  expenseRatio: number;
  aum: number;
  reasons: string[];
  matchScore: number;
  investmentAmount: number;
}

interface PortfolioSummaryCardProps {
  recommendations: FundRecommendation[];
}

const PortfolioSummaryCard: React.FC<PortfolioSummaryCardProps> = ({ recommendations }) => {
  const totalSIP = recommendations.reduce((sum, fund) => sum + fund.investmentAmount, 0);
  const expectedReturn = recommendations.reduce((sum, fund) => sum + fund.expectedReturn * fund.investmentAmount, 0) / totalSIP;

  return (
    <div className="mt-6 p-4 bg-green-50 rounded-lg">
      <h4 className="font-semibold text-green-900 mb-2">Portfolio Allocation Summary</h4>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-green-700">Total Monthly SIP:</span>
          <p className="font-bold text-lg">₹{totalSIP.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-green-700">Expected Portfolio Return:</span>
          <p className="font-bold text-lg">{expectedReturn.toFixed(1)}%</p>
        </div>
        <div>
          <span className="text-green-700">Risk Level:</span>
          <p className="font-bold text-lg">Moderate</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCard;
