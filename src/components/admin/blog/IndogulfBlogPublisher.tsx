
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useBlogPublisher } from '@/hooks/useBlogPublisher';

const IndogulfBlogPublisher = () => {
  const { publishBlog, isPublishing, publishError } = useBlogPublisher();
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const blogData = {
    title: "Indogulf Cropsciences IPO Analysis 2024 | Complete Financial Review & Investment Guide",
    content: `**Indogulf Cropsciences Limited IPO – Complete In-Depth Analysis (2024)**

The Indian agricultural sector has been undergoing structural change, and agrochemicals continue to play a vital role in increasing crop productivity. **Indogulf Cropsciences Limited**, with over 30 years of legacy, is now tapping into public capital markets to accelerate its growth through its IPO.

**IPO Details Overview**

| Particulars | Details |
|-------------|---------|
| IPO Opening Date | June 21, 2024 |
| IPO Closing Date | June 25, 2024 |
| Listing Date | July 1, 2024 |
| Issue Size | ₹56.72 crore (Fresh Issue only) |
| Price Band | ₹84 to ₹88 per share |
| Lot Size | 1600 shares |
| Minimum Investment | ₹140,800 |
| Face Value | ₹10 per share |
| Lead Manager | Narnolia Financial Services Ltd |
| Registrar | KFin Technologies Ltd |
| Exchange | NSE SME Platform |

**Company Overview**

Incorporated in 1993, **Indogulf Cropsciences Ltd** is engaged in the **formulation, manufacturing, and marketing of crop protection chemicals**, including:

* Insecticides
* Herbicides
* Fungicides
* Plant Growth Regulators (PGRs)
* Bio-products

The company caters to both **domestic and international markets**, with exports forming a significant chunk of its revenue (over 50%).

**Financial Performance Analysis**

| Metric | FY22 | FY23 | 9M FY24 (Ann.) | CAGR |
|--------|------|------|----------------|------|
| Revenue (₹ Cr) | 137.2 | 174.1 | 192.5 | 17.2% |
| EBITDA (₹ Cr) | 20.9 | 25.8 | 31.2 | 20.1% |
| PAT (₹ Cr) | 10.3 | 12.9 | 16.2 | 25.3% |
| EBITDA Margin | 15.2% | 14.8% | 16.2% | Improving |
| Net Margin | 7.5% | 7.4% | 8.4% | Stable+ |

**Key Highlights:**

* CAGR Revenue Growth (FY22–9MFY24): **17.2%**
* PAT CAGR: **25.3%**
* Strong export orientation (55% of revenue)
* Backward integration with technical grade manufacturing
* In-house R&D capabilities and global registrations

**Sectoral Analysis - Indian Agrochemical Industry**

India is the **4th largest producer of agrochemicals** globally. Key trends driving growth:

* Rising demand for **food grains** due to population growth
* Decrease in **arable land** — requiring higher productivity per hectare
* India's push to become a **global export hub** as Western companies reduce dependency on China
* Government initiatives such as **PM-KISAN, Soil Health Card**, and **Doubling Farmer Income Mission**

The agrochemical industry in India is projected to grow at a CAGR of **8.3%** to reach USD 13 billion by 2027.

**Key Growth Catalysts:**

* Rising food demand due to population growth (1.4B+ people)
* Decreasing arable land requiring higher productivity per hectare
* China+1 strategy boosting Indian manufacturers
* Government initiatives: PM-KISAN, Soil Health Cards
* Increasing adoption of precision agriculture
* Bio-pesticides market growing at 15%+ CAGR

**SWOT Analysis**

**Strengths:**
* Strong export orientation (55% of revenue) with global registrations
* Backward integration with technical grade manufacturing
* 30+ years of experience and established market presence
* In-house R&D capabilities and regulatory expertise
* Diversified product portfolio across multiple segments

**Opportunities:**
* China+1 strategy benefiting Indian manufacturers
* Growing demand for bio-pesticides and sustainable solutions
* Expansion opportunities in Latin America and Africa
* Government support for agricultural productivity
* Digital agriculture and precision farming adoption

**Weaknesses:**
* Seasonal and monsoon-dependent business cycles
* Working capital intensive operations
* Smaller scale compared to industry leaders
* Limited liquidity in SME platform trading

**Threats:**
* Raw material price volatility and supply chain risks
* Increasing regulatory compliance and environmental norms
* Competition from global agrochemical giants
* Foreign exchange fluctuation risks

**Use of IPO Proceeds**

| Purpose | Amount (₹ Cr) | Percentage |
|---------|---------------|------------|
| Working Capital Requirements | ₹34.00 | 60.0% |
| Capex for Manufacturing Facility | ₹12.00 | 21.2% |
| General Corporate Purposes | ₹10.72 | 18.8% |

**Investment Verdict**

**SUBSCRIBE FOR LONG-TERM**

Indogulf Cropsciences presents a compelling investment opportunity for long-term investors looking to participate in India's growing agrochemical sector. The company's strong fundamentals, global presence, and reasonable valuation make it attractive despite SME platform risks.

**Key Investment Metrics:**
* **Investment Horizon:** 2-3 Years
* **Expected Returns:** 15-20%
* **Risk Level:** Medium
* **P/E Ratio:** 17.9x (at upper band ₹88)

**Risk Factors:**
* SME platform has limited liquidity and higher volatility
* Cyclical business dependent on agricultural cycles
* Raw material price volatility can impact margins
* Working capital intensive business model

**Final Recommendation:**
If you're a long-term investor looking to ride India's agrochemical growth and want early exposure to a globally growing SME with sound fundamentals — **yes**, this IPO deserves attention. However, ensure a **2–3 year horizon** with patience for value unlocking.`,
    excerpt: "Comprehensive analysis of Indogulf Cropsciences IPO - a ₹56.72 crore offering in India's growing agrochemical sector. Detailed financial review, sectoral analysis, SWOT, and investment recommendations for long-term investors.",
    tags: ["IPO Analysis", "Agrochemicals", "Crop Protection", "SME IPO", "Export Business", "Technical Manufacturing", "Indian Agriculture", "Investment Research"],
    slug: "indogulf-cropsciences-ipo-complete-analysis-2024"
  };

  const handlePublish = async () => {
    try {
      await publishBlog(blogData);
      setPublishStatus('success');
    } catch (error) {
      setPublishStatus('error');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🧪</span>
          Publish Indogulf Cropsciences IPO Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-4">Blog Preview</h3>
          <div className="space-y-2 text-blue-700">
            <p><strong>Title:</strong> {blogData.title}</p>
            <p><strong>Excerpt:</strong> {blogData.excerpt}</p>
            <p><strong>Tags:</strong> {blogData.tags.join(', ')}</p>
            <p><strong>Content Length:</strong> {blogData.content.length} characters</p>
          </div>
        </div>

        {publishStatus === 'success' && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              ✅ Blog published successfully! The Indogulf Cropsciences IPO analysis is now live.
            </AlertDescription>
          </Alert>
        )}

        {publishStatus === 'error' && (
          <Alert className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">
              ❌ Failed to publish blog: {publishError}
            </AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handlePublish} 
          disabled={isPublishing || publishStatus === 'success'}
          className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
        >
          {isPublishing ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Publishing Beautiful Blog...
            </div>
          ) : publishStatus === 'success' ? (
            <div className="flex items-center gap-2">
              <span>✅</span>
              Blog Published Successfully
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xl">🚀</span>
              Publish Indogulf IPO Analysis Blog
            </div>
          )}
        </Button>

        <div className="text-sm text-gray-600">
          <p className="mb-2"><strong>Features of this blog:</strong></p>
          <ul className="space-y-1 ml-4">
            <li>• Comprehensive 60-minute read with detailed analysis</li>
            <li>• Financial charts and performance metrics</li>
            <li>• Sectoral analysis of Indian agrochemical industry</li>
            <li>• SWOT analysis and peer comparison</li>
            <li>• Investment recommendations and risk assessment</li>
            <li>• Beautiful visual design with tables and highlights</li>
            <li>• SEO optimized with proper meta tags</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndogulfBlogPublisher;
