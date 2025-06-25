
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ResearchVerdictSection = () => {
  return (
    <Card className="mb-12 bg-gradient-to-r from-blue-50 to-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span>🎯</span>
          Research Verdict & Analysis Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-green-100 p-6 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-4">👍 Positive Research Findings</h4>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Integrated operations with backward integration advantages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Strong export diversification reducing domestic dependency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Growing asset base and strengthening balance sheet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Strategic fund utilization for debt reduction and capacity expansion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Beneficiary of China+1 strategy and global supply chain shifts</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-100 p-6 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-800 mb-4">👎 Areas of Concern</h4>
              <ul className="space-y-3 text-orange-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Premium valuation at 24.3x P/E vs sector fundamentals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Lower margins compared to industry leaders indicate operational challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Fluctuating revenue and profitability patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Working capital intensive business model</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Cyclical nature of agricultural business</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-100 p-8 rounded-lg border-2 border-blue-300">
            <h4 className="text-2xl font-bold text-blue-800 mb-4 text-center">🎯 Research Conclusion</h4>
            <div className="space-y-4 text-blue-700">
              <p className="text-lg font-semibold text-center">
                <span className="bg-blue-200 px-4 py-2 rounded-full">MIXED RISK-REWARD PROFILE</span>
              </p>
              <p className="text-center leading-relaxed">
                Our research analysis indicates that Indogulf Cropsciences presents a mixed proposition. 
                While the integrated model, export focus, and strategic fund utilization are positive factors, 
                the lower margins, fluctuating performance, and premium valuation present areas of concern. 
                The company shows potential but requires careful evaluation of individual risk tolerance and portfolio objectives.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-xl font-bold text-blue-600">3-5 Years</div>
                  <div className="text-sm">Research Horizon</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-xl font-bold text-orange-600">Medium</div>
                  <div className="text-sm">Growth Potential</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-xl font-bold text-red-600">Medium-High</div>
                  <div className="text-sm">Risk Assessment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchVerdictSection;
