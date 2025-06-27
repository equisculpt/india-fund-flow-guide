
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ComparisonHeader from '@/components/fund-comparison/ComparisonHeader';
import ComparisonResultsSection from '@/components/fund-comparison/ComparisonResultsSection';
import AMFIDisclaimer from '@/components/fund-comparison/AMFIDisclaimer';
import { generateSEOContent } from '@/components/fund-comparison/SEOContentGenerator';

interface Fund {
  schemeCode: string;
  schemeName: string;
  category?: string;
  fundHouse?: string;
  nav?: number;
}

const FundComparisonPage = () => {
  const [selectedFunds, setSelectedFunds] = useState<Fund[]>([]);
  const [seoContent, setSeoContent] = useState(generateSEOContent(false, null));

  useEffect(() => {
    const newSeoContent = generateSEOContent(selectedFunds.length > 0, { funds: selectedFunds });
    setSeoContent(newSeoContent);
  }, [selectedFunds]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Mutual Fund Comparison Tool",
    "description": seoContent.description,
    "url": "https://sipbrewery.com/fund-comparison",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "provider": {
      "@type": "Organization",
      "name": "SIP Brewery",
      "url": "https://sipbrewery.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <Layout
      pageType="tool"
      title={seoContent.title}
      description={seoContent.description}
      keywords={seoContent.keywords}
      canonicalUrl="https://sipbrewery.com/fund-comparison"
      schemaData={structuredData}
    >
      <div className="container mx-auto px-4 py-8">
        <ComparisonHeader />
        <ComparisonResultsSection 
          selectedFunds={selectedFunds}
          onFundsChange={setSelectedFunds}
        />
        <AMFIDisclaimer />
      </div>
    </Layout>
  );
};

export default FundComparisonPage;
