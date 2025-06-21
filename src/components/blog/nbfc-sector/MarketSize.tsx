
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const MarketSize = () => {
  const aumData = [
    { year: 'FY20', aum: 23.4, growth: 8.2 },
    { year: 'FY21', aum: 24.1, growth: 3.0 },
    { year: 'FY22', aum: 26.8, growth: 11.2 },
    { year: 'FY23', aum: 28.9, growth: 7.8 },
    { year: 'FY24', aum: 32.7, growth: 13.1 },
  ];

  const segmentData = [
    { segment: 'Vehicle Finance', share: 28, amount: 9.2 },
    { segment: 'Personal Loans', share: 18, amount: 5.9 },
    { segment: 'MSME Loans', share: 16, amount: 5.2 },
    { segment: 'Gold Loans', share: 12, amount: 3.9 },
    { segment: 'Housing Finance', share: 11, amount: 3.6 },
    { segment: 'Others', share: 15, amount: 4.9 },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          📊 Market Size & Growth Trajectory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Market Overview */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">₹32.7</div>
              <div className="text-sm text-blue-700">Lakh Crore AUM</div>
              <div className="text-xs text-blue-500">FY24</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">13.1%</div>
              <div className="text-sm text-green-700">YoY Growth</div>
              <div className="text-xs text-green-500">FY24</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">22%</div>
              <div className="text-sm text-purple-700">Credit Market Share</div>
              <div className="text-xs text-purple-500">vs Banks</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">15.2%</div>
              <div className="text-sm text-orange-700">5-Year CAGR</div>
              <div className="text-xs text-orange-500">FY19-24</div>
            </div>
          </div>

          {/* AUM Growth Chart */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">NBFC Sector AUM Growth (₹ Lakh Crore)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={aumData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'aum' ? `₹${value} Lakh Cr` : `${value}%`,
                    name === 'aum' ? 'AUM' : 'Growth Rate'
                  ]}
                />
                <Bar dataKey="aum" fill="#3B82F6" name="aum" />
                <Line type="monotone" dataKey="growth" stroke="#10B981" strokeWidth={3} name="growth" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Segment-wise Breakdown */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Segment-wise AUM Distribution (FY24)</h3>
            <div className="grid gap-3">
              {segmentData.map((segment, index) => (
                <div key={segment.segment} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${index % 6 === 0 ? 'bg-blue-500' : 
                      index % 6 === 1 ? 'bg-green-500' : 
                      index % 6 === 2 ? 'bg-purple-500' : 
                      index % 6 === 3 ? 'bg-yellow-500' : 
                      index % 6 === 4 ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                    <span className="font-medium">{segment.segment}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{segment.share}%</div>
                    <div className="text-sm text-gray-600">₹{segment.amount} L Cr</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-indigo-800">Market Insights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-indigo-700">
                <li>• Vehicle finance remains the largest segment at 28%</li>
                <li>• Personal loans showing fastest growth at 25%+ CAGR</li>
                <li>• MSME lending gaining traction post-COVID recovery</li>
                <li>• Gold loans provide counter-cyclical stability</li>
              </ul>
              <ul className="space-y-2 text-sm text-indigo-700">
                <li>• Digital transformation accelerating customer acquisition</li>
                <li>• Rural penetration increasing with fintech partnerships</li>
                <li>• Co-lending with banks creating new opportunities</li>
                <li>• ESG focus driving sustainable finance initiatives</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSize;
