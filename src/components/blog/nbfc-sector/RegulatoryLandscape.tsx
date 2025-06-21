
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RegulatoryLandscape = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          ⚖️ Regulatory Landscape & RBI Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-red-800">Key Regulatory Changes (2021-2025)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Scale-based regulation framework introduced</li>
                <li>• Enhanced governance norms for NBFCs</li>
                <li>• Stricter asset classification norms</li>
                <li>• Minimum net owned fund requirements increased</li>
              </ul>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Digital lending guidelines (2022)</li>
                <li>• Fair practices code strengthened</li>
                <li>• Co-lending framework formalized</li>
                <li>• Climate risk management guidelines</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">15%</div>
              <div className="text-sm text-blue-700">Min CAR Required</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹20 Cr</div>
              <div className="text-sm text-green-700">Min NOF (Upper Layer)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-purple-700">Max Single Exposure</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">400%</div>
              <div className="text-sm text-orange-700">Max Group Exposure</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulatoryLandscape;
