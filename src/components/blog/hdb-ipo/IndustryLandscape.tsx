
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IndustryLandscape = () => {
  const nbfcMarketData = [
    { company: 'Bajaj Finance', aum: 310000, marketShare: 9.5, segment: 'Diversified NBFC' },
    { company: 'Shriram Finance', aum: 210000, marketShare: 6.4, segment: 'Asset Finance' },
    { company: 'Mahindra Finance', aum: 110000, marketShare: 3.4, segment: 'Rural Finance' },
    { company: 'Cholamandalam', aum: 100000, marketShare: 3.1, segment: 'Vehicle Finance' },
    { company: 'Tata Capital', aum: 80000, marketShare: 2.4, segment: 'Diversified' },
    { company: 'L&T Finance', aum: 75000, marketShare: 2.3, segment: 'Infrastructure' },
    { company: 'HDB Financial', aum: 70037, marketShare: 2.1, segment: 'Bank Subsidiary' }
  ];

  const sectorGrowthMetrics = [
    { metric: "Total NBFC AUM (FY24)", value: "₹32.7 lakh crore", change: "+11% YoY" },
    { metric: "Credit Market Share", value: "22% of total credit", change: "Expanding" },
    { metric: "Digital Adoption", value: "65% of new loans", change: "+15% YoY" },
    { metric: "NBFC Count (Active)", value: "9,500+ registered", change: "Consolidating" }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🌏 NBFC Industry Landscape & Competitive Positioning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Sector Overview & Growth Metrics</h3>
              <div className="space-y-3">
                {sectorGrowthMetrics.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-blue-900">{item.metric}</div>
                      <div className="text-sm text-blue-700">{item.change}</div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">{item.value}</div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Industry Tailwinds</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• India's credit-to-GDP ratio: 57% (vs 100%+ in developed markets)</li>
                  <li>• Rising credit demand from MSMEs and retail segment</li>
                  <li>• Bank-NBFC co-lending partnerships increasing</li>
                  <li>• Digital transformation driving efficiency gains</li>
                  <li>• Regulatory framework becoming more supportive</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Leading NBFCs by AUM (₹ Crores)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={nbfcMarketData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="company" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={11}
                  />
                  <YAxis 
                    tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K Cr`}
                    fontSize={11}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`₹${(value/1000).toFixed(0)}K Cr`, 'AUM']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Bar dataKey="aum" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <h4 className="font-semibold text-purple-800 mb-2">Market Ranking</h4>
              <div className="text-2xl font-bold text-purple-600 mb-1">#7</div>
              <div className="text-sm text-purple-700">By AUM Size</div>
              <div className="text-xs text-purple-600 mt-1">Among top NBFCs</div>
            </div>
            
            <div className="p-4 bg-teal-50 rounded-lg text-center">
              <h4 className="font-semibold text-teal-800 mb-2">Bank Subsidiary</h4>
              <div className="text-lg font-bold text-teal-600 mb-1">HDFC Bank</div>
              <div className="text-sm text-teal-700">100% Ownership</div>
              <div className="text-xs text-teal-600 mt-1">Funding advantage</div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <h4 className="font-semibold text-orange-800 mb-2">Geographic Focus</h4>
              <div className="text-lg font-bold text-orange-600 mb-1">Tier 2-4</div>
              <div className="text-sm text-orange-700">Cities</div>
              <div className="text-xs text-orange-600 mt-1">1,029 locations</div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg text-center">
              <h4 className="font-semibold text-red-800 mb-2">Asset Quality</h4>
              <div className="text-lg font-bold text-red-600 mb-1">2.44%</div>
              <div className="text-sm text-red-700">Gross NPA</div>
              <div className="text-xs text-red-600 mt-1">Industry leading</div>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-3">🏆 HDB Financial's Competitive Positioning</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-yellow-900 mb-2">Strengths vs Peers:</div>
                <ul className="text-yellow-800 space-y-1">
                  <li>• Strong parent backing (HDFC Bank)</li>
                  <li>• Extensive branch network in semi-urban areas</li>
                  <li>• Secured lending focus (77% of portfolio)</li>
                  <li>• Improving asset quality trajectory</li>
                  <li>• Diversified revenue streams (BPO services)</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-yellow-900 mb-2">Competitive Challenges:</div>
                <ul className="text-yellow-800 space-y-1">
                  <li>• Smaller scale vs top 6 NBFCs (Bajaj, Shriram, etc.)</li>
                  <li>• Higher operational costs due to branch model</li>
                  <li>• Intense competition in core segments</li>
                  <li>• Need for digital transformation acceleration</li>
                  <li>• Margin pressure from fintech disruption</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryLandscape;
