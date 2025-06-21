
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const IPOSnapshot = () => {
  const ipoDetails = [
    { detail: "IPO Type", value: "Book Building" },
    { detail: "Total Issue Size", value: "₹12,500 crore" },
    { detail: "Fresh Issue", value: "₹2,500 crore (3.38 crore shares)" },
    { detail: "Offer for Sale", value: "₹10,000 crore (13.51 crore shares)" },
    { detail: "Price Band", value: "₹700–₹740 per share" },
    { detail: "Lot Size", value: "20 shares" },
    { detail: "Min Retail Investment", value: "₹14,000–₹14,800" },
    { detail: "Open Date", value: "June 25, 2025" },
    { detail: "Close Date", value: "June 27, 2025" },
    { detail: "Listing Date", value: "July 2, 2025 (BSE, NSE)" }
  ];

  const investmentCategories = [
    { category: "Retail (RII)", minShares: "20", minAmount: "₹14,800" },
    { category: "sNII", minShares: "280", minAmount: "₹2,07,200" },
    { category: "bNII", minShares: "1,360", minAmount: "₹10,06,400" }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          📈 IPO Snapshot & Key Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">IPO Structure</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Detail</TableHead>
                  <TableHead>Information</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ipoDetails.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.detail}</TableCell>
                    <TableCell className="text-blue-600 font-semibold">{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Investment Categories</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Min Shares</TableHead>
                  <TableHead>Min Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investmentCategories.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell>{item.minShares}</TableCell>
                    <TableCell className="text-green-600 font-semibold">{item.minAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Lead Managers (14 total)</h4>
              <div className="text-sm text-purple-700 grid grid-cols-2 gap-1">
                <span>• Kotak Mahindra Capital</span>
                <span>• BofA Securities</span>
                <span>• Citigroup</span>
                <span>• HDFC Bank</span>
                <span>• ICICI Securities</span>
                <span>• JM Financial</span>
                <span>• JP Morgan</span>
                <span>• Morgan Stanley</span>
                <span>• SBI Capital</span>
                <span>• Motilal Oswal</span>
                <span>• Axis Capital</span>
                <span>• IIFL Securities</span>
                <span>• Jefferies</span>
                <span>• Edelweiss Financial</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPOSnapshot;
