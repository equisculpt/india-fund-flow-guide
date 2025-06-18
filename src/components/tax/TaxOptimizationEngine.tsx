
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingDown, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface TaxSavingRecommendation {
  id: string;
  type: 'ELSS' | 'PPF' | 'NSC' | 'Tax_Harvesting';
  title: string;
  description: string;
  potentialSaving: number;
  investmentRequired: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  timeHorizon: number;
  priority: 'High' | 'Medium' | 'Low';
}

const TaxOptimizationEngine = () => {
  const [recommendations, setRecommendations] = useState<TaxSavingRecommendation[]>([]);
  const [currentTaxSaving, setCurrentTaxSaving] = useState(78000);
  const [maxTaxSaving] = useState(150000);
  const [taxBracket] = useState(30);

  useEffect(() => {
    generateTaxRecommendations();
  }, []);

  const generateTaxRecommendations = () => {
    const mockRecommendations: TaxSavingRecommendation[] = [
      {
        id: '1',
        type: 'ELSS',
        title: 'Complete ELSS Investment',
        description: 'Invest remaining ₹72,000 in ELSS funds to maximize 80C deduction',
        potentialSaving: 21600,
        investmentRequired: 72000,
        riskLevel: 'Medium',
        timeHorizon: 3,
        priority: 'High'
      },
      {
        id: '2',
        type: 'Tax_Harvesting',
        title: 'Tax Loss Harvesting',
        description: 'Book losses in underperforming funds to offset capital gains',
        potentialSaving: 8500,
        investmentRequired: 0,
        riskLevel: 'Low',
        timeHorizon: 0,
        priority: 'High'
      },
      {
        id: '3',
        type: 'ELSS',
        title: 'Switch to Direct Plans',
        description: 'Move from Regular to Direct plans to save on expense ratios',
        potentialSaving: 12000,
        investmentRequired: 0,
        riskLevel: 'Low',
        timeHorizon: 0,
        priority: 'Medium'
      }
    ];
    setRecommendations(mockRecommendations);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Medium': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'High': return <Shield className="h-4 w-4 text-red-600" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-600" />
            <CardTitle>Tax Optimization Dashboard</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600">Current Tax Savings</h4>
              <p className="text-2xl font-bold text-green-600">₹{currentTaxSaving.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600">Potential Additional Savings</h4>
              <p className="text-2xl font-bold text-blue-600">₹{recommendations.reduce((sum, rec) => sum + rec.potentialSaving, 0).toLocaleString()}</p>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600">Tax Bracket</h4>
              <p className="text-2xl font-bold text-gray-800">{taxBracket}%</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>80C Utilization</span>
              <span>₹{currentTaxSaving.toLocaleString()} / ₹{maxTaxSaving.toLocaleString()}</span>
            </div>
            <Progress value={(currentTaxSaving / maxTaxSaving) * 100} className="h-3" />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Tax Optimization Recommendations</h4>
            {recommendations.map((rec) => (
              <Card key={rec.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold">{rec.title}</h5>
                        <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">₹{rec.potentialSaving.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">potential saving</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      {getRiskIcon(rec.riskLevel)}
                      <span>{rec.riskLevel} Risk</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Investment:</span>
                      <p className="font-medium">₹{rec.investmentRequired.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Lock-in:</span>
                      <p className="font-medium">{rec.timeHorizon} years</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <p className="font-medium">{rec.type}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Implement Now</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxOptimizationEngine;
