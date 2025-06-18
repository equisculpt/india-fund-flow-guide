
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, TrendingUp, Shield, Target } from 'lucide-react';

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

interface FundRecommendationCardProps {
  fund: FundRecommendation;
  index: number;
}

const FundRecommendationCard: React.FC<FundRecommendationCardProps> = ({ fund, index }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ELSS': return <Shield className="h-4 w-4" />;
      case 'Large Cap': return <Star className="h-4 w-4" />;
      case 'Mid Cap': return <TrendingUp className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {getCategoryIcon(fund.category)}
              <h4 className="font-semibold">{fund.schemeName}</h4>
              <Badge variant="outline">{fund.category}</Badge>
            </div>
            <p className="text-sm text-gray-600">Scheme Code: {fund.schemeCode}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-lg font-bold text-blue-600">{fund.matchScore}%</span>
              <span className="text-sm text-gray-600">match</span>
            </div>
            <Badge className={getRiskColor(fund.riskLevel)}>{fund.riskLevel} Risk</Badge>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">AI Score:</span>
            <Progress value={fund.aiScore * 10} className="flex-1 h-2" />
            <span className="text-sm font-bold">{fund.aiScore}/10</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-600">Expected Return:</span>
            <p className="font-medium text-green-600">{fund.expectedReturn}%</p>
          </div>
          <div>
            <span className="text-gray-600">Expense Ratio:</span>
            <p className="font-medium">{fund.expenseRatio}%</p>
          </div>
          <div>
            <span className="text-gray-600">AUM:</span>
            <p className="font-medium">₹{fund.aum.toLocaleString()} Cr</p>
          </div>
          <div>
            <span className="text-gray-600">Suggested SIP:</span>
            <p className="font-medium text-blue-600">₹{fund.investmentAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="font-medium mb-2">Why this fund is recommended for you:</h5>
          <ul className="text-sm space-y-1">
            {fund.reasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            Start SIP - ₹{fund.investmentAmount.toLocaleString()}
          </Button>
          <Button variant="outline">View Details</Button>
          <Button variant="ghost">Compare</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundRecommendationCard;
