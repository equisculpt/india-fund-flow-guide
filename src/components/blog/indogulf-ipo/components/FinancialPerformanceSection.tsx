
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinancialPerformanceSectionProps {
  financialData: Array<{
    year: string;
    revenue: number;
    ebitda: number;
    pat: number;
    ebitdaMargin: number;
    netMargin: number;
    assets: number;
    netWorth: number;
  }>;
  balanceSheetData: Array<{
    year: string;
    totalBorrowing: number;
    netWorth: number;
    debtToEquity: number;
    reserves: number;
  }>;
  annualizedFY25Projections: {
    revenue: number;
    pat: number;
    ebitda: number;
  };
}

const FinancialPerformanceSection = ({ 
  financialData, 
  balanceSheetData, 
  annualizedFY25Projections 
}: FinancialPerformanceSectionProps) => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span>💰</span>
          Financial Performance Analysis (Restated Consolidated)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Financial Metrics Table */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Financial Metrics (Restated Consolidated)</h3>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Metric</TableHead>
                  <TableHead>FY22</TableHead>
                  <TableHead>FY23</TableHead>
                  <TableHead>FY24</TableHead>
                  <TableHead>9M FY25*</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Revenue (₹ Cr)</TableCell>
                  <TableCell>490.23</TableCell>
                  <TableCell>552.19</TableCell>
                  <TableCell>555.79</TableCell>
                  <TableCell className="font-semibold text-green-600">466.31</TableCell>
                  <TableCell className="text-green-600 font-semibold">Steady</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">EBITDA (₹ Cr)</TableCell>
                  <TableCell>47.24</TableCell>
                  <TableCell>49.04</TableCell>
                  <TableCell>55.74</TableCell>
                  <TableCell className="font-semibold text-green-600">44.78</TableCell>
                  <TableCell className="text-green-600 font-semibold">Growing</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">PAT (₹ Cr)</TableCell>
                  <TableCell>26.36</TableCell>
                  <TableCell>22.42</TableCell>
                  <TableCell>28.23</TableCell>
                  <TableCell className="font-semibold text-blue-600">21.68</TableCell>
                  <TableCell className="text-blue-600 font-semibold">Recovering</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">EBITDA Margin (%)</TableCell>
                  <TableCell>9.6%</TableCell>
                  <TableCell>8.9%</TableCell>
                  <TableCell>10.0%</TableCell>
                  <TableCell>9.6%</TableCell>
                  <TableCell className="text-blue-600">Stable</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Net Margin (%)</TableCell>
                  <TableCell>5.4%</TableCell>
                  <TableCell>4.1%</TableCell>
                  <TableCell>5.1%</TableCell>
                  <TableCell>4.6%</TableCell>
                  <TableCell className="text-blue-600">Consistent</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Assets (₹ Cr)</TableCell>
                  <TableCell>413.59</TableCell>
                  <TableCell>517.51</TableCell>
                  <TableCell>542.25</TableCell>
                  <TableCell className="font-semibold text-green-600">597.81</TableCell>
                  <TableCell className="text-green-600 font-semibold">Growing</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Net Worth (₹ Cr)</TableCell>
                  <TableCell>180.51</TableCell>
                  <TableCell>203.25</TableCell>
                  <TableCell>231.65</TableCell>
                  <TableCell className="font-semibold text-green-600">265.43</TableCell>
                  <TableCell className="text-green-600 font-semibold">Strengthening</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Borrowing (₹ Cr)</TableCell>
                  <TableCell>101.38</TableCell>
                  <TableCell>189.22</TableCell>
                  <TableCell>154.56</TableCell>
                  <TableCell className="font-semibold text-orange-600">206.30</TableCell>
                  <TableCell className="text-orange-600 font-semibold">Elevated</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Reserves & Surplus (₹ Cr)</TableCell>
                  <TableCell>160.21</TableCell>
                  <TableCell>183.15</TableCell>
                  <TableCell>211.45</TableCell>
                  <TableCell className="font-semibold text-green-600">216.64</TableCell>
                  <TableCell className="text-green-600 font-semibold">Growing</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-sm text-gray-600 mt-2">
              *9M FY25 data is for 9 months ended December 31, 2024 (unaudited)
            </p>
          </div>

          {/* Annualized Projections */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">📊 FY25 Annualized Projections (Based on 9M Performance)</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">₹{annualizedFY25Projections.revenue.toFixed(0)} Cr</div>
                <div className="text-sm text-blue-700 mt-1">Projected Revenue</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">₹{annualizedFY25Projections.pat.toFixed(1)} Cr</div>
                <div className="text-sm text-green-700 mt-1">Projected PAT</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">₹{annualizedFY25Projections.ebitda.toFixed(1)} Cr</div>
                <div className="text-sm text-purple-700 mt-1">Projected EBITDA</div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              Note: These are mathematical projections based on 9M performance and may not reflect actual FY25 results due to seasonal variations.
            </p>
          </div>

          {/* Valuation Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24.3x</div>
              <div className="text-sm text-blue-700 mt-1">P/E Ratio</div>
              <div className="text-xs text-gray-600 mt-1">At upper band ₹111</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹555.79 Cr</div>
              <div className="text-sm text-green-700 mt-1">Revenue (FY24)</div>
              <div className="text-xs text-gray-600 mt-1">Latest full year</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">₹28.23 Cr</div>
              <div className="text-sm text-purple-700 mt-1">PAT (FY24)</div>
              <div className="text-xs text-gray-600 mt-1">Latest full year</div>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">10.0%</div>
              <div className="text-sm text-orange-700 mt-1">EBITDA Margin</div>
              <div className="text-xs text-gray-600 mt-1">FY24 performance</div>
            </div>
          </div>

          {/* Revenue and Profitability Chart */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Financial Trends Over Time</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value, name) => {
                  const nameStr = String(name);
                  if (['revenue', 'ebitda', 'pat'].includes(nameStr)) return [`₹${value} Cr`, nameStr.toUpperCase()];
                  return [`${value}%`, nameStr];
                }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue" />
                <Line type="monotone" dataKey="ebitda" stroke="#10b981" strokeWidth={3} name="EBITDA" />
                <Line type="monotone" dataKey="pat" stroke="#ef4444" strokeWidth={3} name="PAT" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Balance Sheet Strength */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Balance Sheet Strength Analysis</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={balanceSheetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value} Cr`, 'Amount']} />
                <Legend />
                <Bar dataKey="netWorth" fill="#10b981" name="Net Worth" />
                <Bar dataKey="totalBorrowing" fill="#ef4444" name="Total Borrowing" />
                <Bar dataKey="reserves" fill="#8b5cf6" name="Reserves & Surplus" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-700">
                <strong>Key Observation:</strong> Total borrowing increased to ₹206.30 Cr in 9M FY25 from ₹154.56 Cr in FY24, 
                pushing D/E ratio to 0.78x. However, reserves & surplus continued growing to ₹216.64 Cr, indicating 
                healthy internal accruals.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialPerformanceSection;
