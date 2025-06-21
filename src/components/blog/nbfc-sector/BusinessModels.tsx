
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BusinessModels = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          💼 Business Models & Revenue Streams
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-4">Asset-Heavy Model</h3>
            <p className="text-sm text-blue-700 mb-3">Traditional lending with balance sheet exposure</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Direct lending to customers</li>
              <li>• Credit risk on balance sheet</li>
              <li>• Higher capital requirements</li>
              <li>• Examples: Bajaj Finance, Shriram</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-4">Asset-Light Model</h3>
            <p className="text-sm text-green-700 mb-3">Fee-based services with lower capital intensity</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Loan origination and servicing</li>
              <li>• Co-lending partnerships</li>
              <li>• Collection and recovery services</li>
              <li>• Examples: Fintech NBFCs</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-4">Hybrid Model</h3>
            <p className="text-sm text-purple-700 mb-3">Combination of both approaches</p>
            <ul className="text-xs text-purple-600 space-y-1">
              <li>• Selective balance sheet lending</li>
              <li>• Partnership-based distribution</li>
              <li>• Technology-enabled efficiency</li>
              <li>• Examples: HDB Financial, L&T Finance</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessModels;
