import React, { useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, FileText, CheckCircle, Scale, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SEBIGuidelinesBlog = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "SEBI Guidelines: Understanding IPO Eligibility Norms and Regulations 2025",
    "description": "Complete guide to SEBI IPO eligibility norms, regulations, and guidelines for retail investors. Understand IPO process and investor protection measures.",
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
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <SEOHead 
        title="SEBI Guidelines: Understanding IPO Eligibility Norms and Regulations 2025 | SIP Brewery"
        description="Complete guide to SEBI IPO eligibility norms, regulations, and guidelines for retail investors. Understand IPO process and investor protection measures. Educational content only."
        keywords="SEBI IPO guidelines, IPO eligibility norms, SEBI regulations, IPO process India, investor protection SEBI, IPO listing requirements, SEBI compliance"
        canonicalUrl="https://sipbrewery.com/blog/sebi-guidelines"
        structuredData={structuredData}
        isDynamic={true}
      />
      
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
          <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">Regulatory Guide</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            ⚖️ SEBI Guidelines: Understanding IPO Eligibility Norms
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto">
            Comprehensive guide to SEBI regulations and IPO eligibility criteria for investor protection
          </p>
        </div>

        {/* Compliance Disclaimer */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-medium">
            <strong>Important Notice:</strong> This article explains SEBI guidelines for educational purposes only. 
            It does not constitute legal or investment advice. Always refer to official SEBI notifications 
            and consult qualified professionals for specific compliance requirements.
          </AlertDescription>
        </Alert>

        {/* What is SEBI */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Shield className="h-6 w-6 text-blue-600" />
              Understanding SEBI's Role
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The Securities and Exchange Board of India (SEBI) is the regulatory authority that governs 
              the securities markets in India. Established in 1992, SEBI protects investors' interests 
              and promotes the development of securities markets.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold mb-2">SEBI's Key Functions:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Protect investor interests</li>
                  <li>• Regulate securities markets</li>
                  <li>• Promote market development</li>
                  <li>• Ensure fair trading practices</li>
                  <li>• Monitor compliance</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold mb-2">IPO Regulation Areas:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Eligibility criteria for companies</li>
                  <li>• Disclosure requirements</li>
                  <li>• Pricing mechanisms</li>
                  <li>• Listing procedures</li>
                  <li>• Post-listing compliance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IPO Eligibility Criteria */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
              IPO Eligibility Criteria Under SEBI Regulations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <h5 className="font-semibold mb-4">Main Board Listing Requirements:</h5>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h6 className="font-medium mb-2">Financial Criteria (Any One):</h6>
                    <ul className="text-sm space-y-1">
                      <li>• Net profit of ₹15 crore in 2 of last 3 years</li>
                      <li>• Net worth of ₹1 crore in 3 preceding years + average pre-tax profit of ₹15 crore</li>
                      <li>• Revenue from operations of ₹100 crore + average pre-tax profit of ₹20 crore</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium mb-2">Other Requirements:</h6>
                    <ul className="text-sm space-y-1">
                      <li>• Minimum post-issue capital of ₹10 crore</li>
                      <li>• Minimum public shareholding 25%</li>
                      <li>• Track record of 3 years</li>
                      <li>• No promoter contribution withdrawal for 3 years</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold mb-3">SME Platform Criteria:</h5>
                <div className="text-sm space-y-1">
                  <li>• Post-issue paid-up capital not exceeding ₹25 crore</li>
                  <li>• Net worth up to ₹25 crore</li>
                  <li>• Average annual turnover not exceeding ₹100 crore (last 2 years)</li>
                  <li>• Minimum application size ₹1 lakh for retail investors</li>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclosure Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-purple-600" />
              Key Disclosure Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h6 className="font-semibold mb-2">Draft Red Herring Prospectus (DRHP)</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Business overview and strategy</li>
                    <li>• Financial information (3-5 years)</li>
                    <li>• Risk factors</li>
                    <li>• Use of funds from the issue</li>
                    <li>• Management and governance</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h6 className="font-semibold mb-2">Red Herring Prospectus (RHP)</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Price band information</li>
                    <li>• Basis of issue price</li>
                    <li>• Updated financial information</li>
                    <li>• Material developments</li>
                    <li>• Final terms and conditions</li>
                  </ul>
                </div>
              </div>
              
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Investor Tip:</strong> Always read the RHP thoroughly before investing. 
                  Pay special attention to risk factors and use of funds sections.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Pricing and Allocation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Scale className="h-6 w-6 text-orange-600" />
              IPO Pricing and Allocation Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h6 className="font-semibold mb-3">Pricing Mechanism:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Book building process mandatory for issues ≥₹10 crore</li>
                    <li>• Price band width maximum 20%</li>
                    <li>• Floor price at least ₹1</li>
                    <li>• Anchor investor allocation allowed</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h6 className="font-semibold mb-3">Reservation Categories:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Retail investors: Up to ₹2 lakh (35%)</li>
                    <li>• Non-institutional investors: ₹2 lakh+ (15%)</li>
                    <li>• Qualified institutional buyers: (50%)</li>
                    <li>• Employee reservation: Up to 10%</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h6 className="font-semibold mb-2">Allocation Process:</h6>
                <p className="text-sm mb-2">
                  If oversubscribed, allocation follows proportionate basis within each category. 
                  Retail investors get preferential treatment with minimum allotment guarantee.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investor Protection Measures */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>SEBI's Investor Protection Measures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h6 className="font-semibold mb-2 text-green-700">Mandatory Disclosures</h6>
                  <p className="text-sm">Complete business and financial information disclosure</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h6 className="font-semibold mb-2 text-blue-700">Cooling-off Period</h6>
                  <p className="text-sm">Minimum 3-day gap between RHP filing and opening</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <h6 className="font-semibold mb-2 text-purple-700">Refund Timeline</h6>
                  <p className="text-sm">Refunds within 15 days of issue closure</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h6 className="font-semibold mb-2 text-red-700">Grievance Redressal:</h6>
                <ul className="text-sm space-y-1">
                  <li>• SEBI Complaint Redress System (SCORES)</li>
                  <li>• Investor helpline numbers</li>
                  <li>• Ombudsman mechanism</li>
                  <li>• Online grievance filing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Regulatory Changes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Regulatory Updates (2024-25)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h6 className="font-semibold mb-3">Key Updates:</h6>
                <ul className="text-sm space-y-2">
                  <li>• Enhanced disclosure norms for tech companies</li>
                  <li>• Stricter compliance for promoter lock-in</li>
                  <li>• Digital KYC and UPI mandate for retail applications</li>
                  <li>• Faster listing process (T+3 days)</li>
                  <li>• ESG disclosure requirements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Violations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Common SEBI Regulation Violations to Watch For</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <h6 className="font-semibold mb-3 text-red-700">Red Flags for Investors:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Inadequate financial track record</li>
                  <li>• Excessive related party transactions</li>
                  <li>• Unclear use of funds</li>
                  <li>• Weak corporate governance</li>
                  <li>• Pending legal issues</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h6 className="font-semibold mb-3 text-orange-700">Due Diligence Tips:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Verify SEBI registration of intermediaries</li>
                  <li>• Check company's compliance history</li>
                  <li>• Review auditor qualifications</li>
                  <li>• Analyze peer comparisons</li>
                  <li>• Understand risk factors thoroughly</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Compliance Note */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-medium">
            <strong>Regulatory Compliance Reminder:</strong> SEBI guidelines are subject to periodic updates. 
            This educational content reflects general understanding and should not replace official SEBI notifications. 
            Always consult current regulations and qualified professionals for specific compliance requirements.
          </AlertDescription>
        </Alert>

        {/* Footer */}
        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">🛡️ Investor Protection First</h3>
          <p className="text-gray-600 mb-4">
            SEBI's regulatory framework ensures fair and transparent capital markets. 
            Understanding these guidelines helps investors make informed decisions and protects their interests.
          </p>
          <p className="text-sm text-gray-500">
            For official information, visit: sebi.gov.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default SEBIGuidelinesBlog;
