
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, TrendingUp, Shield, Target, Brain } from 'lucide-react';

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

interface UserProfile {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentGoals: string[];
  timeHorizon: number;
  monthlyInvestment: number;
  currentAge: number;
}

const PersonalizedRecommendations = () => {
  const [recommendations, setRecommendations] = useState<FundRecommendation[]>([]);
  const [userProfile] = useState<UserProfile>({
    riskTolerance: 'moderate',
    investmentGoals: ['retirement', 'wealth creation'],
    timeHorizon: 15,
    monthlyInvestment: 25000,
    currentAge: 35
  });

  useEffect(() => {
    generatePersonalizedRecommendations();
  }, []);

  const generatePersonalizedRecommendations = () => {
    // Mock AI-powered recommendations based on user profile
    const mockRecommendations: FundRecommendation[] = [
      {
        id: '1',
        schemeCode: '120503',
        schemeName: 'Axis Long Term Equity Fund',
        category: 'ELSS',
        aiScore: 9.2,
        riskLevel: 'Moderate',
        expectedReturn: 14.5,
        expenseRatio: 1.25,
        aum: 15000,
        matchScore: 95,
        investmentAmount: 8000,
        reasons: [
          'Perfect tax-saving solution for your profile',
          'Consistent long-term performance',
          'Matches your risk tolerance',
          'Suitable for 15-year investment horizon'
        ]
      },
      {
        id: '2',
        schemeCode: '120716',
        schemeName: 'HDFC Top 100 Fund',
        category: 'Large Cap',
        aiScore: 8.8,
        riskLevel: 'Moderate',
        expectedReturn: 12.8,
        expenseRatio: 1.05,
        aum: 25000,
        matchScore: 88,
        investmentAmount: 10000,
        reasons: [
          'Stable large-cap exposure for portfolio balance',
          'Low volatility suits your profile',
          'Strong fund management track record',
          'Good liquidity and consistent returns'
        ]
      },
      {
        id: '3',
        schemeCode: '119551',
        schemeName: 'Mirae Asset Emerging Bluechip Fund',
        category: 'Mid Cap',
        aiScore: 8.5,
        riskLevel: 'High',
        expectedReturn: 16.2,
        expenseRatio: 1.45,
        aum: 18000,
        matchScore: 82,
        investmentAmount: 7000,
        reasons: [
          'Higher growth potential for wealth creation',
          'Diversified mid-cap exposure',
          'Aligns with long-term investment horizon',
          'Complements large-cap holdings'
        ]
      }
    ];

    setRecommendations(mockRecommendations);
  };

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <CardTitle>AI-Powered Fund Recommendations</CardTitle>
          </div>
          <p className="text-sm text-gray-600">
            Personalized recommendations based on your risk profile, goals, and market conditions
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Your Investment Profile</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Risk Tolerance:</span>
                <p className="font-medium capitalize">{userProfile.riskTolerance}</p>
              </div>
              <div>
                <span className="text-blue-700">Time Horizon:</span>
                <p className="font-medium">{userProfile.timeHorizon} years</p>
              </div>
              <div>
                <span className="text-blue-700">Monthly Budget:</span>
                <p className="font-medium">₹{userProfile.monthlyInvestment.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-blue-700">Age:</span>
                <p className="font-medium">{userProfile.currentAge} years</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((fund, index) => (
              <Card key={fund.id} className="border-l-4 border-l-blue-500">
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
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Portfolio Allocation Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-green-700">Total Monthly SIP:</span>
                <p className="font-bold text-lg">₹{recommendations.reduce((sum, fund) => sum + fund.investmentAmount, 0).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-green-700">Expected Portfolio Return:</span>
                <p className="font-bold text-lg">{(recommendations.reduce((sum, fund) => sum + fund.expectedReturn * fund.investmentAmount, 0) / recommendations.reduce((sum, fund) => sum + fund.investmentAmount, 0)).toFixed(1)}%</p>
              </div>
              <div>
                <span className="text-green-700">Risk Level:</span>
                <p className="font-bold text-lg">Moderate</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedRecommendations;
