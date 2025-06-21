
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CompanyOverview = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🏢 Company Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          <strong>HDB Financial Services Limited (HDBFS)</strong> is one of India's largest non-banking financial 
          companies (NBFCs), a subsidiary of HDFC Bank. HDBFS focuses on retail and MSME lending, asset finance, 
          and BPO services. It operates through a vast network of 1,492 branches in 1,029 cities and towns as of March 2023.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Company Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Incorporated</span>
                <span className="font-semibold">2007</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Headquarters</span>
                <span className="font-semibold">Mumbai</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Parent Company</span>
                <span className="font-semibold">HDFC Bank (94.6%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Employees</span>
                <span className="font-semibold">22,000+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Branches</span>
                <span className="font-semibold">1,492</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Key Offerings</h3>
            <ul className="space-y-2 text-sm">
              <li>• Consumer loans (Personal, Gold, Auto)</li>
              <li>• Enterprise loans (MSME, Working Capital)</li>
              <li>• Asset finance (Used cars, Commercial vehicles)</li>
              <li>• BPO/Back-office services</li>
              <li>• Collections and recovery services</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
