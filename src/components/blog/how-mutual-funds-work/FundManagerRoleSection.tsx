
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FundManagerRoleSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>The Role of Fund Manager - Your Investment Captain</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-gray-700">
            A fund manager is like the captain of a ship, navigating your money through the turbulent waters of financial markets.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h5 className="font-semibold mb-2">Research & Analysis</h5>
              <p className="text-sm text-gray-700">Studies company financials, market trends, economic indicators</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h5 className="font-semibold mb-2">Investment Decisions</h5>
              <p className="text-sm text-gray-700">Decides which stocks to buy, sell, or hold based on analysis</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h5 className="font-semibold mb-2">Risk Management</h5>
              <p className="text-sm text-gray-700">Ensures portfolio doesn't take excessive risks</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-3">A Day in the Life of a Fund Manager:</h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Morning (7-9 AM):</strong> Review global markets, overnight news</p>
                <p><strong>Pre-market (9-9:15 AM):</strong> Plan day's trades, check portfolio</p>
                <p><strong>Market Hours (9:15 AM-3:30 PM):</strong> Execute trades, monitor positions</p>
              </div>
              <div>
                <p><strong>Post-market (3:30-6 PM):</strong> Review day's performance, research</p>
                <p><strong>Evening (6-8 PM):</strong> Meet company management, attend calls</p>
                <p><strong>Night:</strong> Read research reports, plan strategy</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundManagerRoleSection;
