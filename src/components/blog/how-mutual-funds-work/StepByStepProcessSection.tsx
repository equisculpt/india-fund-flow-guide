
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StepByStepProcessSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Step-by-Step: How Your Money Flows in a Mutual Fund</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-blue-200"></div>
            
            <div className="flex items-start gap-4 pb-8">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">You Invest Money</h4>
                <p className="text-gray-700 mb-2">You invest ₹5,000 in "XYZ Large Cap Fund" through SIP or lump sum</p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-blue-800">Example: NAV today is ₹50. You get 5000 ÷ 50 = 100 units</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-8">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">Money Gets Pooled</h4>
                <p className="text-gray-700 mb-2">Your ₹5,000 + thousands of other investors' money = Large investment pool</p>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-green-800">Example: 10,000 investors × ₹5,000 each = ₹50 crore to invest</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-8">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">Fund Manager Invests</h4>
                <p className="text-gray-700 mb-2">Professional fund manager researches and buys stocks of different companies</p>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm text-purple-800">Example: Buys shares of Reliance (10%), TCS (8%), HDFC Bank (7%), etc.</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-8">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">Portfolio Value Changes</h4>
                <p className="text-gray-700 mb-2">As stock prices fluctuate, the total value of fund's investments changes daily</p>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="text-sm text-orange-800">Example: If portfolio grows by 10%, NAV increases from ₹50 to ₹55</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold">5</div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">You Benefit Proportionally</h4>
                <p className="text-gray-700 mb-2">Your investment value changes based on your share of the fund</p>
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm text-red-800">Example: Your 100 units × ₹55 new NAV = ₹5,500 (₹500 profit!)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepByStepProcessSection;
