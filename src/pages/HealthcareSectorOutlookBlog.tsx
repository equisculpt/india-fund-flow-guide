import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, TrendingUp, Activity, Building, Globe, Zap, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HealthcareSectorOutlookBlog = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const publishedTime = new Date().toISOString();
  const modifiedTime = new Date().toISOString();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Healthcare Sector Outlook: India's Healthcare & Biotech Investment Themes 2025",
    "description": "Comprehensive analysis of India's healthcare and biotech sector investment opportunities, growth drivers, and key themes for 2025.",
    "author": {
      "@type": "Organization",
      "name": "SIP Brewery Research Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SIP Brewery",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://sipbrewery.com/blog/healthcare-sector-outlook"
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
      "width": 1200,
      "height": 630
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-600 text-white px-4 py-2">Sector Analysis</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              🏥 Healthcare Sector Outlook: India's Investment Themes 2025
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto">
              Exploring the transformation of India's healthcare ecosystem and emerging investment opportunities
            </p>
          </div>

          {/* Compliance Disclaimer */}
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              <strong>SEBI Compliance Disclaimer:</strong> This sector analysis is for educational purposes only. 
              It does not constitute investment advice. Healthcare investments carry sector-specific risks. 
              Please consult a SEBI-registered financial advisor before making investment decisions.
            </AlertDescription>
          </Alert>

          {/* Market Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Activity className="h-6 w-6 text-green-600" />
                India Healthcare Market Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">$372B</div>
                  <div className="text-sm text-green-700">Market Size by 2025</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">22%</div>
                  <div className="text-sm text-blue-700">Expected CAGR 2020-25</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4.7%</div>
                  <div className="text-sm text-purple-700">Share of GDP</div>
                </div>
              </div>
            
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Key Market Drivers:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-1">
                    <li>• Rising disposable income and health awareness</li>
                    <li>• Aging population and lifestyle diseases</li>
                    <li>• Government initiatives (Ayushman Bharat)</li>
                    <li>• Digital health adoption acceleration</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Medical tourism growth potential</li>
                    <li>• Insurance penetration increasing</li>
                    <li>• Rural healthcare infrastructure development</li>
                    <li>• Preventive healthcare focus</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Investment Themes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Top Healthcare Investment Themes for 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                    <h5 className="font-semibold mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      Digital Health Revolution
                    </h5>
                    <ul className="text-sm space-y-2">
                      <li>• Telemedicine platforms scaling rapidly</li>
                      <li>• AI-driven diagnostics and treatment</li>
                      <li>• Electronic health records adoption</li>
                      <li>• Remote patient monitoring systems</li>
                      <li>• Health tech startups gaining traction</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                    <h5 className="font-semibold mb-3 flex items-center gap-2">
                      <Building className="h-5 w-5 text-green-600" />
                      Healthcare Infrastructure
                    </h5>
                    <ul className="text-sm space-y-2">
                      <li>• Hospital chain expansions</li>
                      <li>• Specialty healthcare centers</li>
                      <li>• Diagnostic chain networks</li>
                      <li>• Medical device manufacturing</li>
                      <li>• Healthcare real estate development</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                    <h5 className="font-semibold mb-3 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-600" />
                      Pharmaceutical Excellence
                    </h5>
                    <ul className="text-sm space-y-2">
                      <li>• Generic drug global leadership</li>
                      <li>• Biosimilars and biologics growth</li>
                      <li>• Contract research organizations (CROs)</li>
                      <li>• API manufacturing strength</li>
                      <li>• Specialty drug development</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                    <h5 className="font-semibold mb-3 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-orange-600" />
                      Preventive Healthcare
                    </h5>
                    <ul className="text-sm space-y-2">
                      <li>• Wellness and fitness solutions</li>
                      <li>• Preventive diagnostic services</li>
                      <li>• Nutrition and supplements market</li>
                      <li>• Mental health awareness growing</li>
                      <li>• Corporate wellness programs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subsector Analysis */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Healthcare Subsector Deep Dive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border p-3 text-left">Subsector</th>
                        <th className="border p-3 text-left">Growth Rate</th>
                        <th className="border p-3 text-left">Key Drivers</th>
                        <th className="border p-3 text-left">Investment Appeal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3">Hospitals</td>
                        <td className="border p-3">16-18%</td>
                        <td className="border p-3">Capacity expansion, tier-2/3 cities</td>
                        <td className="border p-3">🟢 High</td>
                      </tr>
                      <tr>
                        <td className="border p-3">Pharmaceuticals</td>
                        <td className="border p-3">12-15%</td>
                        <td className="border p-3">Export demand, complex generics</td>
                        <td className="border p-3">🟢 High</td>
                      </tr>
                      <tr>
                        <td className="border p-3">Diagnostics</td>
                        <td className="border p-3">20-25%</td>
                        <td className="border p-3">Preventive care, technology adoption</td>
                        <td className="border p-3">🟢 High</td>
                      </tr>
                      <tr>
                        <td className="border p-3">Medical Devices</td>
                        <td className="border p-3">15-20%</td>
                        <td className="border p-3">Make in India, import substitution</td>
                        <td className="border p-3">🟡 Medium</td>
                      </tr>
                      <tr>
                        <td className="border p-3">Health Insurance</td>
                        <td className="border p-3">25-30%</td>
                        <td className="border p-3">Low penetration, awareness growth</td>
                        <td className="border p-3">🟢 High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Risks */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                Key Investment Risks in Healthcare Sector
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3 text-red-700">Regulatory Risks</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Drug price control policies</li>
                    <li>• Regulatory approval delays</li>
                    <li>• Quality compliance requirements</li>
                    <li>• Import dependency concerns</li>
                  </ul>
                </div>
              
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3 text-orange-700">Business Risks</h5>
                  <ul className="text-sm space-y-1">
                    <li>• High R&D investment requirements</li>
                    <li>• Patent expiry challenges</li>
                    <li>• Competition from global players</li>
                    <li>• Technology disruption risks</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Government Initiatives */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Government Initiatives Supporting Healthcare Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h6 className="font-semibold mb-2">Ayushman Bharat</h6>
                    <p className="text-sm">World's largest health insurance scheme covering 50 crore people</p>
                  </div>
                
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h6 className="font-semibold mb-2">PLI Scheme</h6>
                    <p className="text-sm">₹15,000 crore incentive for pharmaceutical manufacturing</p>
                  </div>
                
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h6 className="font-semibold mb-2">Digital Health Mission</h6>
                    <p className="text-sm">Creating digital health infrastructure and standards</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Strategy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Healthcare Investment Strategy for Retail Investors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                  <h5 className="font-semibold mb-3">Recommended Approach:</h5>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Diversified Exposure:</strong> Consider healthcare-focused mutual funds for broad sector exposure</li>
                    <li><strong>Quality Focus:</strong> Prioritize companies with strong regulatory compliance and R&D capabilities</li>
                    <li><strong>Long-term View:</strong> Healthcare is a long-term growth story requiring patient capital</li>
                    <li><strong>Sub-sector Mix:</strong> Balance between pharmaceuticals, hospitals, and diagnostics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              <strong>Investment Disclaimer:</strong> Healthcare sector investments involve inherent risks including regulatory changes,
              clinical trial outcomes, and competitive pressures. This analysis is educational only and not investment advice.
              Consult qualified financial advisors before making investment decisions.
            </AlertDescription>
          </Alert>

          {/* Footer */}
          <div className="text-center bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">🎯 Healthcare Investment Outlook</h3>
            <p className="text-gray-600 mb-4">
              India's healthcare sector offers compelling long-term growth opportunities driven by demographics, 
              technology adoption, and increasing health awareness. Strategic investments in quality companies 
              can benefit from this structural growth story.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HealthcareSectorOutlookBlog;
