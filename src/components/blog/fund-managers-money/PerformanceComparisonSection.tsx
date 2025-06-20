
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PerformanceComparisonSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Real-World Performance: Regular vs Direct Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">Case Study: 10-Year Investment Journey (₹10,000 Monthly SIP)</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border border-blue-200">
                <h5 className="font-medium mb-3 text-blue-600">Regular Plan with Guidance</h5>
                <div className="text-sm space-y-2">
                  <p><strong>Expense Ratio:</strong> 2.25%</p>
                  <p><strong>Gross Returns:</strong> 14.5% (better fund selection)</p>
                  <p><strong>Net Returns:</strong> 12.25%</p>
                  <p><strong>Final Corpus:</strong> ₹23.2 Lakhs</p>
                  <p><strong>Total Investment:</strong> ₹12 Lakhs</p>
                  <p className="text-blue-600 font-semibold">Profit: ₹11.2 Lakhs</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded border border-red-200">
                <h5 className="font-medium mb-3 text-red-600">Direct Plan (DIY)</h5>
                <div className="text-sm space-y-2">
                  <p><strong>Expense Ratio:</strong> 1.5%</p>
                  <p><strong>Gross Returns:</strong> 12% (average fund selection)</p>
                  <p><strong>Net Returns:</strong> 10.5%</p>
                  <p><strong>Final Corpus:</strong> ₹19.8 Lakhs</p>
                  <p><strong>Total Investment:</strong> ₹12 Lakhs</p>
                  <p className="text-red-600 font-semibold">Profit: ₹7.8 Lakhs</p>
                </div>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded mt-4 text-center">
              <p className="font-semibold text-green-800">Regular Plan Advantage: ₹3.4 Lakhs Extra!</p>
              <p className="text-sm text-green-700 mt-1">Despite paying 0.75% higher fees, professional guidance delivered ₹3.4 lakhs more wealth</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Why This Happens:</h5>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• <strong>Better Fund Selection:</strong> Professionals avoid underperforming funds that DIY investors often choose</li>
              <li>• <strong>Behavioral Control:</strong> Prevents panic selling during market crashes (2008, 2020, etc.)</li>
              <li>• <strong>Systematic Approach:</strong> Regular rebalancing and portfolio optimization</li>
              <li>• <strong>Tax Efficiency:</strong> Better tax planning and optimization strategies</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceComparisonSection;
