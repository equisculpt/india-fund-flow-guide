
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ComparisonHeader from '@/components/fund-comparison/ComparisonHeader';
import ComparisonResultsSection from '@/components/fund-comparison/ComparisonResultsSection';
import AMFIDisclaimer from '@/components/fund-comparison/AMFIDisclaimer';
import { generateSEOContent } from '@/components/fund-comparison/SEOContentGenerator';
import { useFundComparison } from '@/hooks/useFundComparison';
import PageLoader from '@/components/PageLoader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Fund {
  schemeCode: string;
  schemeName: string;
  category?: string;
  fundHouse?: string;
  nav?: number;
}

const FundComparisonPage = () => {
  const navigate = useNavigate();
  const { 
    fundsWithDetails, 
    comparisonResult, 
    loading, 
    getInvestmentHorizonAdvice,
    resetComparison,
    hasFundsToCompare,
    showSelection
  } = useFundComparison();
  
  const [selectedFunds, setSelectedFunds] = useState<Fund[]>([]);
  const [seoContent, setSeoContent] = useState(generateSEOContent(false, null));

  useEffect(() => {
    const newSeoContent = generateSEOContent(selectedFunds.length > 0, { funds: selectedFunds });
    setSeoContent(newSeoContent);
  }, [selectedFunds]);

  const handleNewComparison = () => {
    resetComparison();
    setSelectedFunds([]);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

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

  if (loading) {
    return (
      <Layout
        pageType="tool"
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
        canonicalUrl="https://sipbrewery.com/fund-comparison"
        schemaData={structuredData}
      >
        <PageLoader message="Analyzing funds with AI..." />
      </Layout>
    );
  }

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
        <ComparisonHeader 
          onNewComparison={handleNewComparison}
          onBackToHome={handleBackToHome}
          showNewComparison={comparisonResult !== null}
        />
        
        {showSelection ? (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Fund Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                To compare funds, please select funds from the fund search page and navigate here with your selections.
              </p>
              <Button onClick={handleBackToHome}>
                Go to Fund Search
              </Button>
            </CardContent>
          </Card>
        ) : comparisonResult ? (
          <ComparisonResultsSection
            comparisonResult={comparisonResult}
            advice={getInvestmentHorizonAdvice()}
          />
        ) : null}
        
        <AMFIDisclaimer />
      </div>
    </Layout>
  );
};

export default FundComparisonPage;
