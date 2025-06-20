
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, HeadphonesIcon, TrendingUp, Shield } from 'lucide-react';

const RegularPlansBenefitsSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600" />
          Why Regular Plans Often Deliver Better Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                1. Professional Fund Selection
              </h4>
              <p className="text-sm text-gray-700 mb-2">Expert distributors help you choose the right funds from 1000+ options</p>
              <div className="text-xs space-y-1">
                <p><strong>Value:</strong> Avoid underperforming funds</p>
                <p><strong>Impact:</strong> 2-3% better annual returns</p>
                <p><strong>Cost saved:</strong> Prevents major losses</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <HeadphonesIcon className="h-5 w-5 text-green-600" />
                2. Behavioral Coaching
              </h4>
              <p className="text-sm text-gray-700 mb-2">Prevents emotional decisions during market volatility</p>
              <div className="text-xs space-y-1">
                <p><strong>Value:</strong> Prevents panic selling/buying</p>
                <p><strong>Impact:</strong> 1-2% annual improvement</p>
                <p><strong>Benefit:</strong> Stays invested during crashes</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                3. Portfolio Rebalancing
              </h4>
              <p className="text-sm text-gray-700 mb-2">Regular portfolio review and rebalancing</p>
              <div className="text-xs space-y-1">
                <p><strong>Value:</strong> Optimal asset allocation</p>
                <p><strong>Impact:</strong> 0.5-1% annual benefit</p>
                <p><strong>Service:</strong> Quarterly reviews included</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-600" />
                4. Goal-Based Planning
              </h4>
              <p className="text-sm text-gray-700 mb-2">Comprehensive financial planning and goal mapping</p>
              <div className="text-xs space-y-1">
                <p><strong>Value:</strong> Structured investment approach</p>
                <p><strong>Impact:</strong> Better goal achievement</p>
                <p><strong>Benefit:</strong> Tax optimization included</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegularPlansBenefitsSection;
