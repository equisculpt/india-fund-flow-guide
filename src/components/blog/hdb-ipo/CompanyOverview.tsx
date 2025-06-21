
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CompanyOverview = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🏢 Company Overview & Corporate Structure
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          <strong>HDB Financial Services Limited (HDBFS)</strong> is a wholly owned subsidiary of HDFC Bank, 
          incorporated in March 2007 and headquartered in Mumbai. As one of India's largest NBFCs, HDBFS 
          operates through a comprehensive network of <strong>1,686 branches</strong> across <strong>1,029 cities</strong> 
          as of December 31, 2023, with a workforce of <strong>22,511 personnel</strong> (including contractual staff).
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Corporate Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Incorporated</span>
                <span className="font-semibold">March 2007</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Headquarters</span>
                <span className="font-semibold">Mumbai, Maharashtra</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Parent Company</span>
                <span className="font-semibold">HDFC Bank (100%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Employees</span>
                <span className="font-semibold">22,511</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Branch Network</span>
                <span className="font-semibold">1,686 branches</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Geographic Reach</span>
                <span className="font-semibold">1,029 cities</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Business Segments</h3>
            <ul className="space-y-2 text-sm">
              <li className="font-semibold text-green-800">Secured Lending (~77% AUM)</li>
              <li>• Used car & commercial vehicle finance</li>
              <li>• Construction equipment financing</li>
              <li>• Loan Against Property (LAP)</li>
              <li>• Other secured personal loans</li>
              <li className="font-semibold text-green-800 mt-3">Unsecured Lending (~23% AUM)</li>
              <li>• Personal loans</li>
              <li>• MSME business loans</li>
              <li className="font-semibold text-green-800 mt-3">Fee-based Services</li>
              <li>• BPO and document management</li>
              <li>• Collections services for third parties</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Business Exclusions</h4>
          <p className="text-sm text-yellow-700">
            HDBFS does NOT operate in: Gold loans, Microfinance, Housing finance, or Insurance distribution
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
