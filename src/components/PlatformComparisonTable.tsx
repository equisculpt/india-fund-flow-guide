
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const PlatformComparisonTable = () => {
  const features = [
    {
      feature: "Fund Research Based on Real-World Use",
      sipBrewery: { status: "full", text: "AI-powered fund research tuned for Indian families" },
      zerodha: { status: "none", text: "Shows all direct plans without personalization" },
      groww: { status: "none", text: "Popularity-driven listing" },
      paytm: { status: "none", text: "Mostly AMC-provided details" }
    },
    {
      feature: "Personalized SIP Guidance",
      sipBrewery: { status: "full", text: "Funds matched to goals, age, and risk" },
      zerodha: { status: "none", text: "Self-research required" },
      groww: { status: "partial", text: "Basic filters" },
      paytm: { status: "partial", text: "Limited insights" }
    },
    {
      feature: "Real Human Support",
      sipBrewery: { status: "full", text: "Chat + human guidance always on" },
      zerodha: { status: "none", text: "No support for MF" },
      groww: { status: "partial", text: "App-only help" },
      paytm: { status: "partial", text: "Limited customer care" }
    },
    {
      feature: "Investor Community (USP)",
      sipBrewery: { status: "full", text: "Ask, discuss, learn with other investors in a moderated forum" },
      zerodha: { status: "none", text: "None" },
      groww: { status: "none", text: "None" },
      paytm: { status: "none", text: "None" }
    },
    {
      feature: "Clean, Goal-Based Dashboard",
      sipBrewery: { status: "full", text: "Track returns, goals, SIP health, all in one place" },
      zerodha: { status: "none", text: "Basic fund display" },
      groww: { status: "partial", text: "Performance only" },
      paytm: { status: "none", text: "Fragmented view" }
    },
    {
      feature: "Commission Transparency",
      sipBrewery: { status: "full", text: "Regular plan with full commission disclosure" },
      zerodha: { status: "full", text: "Direct = ₹0 commission" },
      groww: { status: "none", text: "Trail commission hidden" },
      paytm: { status: "none", text: "Not easily visible" }
    },
    {
      feature: "Investor Rewards",
      sipBrewery: { status: "full", text: "Cashback & gift campaigns (SEBI-friendly)" },
      zerodha: { status: "none", text: "None" },
      groww: { status: "none", text: "None" },
      paytm: { status: "none", text: "None" }
    },
    {
      feature: "Built for Trust, Not Just Cost",
      sipBrewery: { status: "full", text: "We invest in research, infra, and service with every rupee we earn" },
      zerodha: { status: "full", text: "₹0 trail" },
      groww: { status: "none", text: "Hidden monetization" },
      paytm: { status: "none", text: "AMC-first model" }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'full':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'partial':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'none':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const currentDate = new Date();
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Feature Comparison (Public Data)</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              SipBrewery is an AMFI-registered mutual fund distributor offering only regular plans. We disclose all commissions transparently. 
              Other platforms may offer direct plans with no trail commission. However, we believe in delivering meaningful tools, research, 
              and human support — funded by what we earn. No hidden fees, no random fund lists, just honest investing.
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">Platform Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-bold text-gray-900 p-4 min-w-[200px]">Feature</TableHead>
                      <TableHead className="font-bold text-blue-600 p-4 min-w-[200px]">
                        <div className="flex items-center space-x-2">
                          <span>SipBrewery</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Regular Plans</span>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-gray-700 p-4 min-w-[150px]">Zerodha Coin</TableHead>
                      <TableHead className="font-bold text-gray-700 p-4 min-w-[150px]">Groww</TableHead>
                      <TableHead className="font-bold text-gray-700 p-4 min-w-[150px]">Paytm Money</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {features.map((row, index) => (
                      <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="p-4 font-medium text-gray-900 border-r border-gray-200">
                          {row.feature}
                        </TableCell>
                        <TableCell className="p-4 border-r border-gray-200">
                          <div className="flex items-start space-x-3">
                            {getStatusIcon(row.sipBrewery.status)}
                            <span className="text-sm text-gray-700 leading-relaxed">{row.sipBrewery.text}</span>
                          </div>
                        </TableCell>
                        <TableCell className="p-4 border-r border-gray-200">
                          <div className="flex items-start space-x-3">
                            {getStatusIcon(row.zerodha.status)}
                            <span className="text-sm text-gray-700 leading-relaxed">{row.zerodha.text}</span>
                          </div>
                        </TableCell>
                        <TableCell className="p-4 border-r border-gray-200">
                          <div className="flex items-start space-x-3">
                            {getStatusIcon(row.groww.status)}
                            <span className="text-sm text-gray-700 leading-relaxed">{row.groww.text}</span>
                          </div>
                        </TableCell>
                        <TableCell className="p-4">
                          <div className="flex items-start space-x-3">
                            {getStatusIcon(row.paytm.status)}
                            <span className="text-sm text-gray-700 leading-relaxed">{row.paytm.text}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <div className="mt-6 space-y-2 text-xs text-gray-500 max-w-4xl mx-auto">
            <p className="text-center">
              *This comparison is based on publicly available information as of {monthYear}. 
              All trademarks belong to their respective owners. SipBrewery offers only regular plans and does not provide advisory services.
            </p>
            <p className="text-center font-medium">
              Sources: AMC websites, platform FAQs, public SEBI disclosures
            </p>
          </div>

          {/* Legend */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4 text-center">Legend</h4>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Available/Strong</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-gray-700">Limited/Basic</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-gray-700">Not Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformComparisonTable;
