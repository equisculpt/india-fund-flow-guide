
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calculator, Users } from 'lucide-react';

const FundManagerRevenueSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-600" />
          How Fund Managers and Distributors Make Money
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-gray-700">
            Understanding the revenue model helps you appreciate the value chain and services you receive:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-600" />
                Fund Management Company (AMC)
              </h4>
              <div className="text-sm space-y-2">
                <p><strong>Revenue:</strong> Management fees (1.5-2.5% annually)</p>
                <p><strong>Services:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Professional fund management</li>
                  <li>• Research and analysis</li>
                  <li>• Risk management</li>
                  <li>• Regulatory compliance</li>
                  <li>• Technology infrastructure</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Mutual Fund Distributor
              </h4>
              <div className="text-sm space-y-2">
                <p><strong>Revenue:</strong> Trail commission (0.5-1.25% annually)</p>
                <p><strong>Services:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Investment advisory</li>
                  <li>• Portfolio planning</li>
                  <li>• Goal-based recommendations</li>
                  <li>• Ongoing support</li>
                  <li>• Market education</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Value Equation: What You Get vs What You Pay</h5>
            <div className="text-sm">
              <p><strong>Additional Cost in Regular Plans:</strong> 0.5-1% annually</p>
              <p><strong>Value Received:</strong></p>
              <ul className="ml-4 mt-2 space-y-1">
                <li>• Dedicated relationship manager</li>
                <li>• Quarterly portfolio reviews</li>
                <li>• Tax optimization guidance</li>
                <li>• Emergency financial support</li>
                <li>• Market crash behavioral coaching</li>
                <li>• Goal tracking and adjustments</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundManagerRevenueSection;
