
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InvestmentThesis = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          💰 Investment Thesis & Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-green-800">Why Invest in NBFC Sector?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Structural Growth Story</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• India's credit penetration still low</li>
                  <li>• Rising income levels driving demand</li>
                  <li>• Financial inclusion creating new markets</li>
                  <li>• Demographics supporting credit expansion</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Competitive Advantages</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Specialized focus vs. universal banks</li>
                  <li>• Faster decision-making processes</li>
                  <li>• Better understanding of niche segments</li>
                  <li>• Technology-driven efficiency gains</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Quality NBFCs</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Strong parentage/backing</li>
                <li>• Diversified portfolio</li>
                <li>• Consistent performance track record</li>
                <li>• Robust risk management</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">Growth NBFCs</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• High growth potential segments</li>
                <li>• Geographic expansion opportunities</li>
                <li>• Digital transformation leaders</li>
                <li>• Innovative product offerings</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-3">Value NBFCs</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Trading below intrinsic value</li>
                <li>• Temporary challenges being resolved</li>
                <li>• Strong fundamentals with low valuations</li>
                <li>• Turnaround stories with potential</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-indigo-800">Investment Strategies</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">Conservative Approach</h4>
                <ul className="text-sm text-indigo-600 space-y-1">
                  <li>• Focus on large, established NBFCs</li>
                  <li>• Diversified across multiple segments</li>
                  <li>• Strong capital adequacy ratios</li>
                  <li>• Consistent dividend track record</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">Growth-Oriented Approach</h4>
                <ul className="text-sm text-indigo-600 space-y-1">
                  <li>• Emerging digital lending platforms</li>
                  <li>• Niche segment specialists</li>
                  <li>• Technology-enabled efficiency plays</li>
                  <li>• Rural/semi-urban focused NBFCs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentThesis;
