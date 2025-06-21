import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const VeedaClinicalResearchIPOBlog = () => {
  const revenueData = [
    { year: 'FY22', revenue: 248.1, ebitda: 60.2, pat: 29.6 },
    { year: 'FY23', revenue: 310.7, ebitda: 78.4, pat: 36.1 },
    { year: 'FY24', revenue: 376.5, ebitda: 92.8, pat: 42.3 }
  ];

  const marginData = [
    { year: 'FY22', ebitdaMargin: 24.3, patMargin: 11.9, roce: 12.5 },
    { year: 'FY23', ebitdaMargin: 25.2, patMargin: 11.6, roce: 13.1 },
    { year: 'FY24', ebitdaMargin: 24.6, patMargin: 11.2, roce: 13.5 }
  ];

  const ipoDetails = [
    { item: 'Fresh Issue', value: '₹185 crore' },
    { item: 'Offer for Sale', value: '1.3 crore shares' },
    { item: 'Face Value', value: '₹2 per share' },
    { item: 'Exchanges', value: 'NSE & BSE' }
  ];

  // Enhanced structured data for better social sharing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Veeda Clinical Research IPO: Complete SWOT & Financial Analysis",
    "description": "In-depth analysis of Veeda Clinical Research IPO with financial charts, SWOT analysis, and key insights. Educational content only - not investment advice.",
    "image": {
      "@type": "ImageObject",
      "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Organization",
      "name": "SIP Brewery Research Team",
      "url": "https://sipbrewery.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SIP Brewery",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://sipbrewery.com/blog/veeda-clinical-research-ipo-analysis"
    },
    "articleSection": "IPO Analysis",
    "keywords": ["Veeda Clinical Research IPO", "CRO IPO India", "clinical research IPO analysis", "healthcare IPO 2024"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEOHead 
        title="Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review | SIP Brewery"
        description="In-depth analysis of Veeda Clinical Research IPO with financial charts, SWOT analysis, and key insights. Educational content only - not investment advice. Get complete IPO review here."
        keywords="Veeda Clinical Research IPO, CRO IPO India, clinical research IPO analysis, healthcare IPO 2024, biotech IPO review, SEBI compliant IPO analysis, contract research organization stocks"
        canonicalUrl="https://sipbrewery.com/blog/veeda-clinical-research-ipo-analysis"
        ogImage="https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png"
        structuredData={structuredData}
        isDynamic={true}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">IPO Analysis</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            🧪 Veeda Clinical Research IPO: Complete SWOT & Financial Analysis
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto">
            Understanding the Strategic Strengths & Risks of India's Emerging Global Contract Research Organization
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>⏱ Estimated Read Time: 15 minutes</span>
            <span>📍 Category: IPO Tracker | Healthcare R&D</span>
            <span>🗓 Published: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Compliance Disclaimer */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-medium">
            <strong>SEBI Compliance Disclaimer:</strong> This article is solely for educational and informational purposes. 
            It does not constitute investment advice or a recommendation. Please consult a SEBI-registered financial advisor 
            before making any investment decisions. SipBrewery is not a SEBI-registered investment advisor.
          </AlertDescription>
        </Alert>

        {/* Company Overview */}
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

        {/* Financial Performance Charts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              📊 Financial Performance (FY22-FY24)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-center">Revenue & Profitability Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`₹${value} Cr`, name]} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} name="Revenue" />
                    <Line type="monotone" dataKey="ebitda" stroke="#16a34a" strokeWidth={2} name="EBITDA" />
                    <Line type="monotone" dataKey="pat" stroke="#dc2626" strokeWidth={2} name="PAT" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-center">Margin & ROCE Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marginData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                    <Legend />
                    <Bar dataKey="ebitdaMargin" fill="#3b82f6" name="EBITDA Margin %" />
                    <Bar dataKey="patMargin" fill="#10b981" name="PAT Margin %" />
                    <Bar dataKey="roce" fill="#f59e0b" name="ROCE %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">📈 Key Financial Insights</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Revenue grew at ~23% CAGR over 3 years (₹248Cr to ₹376Cr)</li>
                <li>• EBITDA margins remained stable around 24-25%</li>
                <li>• ROCE improved annually from 12.5% to 13.5%</li>
                <li>• Consistent profitability with PAT growth from ₹29.6Cr to ₹42.3Cr</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* SWOT Analysis */}
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

        {/* Market Opportunities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              🌟 Market Opportunities & Industry Outlook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Industry Tailwinds</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Global CRO market growing at ~10% CAGR</li>
                  <li>• Increased outsourcing by pharma companies</li>
                  <li>• New Drugs and Clinical Trial Rules 2019</li>
                  <li>• Government PLI schemes supporting CROs</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Growth Catalysts</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Rising demand from biotech & generics</li>
                  <li>• Decentralized & digital trial platforms</li>
                  <li>• India's skilled workforce advantage</li>
                  <li>• Regulatory harmonization globally</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Considerations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              🔎 Key Investment Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">~23%</div>
                <div className="text-sm text-green-700">Revenue CAGR (FY22-24)</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">24.6%</div>
                <div className="text-sm text-blue-700">EBITDA Margin (FY24)</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">13.5%</div>
                <div className="text-sm text-purple-700">ROCE (FY24)</div>
              </div>
            </div>
            
            <Alert className="mt-6 border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Important Note:</strong> Veeda operates in a specialized, regulated sector with long-term growth potential. 
                However, the company's limited IPO eligibility under SEBI's standard profit criteria and client concentration 
                risks require careful evaluation. This analysis is for educational purposes only.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Footer Section */}
        <div className="text-center bg-gray-50 p-8 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">💬 Join the Discussion</h3>
          <p className="text-gray-600 mb-4">
            What do you think about India's role in the global clinical trial ecosystem? 
            Have questions about IPO analysis or other healthcare investments?
          </p>
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              <strong>Important Reminder:</strong> Always consult with SEBI-registered financial advisors before making investment decisions. 
              This content is for educational purposes only and not personalized investment advice.
            </AlertDescription>
          </Alert>
        </div>

        {/* Related Articles */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">🧠 Suggested Reading</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <Link to="/blog/ipo-analysis-guide" className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-blue-600 mb-2 hover:text-blue-800">📊 IPO Analysis Guide</h4>
              <p className="text-gray-600">Understanding key metrics for IPO evaluation with professional techniques</p>
            </Link>
            <Link to="/blog/healthcare-sector-outlook" className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-blue-600 mb-2 hover:text-blue-800">🏥 Healthcare Sector Outlook</h4>
              <p className="text-gray-600">India's healthcare & biotech investment themes and growth opportunities</p>
            </Link>
            <Link to="/blog/sebi-guidelines" className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-blue-600 mb-2 hover:text-blue-800">⚖️ SEBI Guidelines</h4>
              <p className="text-gray-600">Understanding IPO eligibility norms and investor protection measures</p>
            </Link>
          </div>
          
          <Alert className="mt-4 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Educational Content Notice:</strong> All linked articles are for educational purposes only. 
              They do not constitute investment recommendations. Always seek professional advice for investment decisions.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default VeedaClinicalResearchIPOBlog;
