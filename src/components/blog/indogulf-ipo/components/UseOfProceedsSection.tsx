
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface UseOfProceedsSectionProps {
  useOfProceeds: Array<{
    purpose: string;
    amount: number;
    percentage: number;
  }>;
}

const UseOfProceedsSection = ({ useOfProceeds }: UseOfProceedsSectionProps) => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span>💼</span>
          Use of IPO Proceeds (₹160 Cr Fresh Issue)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-green-50">
                <TableHead>Purpose</TableHead>
                <TableHead>Amount (₹ Cr)</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Strategic Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {useOfProceeds.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.purpose}</TableCell>
                  <TableCell>₹{item.amount}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell>
                    {item.purpose === 'Working Capital' && 'Support business growth and operations'}
                    {item.purpose === 'Debt Prepayment' && 'Improve balance sheet strength'}
                    {item.purpose === 'Dry Flowable Plant Setup' && 'Enhance production capabilities'}
                    {item.purpose === 'General Corporate Purposes' && 'Strategic flexibility and growth'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Proceeds Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={useOfProceeds}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                    label={({ purpose, percentage }) => `${purpose}: ${percentage}%`}
                  >
                    {useOfProceeds.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">💡 Proceeds Analysis</h4>
              <ul className="space-y-2 text-green-700">
                <li>• Majority (40.6%) allocated to working capital - supports immediate growth</li>
                <li>• Debt prepayment (21.3%) will strengthen balance sheet</li>
                <li>• Capex for Dry Flowable plant (8.8%) enhances production capacity</li>
                <li>• Strategic allocation provides operational flexibility</li>
              </ul>
              <div className="mt-4 p-3 bg-white rounded">
                <p className="text-sm text-gray-700">
                  <strong>Impact on D/E:</strong> With ₹34.12 Cr debt reduction from current ₹206.30 Cr, 
                  debt-to-equity should improve from 0.78x to approximately 0.65x.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UseOfProceedsSection;
