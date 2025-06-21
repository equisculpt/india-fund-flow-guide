
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Shield, Zap } from 'lucide-react';

const SWOTAnalysis = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <TrendingUp className="h-5 w-5" />
            Strengths
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 mt-1 text-green-600" />
            <div>
              <h4 className="font-semibold">Global Regulatory Approval</h4>
              <p className="text-sm text-gray-600">USFDA, EMA, WHO-GMP, MHRA approved</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 mt-1 text-green-600" />
            <div>
              <h4 className="font-semibold">Integrated CRO Model</h4>
              <p className="text-sm text-gray-600">End-to-end clinical research services</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 mt-1 text-green-600" />
            <div>
              <h4 className="font-semibold">Cost Advantage</h4>
              <p className="text-sm text-gray-600">30-50% lower costs than Western peers</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 mt-1 text-green-600" />
            <div>
              <h4 className="font-semibold">Global Expansion</h4>
              <p className="text-sm text-gray-600">Strategic acquisitions in Europe & Australia</p>
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
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
            <div>
              <h4 className="font-semibold">SEBI Profitability Criteria</h4>
              <p className="text-sm text-gray-600">Doesn't meet Reg 6(1)(a)/(b) requirements</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
            <div>
              <h4 className="font-semibold">Client Concentration Risk</h4>
              <p className="text-sm text-gray-600">Heavy dependence on few major clients</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
            <div>
              <h4 className="font-semibold">Regulatory Risk</h4>
              <p className="text-sm text-gray-600">Compliance failures could impact licenses</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
            <div>
              <h4 className="font-semibold">Competitive Pressure</h4>
              <p className="text-sm text-gray-600">Faces large global players like IQVIA, ICON</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SWOTAnalysis;
