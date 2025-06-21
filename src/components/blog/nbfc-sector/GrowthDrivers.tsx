
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GrowthDrivers = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🚀 Growth Drivers & Market Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Macro Tailwinds</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• India's credit-to-GDP ratio still low vs global peers</li>
                <li>• Rising disposable incomes driving credit demand</li>
                <li>• Financial inclusion initiatives by government</li>
                <li>• Digital India accelerating financial services adoption</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">Technology Enablers</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• AI/ML for better risk assessment</li>
                <li>• Digital KYC reducing onboarding time</li>
                <li>• Account aggregator framework</li>
                <li>• Open banking creating new opportunities</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">Segment Opportunities</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• MSME credit gap of ₹25+ lakh crore</li>
                <li>• Electric vehicle financing emerging</li>
                <li>• Rural and semi-urban markets underserved</li>
                <li>• Supply chain finance gaining traction</li>
              </ul>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-3">Regulatory Support</h4>
              <ul className="text-sm text-orange-700 space-y-2">
                <li>• Co-lending framework with banks</li>
                <li>• Priority sector lending opportunities</li>
                <li>• TReDS platform for MSME financing</li>
                <li>• Supportive stance on digital lending</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthDrivers;
