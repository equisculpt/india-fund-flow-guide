
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DecisionGuideSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>When to Choose Regular Plans vs Direct Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 bg-green-50">
              <h4 className="font-semibold text-lg mb-3 text-green-600">Choose Regular Plans If:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>You're new to mutual fund investing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>You don't have time for regular portfolio monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>You tend to make emotional investment decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>You want comprehensive financial planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>You have multiple financial goals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>You value ongoing professional support</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-green-100 rounded">
                <p className="text-xs text-green-800"><strong>Best for:</strong> 90% of investors who benefit from professional guidance</p>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-semibold text-lg mb-3 text-blue-600">Choose Direct Plans If:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>You have 5+ years of investing experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>You can dedicate 2-3 hours monthly for research</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>You have strong emotional discipline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>You understand risk management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>You can stick to systematic investing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>You have simple investment goals</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-blue-100 rounded">
                <p className="text-xs text-blue-800"><strong>Best for:</strong> 10% of experienced, disciplined investors</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h5 className="font-semibold mb-2 text-yellow-800">💡 Professional Recommendation:</h5>
            <p className="text-sm text-yellow-700">
              Even experienced investors often benefit from regular plans for behavioral coaching during market extremes. 
              The 0.5-1% additional cost is typically recovered through better decision-making during volatile periods.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DecisionGuideSection;
