
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GrowthProspects = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🚀 Growth Prospects & Market Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Market Tailwinds</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• India's credit-to-GDP ratio still low vs. global peers</li>
                <li>• Rising rural incomes and entrepreneurship</li>
                <li>• Government focus on MSME credit expansion</li>
                <li>• Digital India driving financial inclusion</li>
                <li>• Young demographics creating credit demand</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">Strategic Advantages</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• Cross-selling opportunities with HDFC Bank</li>
                <li>• Technology-led risk assessment and collections</li>
                <li>• Asset-light BPO services scalability</li>
                <li>• Branch network providing competitive moat</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">Future Growth Drivers</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• Digital lending platform expansion</li>
                <li>• AI-powered underwriting capabilities</li>
                <li>• Partnership with fintech ecosystem</li>
                <li>• Geographic expansion in tier 2/3 cities</li>
                <li>• Product innovation in consumer finance</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">11%</div>
                <div className="text-sm text-orange-700">NBFC Sector CAGR</div>
                <div className="text-xs text-orange-600">(FY19-24)</div>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">₹2.5T</div>
                <div className="text-sm text-teal-700">Fresh Capital</div>
                <div className="text-xs text-teal-600">For Growth</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthProspects;
