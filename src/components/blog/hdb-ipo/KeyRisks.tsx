
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const KeyRisks = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          ⚠️ Key Investment Risks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <h4 className="font-semibold text-red-800 mb-2">Asset Quality Risks</h4>
              <p className="text-sm text-red-700">
                Economic downturns, rural distress, or pandemic-like events could impact loan 
                repayments and spike NPAs across the portfolio.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
              <h4 className="font-semibold text-orange-800 mb-2">Funding & Liquidity</h4>
              <p className="text-sm text-orange-700">
                NBFC sector can face liquidity crunches during market stress, affecting 
                growth and profitability despite HDFC Bank backing.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-800 mb-2">Regulatory Changes</h4>
              <p className="text-sm text-yellow-700">
                RBI's evolving NBFC regulations, capital adequacy norms, and 
                lending guidelines could impact operational flexibility.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <h4 className="font-semibold text-purple-800 mb-2">Market & Valuation</h4>
              <p className="text-sm text-purple-700">
                IPO market volatility, oversupply of issues, or sector-specific 
                concerns could impact listing performance and valuation.
              </p>
            </div>
            
            <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
              <h4 className="font-semibold text-indigo-800 mb-2">Operational Risks</h4>
              <p className="text-sm text-indigo-700">
                Technology failures, cybersecurity threats, fraud, or compliance 
                lapses could impact business operations and reputation.
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
              <h4 className="font-semibold text-gray-800 mb-2">Competition Intensity</h4>
              <p className="text-sm text-gray-700">
                Intense competition from established NBFCs, new-age fintechs, 
                and small finance banks could pressure margins and growth.
              </p>
            </div>
          </div>
        </div>
        
        <Alert className="mt-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Risk Reminder:</strong> The IPO proceeds are primarily through Offer for Sale (₹10,000 crore), 
            meaning existing shareholders will receive the funds, not the company. Only ₹2,500 crore will go to 
            HDB Financial for business expansion and capital adequacy.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default KeyRisks;
