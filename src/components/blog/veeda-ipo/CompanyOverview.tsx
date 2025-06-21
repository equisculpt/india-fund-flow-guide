
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ipoDetails } from '@/data/veedaIPOData';

const CompanyOverview = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🧬 Company Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          <strong>Veeda Clinical Research Limited</strong>, based in Ahmedabad, Gujarat, is a full-service 
          Contract Research Organization (CRO) specializing in early- and late-phase clinical research, 
          bioanalytical studies, and regulatory submissions. Founded in 2004, the company has transformed 
          from an Indian CRO to a global player through strategic acquisitions in Europe, Australia, and Ireland.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">IPO Structure</h3>
            {ipoDetails.map((detail, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">{detail.item}</span>
                <span className="font-semibold text-blue-600">{detail.value}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Key Services</h3>
            <ul className="space-y-2 text-sm">
              <li>• Bioequivalence & BA/BE Studies</li>
              <li>• Clinical Trial Management</li>
              <li>• Regulatory Submissions</li>
              <li>• Data Analytics & Reporting</li>
              <li>• Global Regulatory Compliance</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
