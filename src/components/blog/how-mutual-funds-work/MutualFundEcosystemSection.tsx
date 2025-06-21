
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog, Building, Users, Calculator, ChartBar } from 'lucide-react';

const MutualFundEcosystemSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cog className="h-6 w-6 text-blue-600" />
          The Complete Mutual Fund Ecosystem
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-gray-700">
            A mutual fund is like a well-orchestrated financial symphony where multiple players work together to create wealth for investors. Let's understand each component:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Asset Management Company (AMC)
              </h4>
              <p className="text-sm text-gray-700">The company that creates and manages mutual fund schemes (e.g., SBI Mutual Fund, HDFC AMC)</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Fund Manager
              </h4>
              <p className="text-sm text-gray-700">Professional who decides where to invest the pooled money based on research and market analysis</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-purple-600" />
                Custodian
              </h4>
              <p className="text-sm text-gray-700">Bank that safely holds all the securities bought by the mutual fund (like a security guard for investments)</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ChartBar className="h-5 w-5 text-orange-600" />
                Registrar & Transfer Agent
              </h4>
              <p className="text-sm text-gray-700">Maintains records of all investors, processes transactions, and handles communications</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MutualFundEcosystemSection;
