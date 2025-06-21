
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Shield, Zap, Users, Building } from 'lucide-react';

const SWOTAnalysis = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <TrendingUp className="h-5 w-5" />
            Strengths & Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 mt-1 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Blue-chip Parentage</h4>
              <p className="text-sm text-green-700">HDFC Bank support, strong governance, brand trust & low-cost funding advantage</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Building className="h-5 w-5 mt-1 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Pan-India Reach</h4>
              <p className="text-sm text-green-700">1,492 branches across 1,029+ cities with strong rural penetration</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 mt-1 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Product Diversity</h4>
              <p className="text-sm text-green-700">Retail, MSME, asset finance, and BPO services providing multiple revenue streams</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 mt-1 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Strong Recovery</h4>
              <p className="text-sm text-green-700">Asset quality improved dramatically post-COVID with NPAs halving</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 mt-1 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Digital Opportunities</h4>
              <p className="text-sm text-green-700">AI-driven lending, digital KYC, and fintech integration potential</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 mt-1 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Financial Inclusion</h4>
              <p className="text-sm text-green-700">Large untapped MSME and rural credit market with growing demand</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <TrendingDown className="h-5 w-5" />
            Weaknesses & Threats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-800">Sector Risks</h4>
              <p className="text-sm text-red-700">NBFCs face funding risks and asset-liability mismatch challenges</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-800">Higher Funding Costs</h4>
              <p className="text-sm text-red-700">Cannot borrow as cheaply as parent HDFC Bank, impacting margins</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-800">Branch-Heavy Model</h4>
              <p className="text-sm text-red-700">High fixed costs, vulnerable to digital disruption and competition</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-800">Credit Risk Exposure</h4>
              <p className="text-sm text-red-700">Higher risk borrower segments in MSME and unsecured lending</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-800">Intense Competition</h4>
              <p className="text-sm text-red-700">Faces competition from Bajaj Finance, fintechs, and small finance banks</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-800">Regulatory Changes</h4>
              <p className="text-sm text-red-700">Changes in NBFC regulations and RBI oversight can impact operations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SWOTAnalysis;
