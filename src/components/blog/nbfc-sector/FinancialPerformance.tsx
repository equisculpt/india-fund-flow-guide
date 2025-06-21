
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const FinancialPerformance = () => {
  const performanceData = [
    { year: 'FY20', roa: 2.1, roe: 12.5, gnpa: 4.8, car: 18.2 },
    { year: 'FY21', roa: 1.2, roe: 7.8, gnpa: 6.2, car: 19.5 },
    { year: 'FY22', roa: 1.8, roe: 10.2, gnpa: 4.1, car: 18.8 },
    { year: 'FY23', roa: 2.4, roe: 13.1, gnpa: 3.2, car: 19.2 },
    { year: 'FY24', roa: 2.7, roe: 14.8, gnpa: 2.8, car: 19.6 },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          📈 Financial Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Key Metrics Dashboard */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">2.7%</div>
              <div className="text-sm text-green-700">Avg RoA (FY24)</div>
              <div className="text-xs text-green-500">+30 bps YoY</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">14.8%</div>
              <div className="text-sm text-blue-700">Avg RoE (FY24)</div>
              <div className="text-xs text-blue-500">+170 bps YoY</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">2.8%</div>
              <div className="text-sm text-red-700">Avg GNPA (FY24)</div>
              <div className="text-xs text-red-500">-40 bps YoY</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">19.6%</div>
              <div className="text-sm text-purple-700">Avg CAR (FY24)</div>
              <div className="text-xs text-purple-500">Well above minimum</div>
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Profitability Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value}%`, name === 'roa' ? 'RoA' : 'RoE']} />
                <Line type="monotone" dataKey="roa" stroke="#10B981" strokeWidth={3} name="roa" />
                <Line type="monotone" dataKey="roe" stroke="#3B82F6" strokeWidth={3} name="roe" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Quality Analysis */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Asset Quality & Capital Adequacy</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value}%`, name === 'gnpa' ? 'GNPA' : 'CAR']} />
                <Bar dataKey="gnpa" fill="#EF4444" name="gnpa" />
                <Bar dataKey="car" fill="#8B5CF6" name="car" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Insights */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-yellow-800">Key Performance Insights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Strong recovery in profitability post-COVID</li>
                <li>• Asset quality significantly improved from FY21 lows</li>
                <li>• Capital adequacy ratios remain robust across sector</li>
                <li>• Digital transformation improving operational efficiency</li>
              </ul>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• NIM expansion due to better pricing and mix</li>
                <li>• Cost-to-income ratios optimizing with scale</li>
                <li>• Collection efficiency back to pre-pandemic levels</li>
                <li>• Credit costs normalizing across most segments</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialPerformance;
