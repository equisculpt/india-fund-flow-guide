
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InvestmentHighlights = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <span className="text-2xl">✅</span>
            Investment Positives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span className="text-green-700">Strong export orientation (55% of revenue)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span className="text-green-700">Backward integration with technical grade manufacturing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span className="text-green-700">30+ years of experience and established market presence</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span className="text-green-700">Diversified product portfolio across multiple segments</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <span className="text-2xl">⚠️</span>
            Risk Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span className="text-red-700">Seasonal and monsoon-dependent business cycles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span className="text-red-700">Working capital intensive operations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span className="text-red-700">SME platform has limited liquidity and higher volatility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span className="text-red-700">Raw material price volatility can impact margins</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentHighlights;
