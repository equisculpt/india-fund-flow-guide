
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReturnsCalculationSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>How Mutual Fund Returns Are Calculated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-purple-600">Absolute Returns (Simple)</h5>
              <p className="text-sm text-gray-700 mb-3">Used for investments less than 1 year</p>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm font-mono">Return % = ((Current Value - Invested Amount) / Invested Amount) × 100</p>
                <p className="text-sm mt-2"><strong>Example:</strong> Invested ₹10,000, current value ₹11,500</p>
                <p className="text-sm">Return = (11,500 - 10,000) / 10,000 × 100 = 15%</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-green-600">Annualized Returns (CAGR)</h5>
              <p className="text-sm text-gray-700 mb-3">Used for investments more than 1 year</p>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm font-mono">CAGR = ((Final Value / Initial Value)^(1/Years)) - 1</p>
                <p className="text-sm mt-2"><strong>Example:</strong> ₹10,000 became ₹15,000 in 3 years</p>
                <p className="text-sm">CAGR = (15,000/10,000)^(1/3) - 1 = 14.47%</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">💡 Understanding Different Return Metrics:</h5>
            <ul className="text-sm space-y-1">
              <li><strong>1-day return:</strong> How much fund gained/lost yesterday</li>
              <li><strong>1-week return:</strong> Performance over last 7 days</li>
              <li><strong>1-year return:</strong> Most commonly looked at metric</li>
              <li><strong>3-year return:</strong> Shows consistency through market cycles</li>
              <li><strong>5-year return:</strong> Best indicator of long-term performance</li>
              <li><strong>Since inception:</strong> Returns since fund was launched</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnsCalculationSection;
