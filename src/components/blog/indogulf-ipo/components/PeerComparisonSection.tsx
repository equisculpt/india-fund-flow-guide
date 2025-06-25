
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PeerComparisonSectionProps {
  peerComparison: Array<{
    company: string;
    revenue: number;
    pat: number;
    pe: number;
    margin: number;
    roe: number;
  }>;
}

const PeerComparisonSection = ({ peerComparison }: PeerComparisonSectionProps) => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span>🔍</span>
          Peer Comparison & Valuation Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Company</TableHead>
                <TableHead>Revenue (₹ Cr)</TableHead>
                <TableHead>PAT (₹ Cr)</TableHead>
                <TableHead>P/E Ratio</TableHead>
                <TableHead>Net Margin (%)</TableHead>
                <TableHead>ROE (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peerComparison.map((company, index) => (
                <TableRow key={index} className={company.company === 'Indogulf Cropsciences' ? 'bg-blue-50' : ''}>
                  <TableCell className="font-medium">{company.company}</TableCell>
                  <TableCell>{company.revenue}</TableCell>
                  <TableCell>{company.pat}</TableCell>
                  <TableCell>{company.pe}x</TableCell>
                  <TableCell>{company.margin}%</TableCell>
                  <TableCell>{company.roe}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">💡 Valuation Insights</h4>
            <ul className="space-y-2 text-blue-700">
              <li>• Indogulf's P/E of 24.3x is in line with quality peers like India Pesticides (25x)</li>
              <li>• However, net margins at 5.1% are significantly lower than industry leaders (17-18%)</li>
              <li>• ROE at 12.2% is below peer average, indicating room for improvement in capital efficiency</li>
              <li>• Smaller scale provides higher growth potential but also higher execution risk</li>
              <li>• Valuation premium may be justified by export focus and integrated model</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerComparisonSection;
