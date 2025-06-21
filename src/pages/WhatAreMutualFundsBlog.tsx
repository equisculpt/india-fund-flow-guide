
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, TrendingUp, PieChart, Users, DollarSign, Shield } from 'lucide-react';

const WhatAreMutualFundsBlog = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Investment Education</Badge>
            <h1 className="text-4xl font-bold mb-4">What Are Mutual Funds? Complete Beginner's Guide 2025</h1>
            <p className="text-xl text-gray-600 mb-6">Everything you need to know about mutual funds - from basics to advanced concepts, explained in simple terms</p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span>Published: June 18, 2025</span>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span>By SIP Brewery Team</span>
            </div>
          </div>

          {/* Compliance Disclaimer */}
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              <strong>SEBI Compliance Disclaimer:</strong> This article is for educational purposes only. 
              It does not constitute investment advice. Mutual fund investments are subject to market risks. 
              Please read all scheme related documents carefully before investing.
            </AlertDescription>
          </Alert>

          {/* Content placeholder */}
          <div className="text-center bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">📚 Mutual Funds Guide Content Coming Soon</h3>
            <p className="text-gray-600">
              Comprehensive mutual funds education content will be available here.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatAreMutualFundsBlog;
