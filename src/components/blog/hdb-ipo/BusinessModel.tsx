
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BusinessModel = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          💼 Comprehensive Business Model & Revenue Architecture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Primary Business Segments</h3>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800 mb-2">Secured Lending (~77% AUM)</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Used Car Finance:</strong> Individual & dealer financing</li>
                  <li>• <strong>Commercial Vehicle:</strong> Trucks, buses, LCVs</li>
                  <li>• <strong>Construction Equipment:</strong> Heavy machinery finance</li>
                  <li>• <strong>Loan Against Property:</strong> Residential & commercial</li>
                  <li>• <strong>Other Secured:</strong> Personal loans with collateral</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800 mb-2">Unsecured Lending (~23% AUM)</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• <strong>Personal Loans:</strong> Salary-based individuals</li>
                  <li>• <strong>MSME Business Loans:</strong> Working capital & term loans</li>
                  <li>• <strong>Professional Loans:</strong> Doctors, CAs, consultants</li>
                  <li>• <strong>Digital Loans:</strong> App-based quick disbursals</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-semibold text-purple-800 mb-2">Fee-based Services</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• <strong>BPO Services:</strong> Back-office processing</li>
                  <li>• <strong>Collections:</strong> Recovery services for other NBFCs</li>
                  <li>• <strong>Document Management:</strong> Digital processing</li>
                  <li>• <strong>Third-party Services:</strong> Insurance, advisory</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Key Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">₹65,088 Cr</div>
                <div className="text-sm text-red-700">Gross Loan Book</div>
                <div className="text-xs text-red-600">Dec 31, 2023</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">1,649</div>
                <div className="text-sm text-orange-700">Branch Network</div>
                <div className="text-xs text-orange-600">Dec 31, 2023</div>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">1,029+</div>
                <div className="text-sm text-teal-700">Cities Covered</div>
                <div className="text-xs text-teal-600">Dec 31, 2023</div>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">~56,000</div>
                <div className="text-sm text-indigo-700">Total Employees</div>
                <div className="text-xs text-indigo-600">June 2025</div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Hybrid Distribution Strategy</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• <strong>Physical Presence:</strong> 1,649 branches in Tier 2-4 cities</li>
                <li>• <strong>Digital Platforms:</strong> Mobile apps, online portals</li>
                <li>• <strong>Partner Network:</strong> DSAs, dealers, brokers</li>
                <li>• <strong>Cross-selling:</strong> HDFC Bank customer acquisition</li>
                <li>• <strong>Direct Sales:</strong> Dedicated relationship managers</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Competitive Advantages</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>HDFC Bank Parentage:</strong> Brand trust, funding access</li>
                <li>• <strong>Geographic Reach:</strong> Deep semi-urban penetration</li>
                <li>• <strong>Secured Focus:</strong> 77% secured portfolio reduces risk</li>
                <li>• <strong>Operational Scale:</strong> Large branch network</li>
                <li>• <strong>Technology Integration:</strong> Digital underwriting</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-100 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">📊 Revenue Mix & Growth Strategy</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-blue-800">Interest Income (Primary)</div>
              <div className="text-blue-700">85%+ of total revenue from lending operations</div>
            </div>
            <div>
              <div className="font-semibold text-blue-800">Fee Income (Growing)</div>
              <div className="text-blue-700">BPO, processing, and service fees</div>
            </div>
            <div>
              <div className="font-semibold text-blue-800">Other Income</div>
              <div className="text-blue-700">Recovery, advisory, and miscellaneous</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessModel;
