
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NBFCTypes = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🏗️ NBFC Categories: Understanding the Ecosystem
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-blue-800">Based on Size & Importance</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Systemically Important (NBFC-SI)</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Asset size ≥ ₹500 crore</li>
                  <li>• Stricter regulatory oversight</li>
                  <li>• Higher capital adequacy norms</li>
                  <li>• ~400 NBFCs in this category</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Non-Systemically Important</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Asset size &lt; ₹500 crore</li>
                  <li>• Lighter regulatory framework</li>
                  <li>• Local/regional operations</li>
                  <li>• ~9,100 NBFCs in this category</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">Asset Finance Companies</h4>
              <p className="text-sm text-green-700 mb-2">Focus on financing physical assets</p>
              <ul className="text-xs text-green-600 space-y-1">
                <li>• Vehicle loans</li>
                <li>• Equipment finance</li>
                <li>• Construction equipment</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">Investment Companies</h4>
              <p className="text-sm text-purple-700 mb-2">Investment in shares, bonds, securities</p>
              <ul className="text-xs text-purple-600 space-y-1">
                <li>• Mutual funds</li>
                <li>• Venture capital</li>
                <li>• Private equity</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-3">Loan Companies</h4>
              <p className="text-sm text-orange-700 mb-2">Primary lending business</p>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• Personal loans</li>
                <li>• Business loans</li>
                <li>• Gold loans</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-teal-800">Specialized NBFC Categories</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-teal-700 mb-2">Microfinance Institutions (MFIs)</h4>
                <p className="text-sm text-teal-600 mb-2">Focus on financial inclusion for underserved</p>
                <ul className="text-xs text-teal-600 space-y-1">
                  <li>• Small ticket loans (₹1-2 lakh)</li>
                  <li>• Group lending model</li>
                  <li>• Rural and semi-urban focus</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-teal-700 mb-2">Housing Finance Companies</h4>
                <p className="text-sm text-teal-600 mb-2">Dedicated to housing and real estate finance</p>
                <ul className="text-xs text-teal-600 space-y-1">
                  <li>• Home loans</li>
                  <li>• Plot/construction finance</li>
                  <li>• Commercial real estate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NBFCTypes;
