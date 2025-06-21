
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InvestmentStrategies = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          📋 Investment Strategies & Portfolio Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-4">Portfolio Construction Approaches</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2">Conservative (30-40%)</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Large, established NBFCs</li>
                  <li>• Diversified business models</li>
                  <li>• Strong parentage/backing</li>
                  <li>• Consistent dividend history</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2">Growth (40-50%)</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Mid-cap NBFCs with expansion plans</li>
                  <li>• Digital transformation leaders</li>
                  <li>• Niche segment specialists</li>
                  <li>• Strong management track record</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2">Speculative (10-20%)</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Emerging fintech NBFCs</li>
                  <li>• Turnaround opportunities</li>
                  <li>• New-age business models</li>
                  <li>• High-growth potential plays</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-4">Direct Stock Investment</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-green-700 mb-1">Large Cap NBFCs</h4>
                  <p className="text-sm text-green-600">Bajaj Finance, Shriram Finance, Mahindra Finance</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-1">Mid Cap NBFCs</h4>
                  <p className="text-sm text-green-600">Cholamandalam, L&T Finance, Tata Capital</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-1">Emerging Players</h4>
                  <p className="text-sm text-green-600">Digital-first NBFCs with strong tech platforms</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-4">Mutual Fund Route</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-1">Banking & Financial Funds</h4>
                  <p className="text-sm text-purple-600">Diversified exposure to entire financial sector</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-1">Sectoral ETFs</h4>
                  <p className="text-sm text-purple-600">Passive exposure to NBFC sector with lower costs</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-1">Thematic Funds</h4>
                  <p className="text-sm text-purple-600">Focused on financial inclusion or digital finance themes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
            <h3 className="font-semibold text-orange-800 mb-4">Key Investment Checklist</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Fundamental Analysis</h4>
                <ul className="text-sm text-orange-600 space-y-1">
                  <li>✓ Asset quality trends (NPA levels)</li>
                  <li>✓ Capital adequacy ratios</li>
                  <li>✓ Return on assets/equity</li>
                  <li>✓ Funding source diversification</li>
                  <li>✓ Management quality and track record</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Risk Assessment</h4>
                <ul className="text-sm text-orange-600 space-y-1">
                  <li>✓ Segment concentration risks</li>
                  <li>✓ Geographic concentration</li>
                  <li>✓ Interest rate sensitivity</li>
                  <li>✓ Regulatory compliance record</li>
                  <li>✓ Economic cycle vulnerability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentStrategies;
