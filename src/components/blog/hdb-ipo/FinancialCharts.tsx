
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const FinancialCharts = () => {
  const financialData = [
    { year: 'FY22', revenue: 10350.8, nii: 5509.4, pat: 1011.4, aum: 58258.9 },
    { year: 'FY23', revenue: 11306.5, nii: 6491.2, pat: 1959.1, aum: 61591.4 },
    { year: 'FY24', revenue: 12529.8, nii: 7676.0, pat: 2387.1, aum: 70482.5 }
  ];

  const ratioData = [
    { year: 'FY22', roa: 1.7, roe: 5.9, grossNpa: 4.5, netNpa: 3.8, car: 19.8 },
    { year: 'FY23', roa: 2.8, roe: 10.4, grossNpa: 2.4, netNpa: 1.7, car: 19.6 },
    { year: 'FY24', roa: 3.2, roe: 11.7, grossNpa: 2.1, netNpa: 1.5, car: 19.4 }
  ];

  const keyMetrics = [
    { metric: "Revenue from Operations", fy24: "12,529.8", fy23: "11,306.5", fy22: "10,350.8", growth: "21.1%" },
    { metric: "Net Interest Income", fy24: "7,676.0", fy23: "6,491.2", fy22: "5,509.4", growth: "39.3%" },
    { metric: "Profit After Tax", fy24: "2,387.1", fy23: "1,959.1", fy22: "1,011.4", growth: "136.0%" },
    { metric: "Total AUM", fy24: "70,482.5", fy23: "61,591.4", fy22: "58,258.9", growth: "21.0%" },
    { metric: "Net Worth", fy24: "21,250.2", fy23: "19,049.7", fy22: "17,287.3", growth: "22.9%" }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          📊 Financial Performance Analysis (FY22-FY24)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Financial Metrics Table */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Key Financial Metrics (₹ Crore)</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>FY24</TableHead>
                  <TableHead>FY23</TableHead>
                  <TableHead>FY22</TableHead>
                  <TableHead>3-Year Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keyMetrics.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.metric}</TableCell>
                    <TableCell className="font-semibold text-blue-600">{item.fy24}</TableCell>
                    <TableCell>{item.fy23}</TableCell>
                    <TableCell>{item.fy22}</TableCell>
                    <TableCell className="font-semibold text-green-600">{item.growth}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-center">Revenue & Profitability Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`₹${value} Cr`, name]} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} name="Revenue" />
                  <Line type="monotone" dataKey="nii" stroke="#16a34a" strokeWidth={2} name="Net Interest Income" />
                  <Line type="monotone" dataKey="pat" stroke="#dc2626" strokeWidth={2} name="PAT" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-center">Asset Quality & Returns</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ratioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  <Legend />
                  <Bar dataKey="roa" fill="#3b82f6" name="ROA %" />
                  <Bar dataKey="roe" fill="#10b981" name="ROE %" />
                  <Bar dataKey="grossNpa" fill="#ef4444" name="Gross NPA %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">📈 Growth Story</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• PAT grew 136% in 3 years</li>
                <li>• Revenue CAGR: ~10.5%</li>
                <li>• AUM expansion: 21% CAGR</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🛡️ Asset Quality</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Gross NPA: 4.5% → 2.1%</li>
                <li>• Net NPA: 3.8% → 1.5%</li>
                <li>• Strong recovery post-COVID</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">💰 Profitability</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• ROA improved: 1.7% → 3.2%</li>
                <li>• ROE doubled: 5.9% → 11.7%</li>
                <li>• CAR stable at ~19.5%</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialCharts;
