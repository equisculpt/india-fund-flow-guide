
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BusinessModel = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          💼 Business Model & Revenue Mix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Core Business Segments</h3>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Consumer Lending (~60%)</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Personal loans</li>
                  <li>• Gold loans</li>
                  <li>• Auto & two-wheeler loans</li>
                  <li>• Loan against property</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Enterprise Lending (~40%)</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• MSME loans</li>
                  <li>• Working capital finance</li>
                  <li>• Business loans</li>
                  <li>• Supply chain finance</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Key Metrics (FY24)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">₹70,482 Cr</div>
                <div className="text-sm text-purple-700">Total AUM</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">₹12,530 Cr</div>
                <div className="text-sm text-orange-700">Revenue</div>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">1,492</div>
                <div className="text-sm text-teal-700">Branches</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">1,029</div>
                <div className="text-sm text-red-700">Cities</div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Competitive Advantages</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• HDFC Bank parentage & low-cost funding</li>
                <li>• Pan-India distribution network</li>
                <li>• Diversified product portfolio</li>
                <li>• Strong asset quality recovery</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessModel;
