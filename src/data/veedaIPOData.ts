
export const CANONICAL_URL = "https://sipbrewery.com/blog/veeda-clinical-research-ipo-analysis";

export const revenueData = [
  { year: 'FY22', revenue: 248.1, ebitda: 60.2, pat: 29.6 },
  { year: 'FY23', revenue: 310.7, ebitda: 78.4, pat: 36.1 },
  { year: 'FY24', revenue: 376.5, ebitda: 92.8, pat: 42.3 }
];

export const marginData = [
  { year: 'FY22', ebitdaMargin: 24.3, patMargin: 11.9, roce: 12.5 },
  { year: 'FY23', ebitdaMargin: 25.2, patMargin: 11.6, roce: 13.1 },
  { year: 'FY24', ebitdaMargin: 24.6, patMargin: 11.2, roce: 13.5 }
];

export const ipoDetails = [
  { item: 'Fresh Issue', value: '₹185 crore' },
  { item: 'Offer for Sale', value: '1.3 crore shares' },
  { item: 'Face Value', value: '₹2 per share' },
  { item: 'Exchanges', value: 'NSE & BSE' }
];

export const createStructuredData = (canonicalUrl: string) => ({
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
    "@id": canonicalUrl
  },
  "articleSection": "IPO Analysis",
  "keywords": ["Veeda Clinical Research IPO", "CRO IPO India", "clinical research IPO analysis", "healthcare IPO 2024"]
});
