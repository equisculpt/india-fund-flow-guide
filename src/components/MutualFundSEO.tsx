
import SEOHead from './SEOHead';

interface MutualFundSEOProps {
  fundName?: string;
  category?: string;
  nav?: number;
  returns?: number;
  fundHouse?: string;
}

const MutualFundSEO = ({ fundName, category, nav, returns, fundHouse }: MutualFundSEOProps) => {
  if (!fundName) {
    return (
      <SEOHead
        title="Best Mutual Funds India 2024 | Top Performing SIP Plans | SIP Brewery"
        description="Discover India's best mutual funds 2024. Compare 1000+ funds, AI analysis, real-time NAV. Top ELSS, Large Cap, Small Cap funds. Start SIP ₹500. Expert recommendations."
        keywords="best mutual funds india 2024, top mutual funds, highest return mutual funds, best SIP plans, mutual fund investment, ELSS funds, large cap funds"
      />
    );
  }

  const title = `${fundName} - NAV ₹${nav?.toFixed(2)} | ${returns}% Returns | SIP Brewery`;
  const description = `${fundName} by ${fundHouse} - Current NAV ₹${nav?.toFixed(2)}, ${returns}% returns. Compare with similar ${category} funds. Start SIP investment with detailed analysis and AI recommendations.`;
  const keywords = `${fundName}, ${fundHouse}, ${category} funds, mutual fund NAV, SIP investment, ${fundName} review, ${fundName} performance`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": fundName,
    "description": `${category} mutual fund by ${fundHouse}`,
    "provider": {
      "@type": "Organization",
      "name": fundHouse
    },
    "category": category,
    "offers": {
      "@type": "Offer",
      "price": nav,
      "priceCurrency": "INR",
      "priceValidUntil": new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": Math.min(5, Math.max(1, (returns || 0) / 5 + 3)),
      "reviewCount": "100+"
    }
  };

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={keywords}
      structuredData={structuredData}
    />
  );
};

export default MutualFundSEO;
