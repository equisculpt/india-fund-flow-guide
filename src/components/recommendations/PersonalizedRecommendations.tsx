
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import UserProfileCard from './UserProfileCard';
import FundRecommendationCard from './FundRecommendationCard';
import PortfolioSummaryCard from './PortfolioSummaryCard';

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
          <UserProfileCard userProfile={userProfile} />

          <div className="space-y-4">
            {recommendations.map((fund, index) => (
              <FundRecommendationCard 
                key={fund.id} 
                fund={fund} 
                index={index} 
              />
            ))}
          </div>

          <PortfolioSummaryCard recommendations={recommendations} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedRecommendations;
