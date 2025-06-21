
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const FinancialCharts = () => {
  const financialData = [
    { year: 'FY21', revenue: 10140, pat: 391, aum: 56287, branches: 1319, employees: 20661 },
    { year: 'FY22', revenue: 10351, pat: 1011, aum: 58259, branches: 1472, employees: 20975 },
    { year: 'FY23', revenue: 11306, pat: 1959, aum: 65088, branches: 1649, employees: 22347 },
    { year: 'Dec 2023', revenue: null, pat: null, aum: 70037, branches: 1686, employees: 22511 }
  ];

  const assetQualityData = [
    { year: 'FY21', grossNpa: 7.75, netNpa: 6.05 },
    { year: 'FY22', grossNpa: 4.99, netNpa: 3.83 },
    { year: 'FY23', grossNpa: 2.44, netNpa: 1.69 }
  ];

  const keyMetrics = [
    { metric: "Gross Loan Book (Dec 2023)", current: "₹70,037 Cr", fy23: "₹65,088 Cr", fy22: "₹58,259 Cr", growth: "20.5%" },
    { metric: "Revenue from Operations", current: "₹11,306 Cr", fy23: "₹11,306 Cr", fy22: "₹10,351 Cr", growth: "9.2%" },
    { metric: "Profit After Tax", current: "₹1,959 Cr", fy23: "₹1,959 Cr", fy22: "₹1,011 Cr", growth: "93.8%" },
    { metric: "Branch Network", current: "1,686", fy23: "1,649", fy22: "1,472", growth: "14.5%" },
    { metric: "Total Employees", current: "22,511", fy23: "22,347", fy22: "20,975", growth: "7.3%" },
    { metric: "Gross NPA (%)", current: "2.44%", fy23: "2.44%", fy22: "4.99%", growth: "-51%" },
    { metric: "Net NPA (%)", current: "1.69%", fy23: "1.69%", fy22: "3.83%", growth: "-56%" }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          📊 Financial Performance Analysis (FY21-Dec 2023)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Financial Metrics Table */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Key Financial Metrics</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Latest (Dec 2023/FY23)</TableHead>
                  <TableHead>FY23</TableHead>
                  <TableHead>FY22</TableHead>
                  <TableHead>Growth Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keyMetrics.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.metric}</TableCell>
                    <TableCell className="font-semibold text-blue-600">{item.current}</TableCell>
                    <TableCell>{item.fy23}</TableCell>
                    <TableCell>{item.fy22}</TableCell>
                    <TableCell className={`font-semibold ${item.growth.includes('-') ? 'text-green-600' : 'text-green-600'}`}>
                      {item.growth}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-center">Business Growth Trajectory</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData.slice(0, 3)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => {
                    if (name === 'aum') return [`₹${value} Cr`, 'AUM'];
                    if (name === 'revenue') return [`₹${value} Cr`, 'Revenue'];
                    if (name === 'pat') return [`₹${value} Cr`, 'PAT'];
                    return [value, name];
                  }} />
                  <Legend />
                  <Line type="monotone" dataKey="aum" stroke="#2563eb" strokeWidth={3} name="AUM" />
                  <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="pat" stroke="#dc2626" strokeWidth={2} name="PAT" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-center">Asset Quality Improvement</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={assetQualityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}%`, name === 'grossNpa' ? 'Gross NPA %' : 'Net NPA %']} />
                  <Legend />
                  <Bar dataKey="grossNpa" fill="#ef4444" name="Gross NPA %" />
                  <Bar dataKey="netNpa" fill="#f97316" name="Net NPA %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">📈 Remarkable Recovery</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• PAT grew 401% (FY21 to FY23)</li>
                <li>• AUM expansion: 24.5 CAGR</li>
                <li>• Branch network: +367 locations</li>
                <li>• Employee base: +1,850 personnel</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🛡️ Asset Quality Turnaround</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Gross NPA: 7.75% → 2.44%</li>
                <li>• Net NPA: 6.05% → 1.69%</li>
                <li>• Dramatic post-COVID recovery</li>
                <li>• Industry-leading improvement</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">💰 Scale & Efficiency</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• ₹70,000+ Cr loan book</li>
                <li>• 1,686 branches nationwide</li>
                <li>• Strong operational leverage</li>
                <li>• Diversified revenue streams</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialCharts;
