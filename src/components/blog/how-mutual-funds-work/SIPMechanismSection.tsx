
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SIPMechanismSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>How SIP (Systematic Investment Plan) Works</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-gray-700">
            SIP is like a monthly savings plan, but instead of keeping money in a savings account, you're buying mutual fund units every month.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">SIP Journey Example:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Month</th>
                    <th className="text-left p-2">Investment</th>
                    <th className="text-left p-2">NAV</th>
                    <th className="text-left p-2">Units Bought</th>
                    <th className="text-left p-2">Total Units</th>
                    <th className="text-left p-2">Investment Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Jan</td>
                    <td className="p-2">₹5,000</td>
                    <td className="p-2">₹50</td>
                    <td className="p-2">100</td>
                    <td className="p-2">100</td>
                    <td className="p-2">₹5,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Feb</td>
                    <td className="p-2">₹5,000</td>
                    <td className="p-2">₹45</td>
                    <td className="p-2">111.11</td>
                    <td className="p-2">211.11</td>
                    <td className="p-2">₹9,500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Mar</td>
                    <td className="p-2">₹5,000</td>
                    <td className="p-2">₹55</td>
                    <td className="p-2">90.91</td>
                    <td className="p-2">302.02</td>
                    <td className="p-2">₹16,611</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Notice how you buy more units when NAV is low (Feb) and fewer when NAV is high (Mar). This is called Rupee Cost Averaging!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2">SIP Benefits:</h5>
              <ul className="text-sm space-y-1">
                <li>• Disciplined investing</li>
                <li>• Rupee cost averaging</li>
                <li>• Power of compounding</li>
                <li>• No market timing needed</li>
                <li>• Flexible amounts</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2">SIP vs Lump Sum:</h5>
              <ul className="text-sm space-y-1">
                <li>• SIP: Lower risk, consistent investing</li>
                <li>• Lump sum: Higher risk, timing matters</li>
                <li>• SIP: Better for beginners</li>
                <li>• Lump sum: Good when markets are low</li>
                <li>• Most experts recommend SIP</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SIPMechanismSection;
