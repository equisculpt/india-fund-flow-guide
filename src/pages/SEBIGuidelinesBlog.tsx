import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Scale, Shield, FileText, Users, Building } from 'lucide-react';

const SEBIGuidelinesBlog = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Regulatory Compliance</Badge>
            <h1 className="text-4xl font-bold mb-4">SEBI Guidelines for Mutual Fund Distributors 2025</h1>
            <p className="text-xl text-gray-600 mb-6">Complete guide to SEBI regulations, compliance requirements, and best practices for mutual fund distribution</p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span>Published: June 21, 2025</span>
              <span>•</span>
              <span>15 min read</span>
              <span>•</span>
              <span>By SIP Brewery Compliance Team</span>
            </div>
          </div>

          {/* Compliance Disclaimer */}
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              <strong>SEBI Compliance Disclaimer:</strong> This article is for educational purposes only. 
              It does not constitute legal or financial advice. Always consult SEBI-registered professionals 
              and refer to official SEBI circulars for the most current regulations.
            </AlertDescription>
          </Alert>

          {/* Rest of the content would go here */}
          <div className="text-center bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">📋 SEBI Guidelines Content Coming Soon</h3>
            <p className="text-gray-600">
              Comprehensive SEBI guidelines and compliance information will be available here.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SEBIGuidelinesBlog;
