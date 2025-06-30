
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const SIPAIInsights: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-orange-900 mb-2">AI SIP Insights</h3>
            <div className="space-y-2 text-sm text-orange-800">
              <p>• Your SIP consistency score is excellent at 95% - keep it up!</p>
              <p>• Consider increasing SBI Small Cap Fund SIP by ₹1,000 for better portfolio balance</p>
              <p>• Your average SIP return (XIRR: 18.8%) beats 76% of platform users</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SIPAIInsights;
