
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GrievanceRedressal = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Grievance Redressal</CardTitle>
      </CardHeader>
      <CardContent className="text-left">
        <p className="text-gray-600 mb-4">
          If you have any complaints or grievances regarding our services, please reach out to us using the contact form or the details provided above. We are committed to resolving all issues promptly and fairly.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2 text-center">Response Time</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• General inquiries: Within 24 hours</li>
            <li>• Technical support: Within 12 hours</li>
            <li>• Grievances: Within 48 hours</li>
            <li>• Investment-related issues: Within 24 hours</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrievanceRedressal;
