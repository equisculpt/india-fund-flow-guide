
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const ComplianceDisclaimer = () => {
  return (
    <Alert className="mb-8 border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800 font-medium">
        <strong>SEBI Compliance Disclaimer:</strong> This article is solely for educational and informational purposes. 
        It does not constitute investment advice or a recommendation to buy/sell securities. Please refer to the official 
        RHP and consult a SEBI-registered financial advisor before making any investment decisions. SipBrewery is not a 
        SEBI-registered investment advisor.
      </AlertDescription>
    </Alert>
  );
};

export default ComplianceDisclaimer;
