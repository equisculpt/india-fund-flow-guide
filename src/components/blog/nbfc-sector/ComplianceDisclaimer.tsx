
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const ComplianceDisclaimer = () => {
  return (
    <Alert className="mb-8 border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800 font-medium">
        <strong>SEBI Compliance Disclaimer:</strong> This comprehensive sector analysis is for educational 
        and informational purposes only. It does not constitute investment advice or recommendations to 
        buy/sell securities. Please consult a SEBI-registered financial advisor and conduct your own 
        research before making investment decisions. SIP Brewery is not a SEBI-registered investment advisor.
      </AlertDescription>
    </Alert>
  );
};

export default ComplianceDisclaimer;
