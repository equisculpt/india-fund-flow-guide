
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RegulatoryInformation = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Regulatory Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 text-left">
          SIP Brewery is operated by Equisculpt Ventures Pvt. Ltd., an AMFI registered mutual fund distributor. 
          All investments are subject to market risks. Please read all scheme-related documents carefully before investing.
          We may earn commission from mutual fund companies when you invest through our platform.
        </p>
      </CardContent>
    </Card>
  );
};

export default RegulatoryInformation;
