
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const IPOQuickSummary = () => {
  return (
    <Card className="mb-8 bg-yellow-50 border-yellow-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <span className="text-2xl">⚡</span>
          Quick Investment Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">₹56.72 Cr</div>
            <div className="text-sm text-blue-700">Total Issue Size</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">₹84-88</div>
            <div className="text-sm text-green-700">Price Band</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">1600</div>
            <div className="text-sm text-purple-700">Lot Size</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">₹140,800</div>
            <div className="text-sm text-orange-700">Min Investment</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPOQuickSummary;
