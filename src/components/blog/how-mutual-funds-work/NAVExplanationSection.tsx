
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NAVExplanationSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Understanding NAV (Net Asset Value) - The Heart of Mutual Funds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
            <h4 className="font-semibold text-xl mb-4">What is NAV?</h4>
            <p className="text-gray-700 mb-4">
              NAV is like the "price per share" of a mutual fund. It tells you how much one unit of the mutual fund costs today.
            </p>
            
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
              <h5 className="font-semibold mb-2">NAV Formula:</h5>
              <div className="text-center text-lg">
                <strong>NAV = (Total Fund Value - Expenses) ÷ Total Units Outstanding</strong>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-green-600">Real Example Calculation:</h5>
              <div className="space-y-2 text-sm">
                <p><strong>Total Portfolio Value:</strong> ₹100 crores</p>
                <p><strong>Fund Expenses:</strong> ₹1 crore</p>
                <p><strong>Net Assets:</strong> ₹99 crores</p>
                <p><strong>Total Units:</strong> 1.98 crore units</p>
                <p className="border-t pt-2"><strong>NAV = ₹99 crores ÷ 1.98 crore = ₹50</strong></p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-blue-600">Key NAV Facts:</h5>
              <ul className="space-y-2 text-sm">
                <li>• NAV is calculated daily after market closes</li>
                <li>• All transactions happen at closing NAV</li>
                <li>• Higher NAV doesn't mean expensive fund</li>
                <li>• NAV reflects per-unit value, not performance</li>
                <li>• New funds start with NAV of ₹10</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NAVExplanationSection;
