
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { revenueData, marginData } from '@/data/veedaIPOData';

const FinancialCharts = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          📊 Financial Performance (FY22-FY24)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-center">Revenue & Profitability Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`₹${value} Cr`, name]} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} name="Revenue" />
                <Line type="monotone" dataKey="ebitda" stroke="#16a34a" strokeWidth={2} name="EBITDA" />
                <Line type="monotone" dataKey="pat" stroke="#dc2626" strokeWidth={2} name="PAT" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-center">Margin & ROCE Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                <Legend />
                <Bar dataKey="ebitdaMargin" fill="#3b82f6" name="EBITDA Margin %" />
                <Bar dataKey="patMargin" fill="#10b981" name="PAT Margin %" />
                <Bar dataKey="roce" fill="#f59e0b" name="ROCE %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📈 Key Financial Insights</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Revenue grew at ~23% CAGR over 3 years (₹248Cr to ₹376Cr)</li>
            <li>• EBITDA margins remained stable around 24-25%</li>
            <li>• ROCE improved annually from 12.5% to 13.5%</li>
            <li>• Consistent profitability with PAT growth from ₹29.6Cr to ₹42.3Cr</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialCharts;
