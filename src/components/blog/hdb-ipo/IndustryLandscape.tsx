
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IndustryLandscape = () => {
  const competitorData = [
    { company: 'Bajaj Finance', aum: 95000, branches: 4200, segment: 'Diversified NBFC' },
    { company: 'HDB Financial', aum: 70482, branches: 1492, segment: 'Bank Subsidiary' },
    { company: 'Shriram Finance', aum: 65000, branches: 3000, segment: 'Asset Finance' },
    { company: 'Cholamandalam', aum: 45000, branches: 1200, segment: 'Vehicle Finance' },
    { company: 'Mahindra Finance', aum: 40000, branches: 1300, segment: 'Rural Finance' }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🌏 Industry Landscape & Competitive Position
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">NBFC Sector Overview</h3>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Sector Growth Metrics</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• NBFC AUM CAGR: ~11% (FY19-24)</li>
                  <li>• Credit growth outpacing banks</li>
                  <li>• Focus on digital transformation</li>
                  <li>• Regulatory framework strengthening</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Key Trends</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Co-lending partnerships with banks</li>
                  <li>• Fintech collaboration increasing</li>
                  <li>• Digital-first lending models</li>
                  <li>• ESG and financial inclusion focus</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Competitive Positioning</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="company" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value} Cr`, 'AUM']} />
                  <Bar dataKey="aum" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Market Position</h4>
              <div className="text-2xl font-bold text-purple-600 mb-1">#2</div>
              <div className="text-sm text-purple-700">Among NBFCs by AUM</div>
              <div className="text-xs text-purple-600 mt-2">After Bajaj Finance</div>
            </div>
            
            <div className="p-4 bg-teal-50 rounded-lg">
              <h4 className="font-semibold text-teal-800 mb-2">Unique Advantage</h4>
              <div className="text-lg font-bold text-teal-600 mb-1">HDFC Bank</div>
              <div className="text-sm text-teal-700">Parent Support</div>
              <div className="text-xs text-teal-600 mt-2">Low-cost funding access</div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Growth Strategy</h4>
              <div className="text-lg font-bold text-orange-600 mb-1">Tech + Scale</div>
              <div className="text-sm text-orange-700">Digital Innovation</div>
              <div className="text-xs text-orange-600 mt-2">With branch network</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryLandscape;
