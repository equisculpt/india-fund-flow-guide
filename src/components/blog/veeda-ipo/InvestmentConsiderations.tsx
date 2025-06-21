
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const InvestmentConsiderations = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🔎 Key Investment Considerations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">~23%</div>
            <div className="text-sm text-green-700">Revenue CAGR (FY22-24)</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">24.6%</div>
            <div className="text-sm text-blue-700">EBITDA Margin (FY24)</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">13.5%</div>
            <div className="text-sm text-purple-700">ROCE (FY24)</div>
          </div>
        </div>
        
        <Alert className="mt-6 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Important Note:</strong> Veeda operates in a specialized, regulated sector with long-term growth potential. 
            However, the company's limited IPO eligibility under SEBI's standard profit criteria and client concentration 
            risks require careful evaluation. This analysis is for educational purposes only.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default InvestmentConsiderations;
