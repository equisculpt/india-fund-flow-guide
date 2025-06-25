
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CompanyOverviewSection = () => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span>🏢</span>
          Company Overview & Business Model
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-800">About Indogulf Cropsciences Limited</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Based in New Delhi since the 1990s, Indogulf Cropsciences Limited is a vertically integrated 
              agrochemical company specializing in the formulation, manufacturing, and marketing of crop protection 
              chemicals. The company has established itself as a significant player in both domestic and international markets.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">🌱 Core Business Areas</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Formulation of crop protection chemicals</li>
                  <li>• Insecticides, herbicides, fungicides production</li>
                  <li>• Plant Growth Regulators (PGRs)</li>
                  <li>• Bio-products manufacturing</li>
                  <li>• Backward integration with technical-grade production</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-3">🌍 Global Presence</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Registered formulations in 30+ countries</li>
                  <li>• Strong export focus (60% of revenue)</li>
                  <li>• In-house R&D capabilities</li>
                  <li>• Global regulatory registrations</li>
                  <li>• Diversified geographic revenue base</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverviewSection;
