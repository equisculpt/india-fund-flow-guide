
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HiddenCostsSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>The Hidden Costs of DIY Direct Plan Investing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-gray-700">
            While direct plans appear cheaper, DIY investing comes with hidden costs that often exceed the savings:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h5 className="font-semibold text-red-600">❌ Common DIY Mistakes</h5>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>• Choosing funds based on past performance only</li>
                  <li>• Panic selling during market downturns</li>
                  <li>• Over-diversification with 10+ funds</li>
                  <li>• Ignoring asset allocation principles</li>
                  <li>• Poor timing of investments and withdrawals</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h5 className="font-semibold text-green-600">✅ Regular Plan Advantages</h5>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>• Professional fund research and selection</li>
                  <li>• Emotional coaching during volatility</li>
                  <li>• Optimal portfolio construction</li>
                  <li>• Regular performance monitoring</li>
                  <li>• Tax-efficient investment strategies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Real Data: DIY Investment Mistakes</h5>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">65%</div>
                <p>of DIY investors underperform the market</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">₹2.5L</div>
                <p>average loss per investor due to poor timing</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">3-4%</div>
                <p>annual underperformance vs guided investors</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HiddenCostsSection;
