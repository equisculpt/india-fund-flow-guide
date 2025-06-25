
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const IPOQuickSummary = () => {
  return (
    <Card className="mb-12 bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800 text-2xl">
          <span>⚡</span>
          IPO Quick Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600">₹200 Cr</div>
            <div className="text-sm text-blue-700 mt-1">Total Issue Size</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600">₹105-111</div>
            <div className="text-sm text-green-700 mt-1">Price Band</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600">135</div>
            <div className="text-sm text-purple-700 mt-1">Lot Size</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-orange-600">₹14,985</div>
            <div className="text-sm text-orange-700 mt-1">Min Investment</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPOQuickSummary;
