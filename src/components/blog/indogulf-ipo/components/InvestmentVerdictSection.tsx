
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InvestmentVerdictSection = () => {
  return (
    <Card className="mb-12 bg-gradient-to-r from-blue-50 to-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span>🎯</span>
          Investment Verdict & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-green-100 p-6 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-4">👍 Why It Might Appeal</h4>
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
              <h4 className="font-semibold text-orange-800 mb-4">👎 Points of Caution</h4>
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
            <h4 className="text-2xl font-bold text-blue-800 mb-4 text-center">🎯 Final Recommendation</h4>
            <div className="space-y-4 text-blue-700">
              <p className="text-lg font-semibold text-center">
                <span className="bg-orange-200 px-4 py-2 rounded-full">SUBSCRIBE WITH SELECTIVE CAUTION</span>
              </p>
              <p className="text-center leading-relaxed">
                Indogulf Cropsciences presents a mixed investment proposition. While the integrated model, 
                export focus, and strategic fund utilization are positives, the lower margins, fluctuating 
                performance, and premium valuation warrant careful consideration. Best suited for investors 
                with sector expertise and medium to long-term investment horizon.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-xl font-bold text-blue-600">3-5 Years</div>
                  <div className="text-sm">Investment Horizon</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-xl font-bold text-orange-600">10-15%</div>
                  <div className="text-sm">Expected Returns</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-xl font-bold text-red-600">Medium-High</div>
                  <div className="text-sm">Risk Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentVerdictSection;
