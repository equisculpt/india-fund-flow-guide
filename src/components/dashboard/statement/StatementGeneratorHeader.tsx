
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const StatementGeneratorHeader: React.FC = () => {
  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-blue-900">SIP Brewery Statement Generator</CardTitle>
            <p className="text-blue-700 font-medium">Brewing Wealth, One SIP at a Time</p>
          </div>
        </div>
        <p className="text-blue-600">Generate beautiful, branded statements using live BSE STAR MF API data</p>
      </CardHeader>
    </Card>
  );
};

export default StatementGeneratorHeader;
