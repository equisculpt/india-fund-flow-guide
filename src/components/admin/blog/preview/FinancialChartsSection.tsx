
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const FinancialChartsSection = () => {
  const financialData = [
    { metric: 'Revenue (₹Cr)', value: 174.1, year: 'FY23' },
    { metric: 'EBITDA (₹Cr)', value: 25.8, year: 'FY23' },
    { metric: 'PAT (₹Cr)', value: 12.9, year: 'FY23' },
  ];

  const performanceData = [
    { quarter: 'FY22', revenue: 137.2, pat: 10.3 },
    { quarter: 'FY23', revenue: 174.1, pat: 12.9 },
    { quarter: '9M FY24', revenue: 192.5, pat: 16.2 },
  ];

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Financial Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            performance: { label: "Performance", color: "#3b82f6" }
          }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue (₹Cr)" />
                <Line type="monotone" dataKey="pat" stroke="#10b981" strokeWidth={3} name="PAT (₹Cr)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            Key Financial Metrics (FY23)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            value: { label: "Value", color: "#10b981" }
          }} className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default FinancialChartsSection;
