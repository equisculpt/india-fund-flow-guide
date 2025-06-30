
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ComplianceFooter: React.FC = () => {
  return (
    <Card className="bg-gray-50 border-gray-200">
      <CardContent className="p-4">
        <p className="text-xs text-gray-600 text-center mb-2">
          <strong>SIP Brewery Statement Generator</strong> - All statements are auto-generated using live BSE STAR MF API data and branded with compliance to SEBI/AMFI guidelines.
        </p>
        <p className="text-xs text-gray-500 text-center">
          Mutual fund investments are subject to market risk. Please read all scheme related documents carefully. 
          AI insights are for informational purposes only and do not constitute investment advice. 
          All transactions processed via BSE STAR MF API. Data accuracy as per BSE response. AMFI Registration: ARN-XXXXX
        </p>
      </CardContent>
    </Card>
  );
};

export default ComplianceFooter;
