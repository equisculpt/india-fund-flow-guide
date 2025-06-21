
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MarketOpportunities = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🌟 Market Opportunities & Industry Outlook
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">Industry Tailwinds</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Global CRO market growing at ~10% CAGR</li>
              <li>• Increased outsourcing by pharma companies</li>
              <li>• New Drugs and Clinical Trial Rules 2019</li>
              <li>• Government PLI schemes supporting CROs</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">Growth Catalysts</h4>
            <ul className="text-sm text-green-700 space-y-2">
              <li>• Rising demand from biotech & generics</li>
              <li>• Decentralized & digital trial platforms</li>
              <li>• India's skilled workforce advantage</li>
              <li>• Regulatory harmonization globally</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOpportunities;
