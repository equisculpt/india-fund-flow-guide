
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const IssueStructureSection = () => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span>💰</span>
          Issue Structure & Pricing Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead>Component</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Price Band</TableCell>
                  <TableCell>₹105–₹111 per share</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Face Value</TableCell>
                  <TableCell>₹10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Fresh Issue</TableCell>
                  <TableCell>₹160 crore (~1.44 Cr shares)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Offer for Sale (OFS)</TableCell>
                  <TableCell>~36.03 lakh shares, ~₹40 crore</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Issue Size</TableCell>
                  <TableCell className="font-semibold text-green-600">₹200 crore</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lot Size</TableCell>
                  <TableCell>135 shares</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-800">OFS Sellers</h3>
            <ul className="space-y-3 text-green-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Om Prakash Aggarwal (HUF): up to 15.41 lakh shares</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Sanjay Aggarwal (HUF): ~23.14 lakh shares</span>
              </li>
            </ul>
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Pre-IPO Shareholding:</strong> Promoters hold ~96.9% of the company. 
                Post-IPO, public float will increase to ~20-25%.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueStructureSection;
