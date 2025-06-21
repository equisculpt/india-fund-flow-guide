
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegulatoryFrameworkSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Regulatory Framework - How Your Money is Protected</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">
            Mutual funds in India operate under strict regulatory oversight to protect investor interests:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h5 className="font-semibold">SEBI (Securities and Exchange Board of India)</h5>
                <p className="text-sm text-gray-700">Main regulator that sets rules and monitors all mutual funds</p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h5 className="font-semibold">AMFI (Association of Mutual Funds in India)</h5>
                <p className="text-sm text-gray-700">Self-regulatory body that promotes best practices</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h5 className="font-semibold">Custodian Banks</h5>
                <p className="text-sm text-gray-700">Safely hold all securities, separate from AMC</p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h5 className="font-semibold">Regular Audits</h5>
                <p className="text-sm text-gray-700">Independent auditors verify all fund operations</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Your Money is Safe Because:</h5>
            <ul className="text-sm space-y-1">
              <li>• All securities held by independent custodian</li>
              <li>• Daily NAV calculation and disclosure</li>
              <li>• Monthly portfolio disclosure</li>
              <li>• Strict investment guidelines</li>
              <li>• Regular SEBI inspections</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulatoryFrameworkSection;
