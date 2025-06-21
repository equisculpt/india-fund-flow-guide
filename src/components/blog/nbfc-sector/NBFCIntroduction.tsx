
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NBFCIntroduction = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🎯 What are NBFCs? Understanding the Foundation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Non-Banking Financial Companies (NBFCs) are financial institutions that provide banking services 
            without meeting the legal definition of a bank. They play a crucial role in India's financial 
            ecosystem by filling credit gaps and serving underbanked segments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-blue-800">Key Characteristics</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Cannot accept demand deposits from public</li>
              <li>• Do not form part of the payment system</li>
              <li>• Cannot issue cheques drawn on themselves</li>
              <li>• Regulated by RBI (Reserve Bank of India)</li>
              <li>• Must maintain minimum capital requirements</li>
              <li>• Focus on specific customer segments</li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-green-800">Services Offered</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Personal and consumer loans</li>
              <li>• Vehicle and equipment financing</li>
              <li>• Housing and mortgage loans</li>
              <li>• MSME and business loans</li>
              <li>• Gold loans and microfinance</li>
              <li>• Investment and wealth management</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-4 text-purple-800">Why NBFCs Matter</h3>
          <p className="text-purple-700 mb-4">
            NBFCs bridge critical gaps in India's financial system by serving segments that traditional 
            banks often find challenging to address profitably.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Last Mile</div>
              <div className="text-sm text-purple-600">Financial Inclusion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Specialized</div>
              <div className="text-sm text-purple-600">Product Focus</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Agile</div>
              <div className="text-sm text-purple-600">Decision Making</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NBFCIntroduction;
