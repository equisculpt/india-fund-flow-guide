
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const IPOSnapshot = () => {
  const ipoDetails = [
    { detail: "Issue Type", value: "Book Building Process" },
    { detail: "Total Issue Size", value: "₹12,500 crore" },
    { detail: "Fresh Issue", value: "₹2,500 crore (3.38 crore shares)" },
    { detail: "Offer for Sale (OFS)", value: "₹10,000 crore (13.51 crore shares)" },
    { detail: "Price Band", value: "₹700–₹740 per share" },
    { detail: "Retail Lot Size", value: "20 shares" },
    { detail: "Min Retail Investment", value: "₹14,800 (at upper band)" },
    { detail: "sNII Min Investment", value: "₹2,07,200 (14 lots)" },
    { detail: "bNII Min Investment", value: "₹10,06,400 (68 lots)" },
    { detail: "Issue Opens", value: "June 25, 2025" },
    { detail: "Issue Closes", value: "June 27, 2025" },
    { detail: "Allotment Date", value: "June 30, 2025 (Monday)" },
    { detail: "Listing Date", value: "July 2, 2025 (BSE & NSE)" }
  ];

  const leadManagers = [
    "Kotak Mahindra Capital", "BofA Securities India", "Citigroup Global Markets",
    "HDFC Bank Limited", "ICICI Securities", "JM Financial", "JP Morgan India",
    "Morgan Stanley India", "SBI Capital Markets", "Motilal Oswal Investment",
    "Axis Capital", "IIFL Securities", "Jefferies India", "Edelweiss Financial"
  ];

  const useOfProceeds = [
    { purpose: "Capital Adequacy", amount: "₹1,800 crore", percentage: "72%" },
    { purpose: "Non-core Commitments", amount: "₹500 crore", percentage: "20%" },
    { purpose: "General Corporate Purposes", amount: "₹200 crore", percentage: "8%" }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          📈 IPO Structure & Timeline Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Issue Structure & Key Dates</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Details</TableHead>
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
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Use of Fresh Issue Proceeds</h3>
              <div className="space-y-3">
                {useOfProceeds.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-blue-900">{item.purpose}</div>
                      <div className="text-sm text-blue-700">{item.percentage} of fresh issue</div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">{item.amount}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">Lead Manager Consortium (14 total)</h4>
              <div className="grid grid-cols-2 gap-1 text-xs text-purple-700">
                {leadManagers.map((manager, index) => (
                  <div key={index} className="truncate">• {manager}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
          <h4 className="font-semibold text-red-800 mb-2">⚠️ Important Note on OFS</h4>
          <p className="text-sm text-red-700">
            <strong>₹10,000 crore (80% of issue)</strong> is Offer for Sale, meaning proceeds go to HDFC Bank (existing shareholder), 
            not to the company. Only <strong>₹2,500 crore</strong> will strengthen HDBFS's balance sheet directly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPOSnapshot;
