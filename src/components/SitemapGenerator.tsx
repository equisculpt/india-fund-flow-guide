
// This component helps generate sitemap data for better SEO
export const generateSitemapData = () => {
  const baseUrl = 'https://sipbrewery.com';
  
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/fund-comparison', priority: 0.9, changefreq: 'daily' },
    { url: '/public-funds', priority: 0.9, changefreq: 'daily' },
    { url: '/about', priority: 0.7, changefreq: 'monthly' },
    { url: '/contact', priority: 0.6, changefreq: 'monthly' },
    { url: '/terms', priority: 0.5, changefreq: 'yearly' },
    { url: '/privacy', priority: 0.5, changefreq: 'yearly' }
  ];

  // Popular mutual fund searches that should be prioritized
  const popularFundSearches = [
    'hdfc-top-100-fund',
    'sbi-small-cap-fund', 
    'icici-prudential-bluechip-fund',
    'axis-long-term-equity-fund',
    'mirae-asset-large-cap-fund',
    'parag-parikh-flexi-cap-fund',
    'motilal-oswal-nasdaq-100-fund',
    'kotak-emerging-equity-fund'
  ];

  const fundPages = popularFundSearches.map(fund => ({
    url: `/fund/${fund}`,
    priority: 0.8,
    changefreq: 'daily'
  }));

  return {
    staticPages,
    fundPages,
    baseUrl
  };
};

// SEO-optimized content for mutual fund categories
export const getMutualFundCategoryContent = () => {
  return {
    'large-cap': {
      title: 'Best Large Cap Mutual Funds India 2024 | Top Performing Large Cap Funds',
      description: 'Invest in India\'s best large cap mutual funds. Stable returns, low risk. Compare top large cap funds like HDFC Top 100, ICICI Prudential Bluechip. Start SIP ₹500.',
      keywords: 'large cap mutual funds, best large cap funds 2024, large cap funds india, stable mutual funds, low risk mutual funds'
    },
    'small-cap': {
      title: 'Best Small Cap Mutual Funds 2024 | High Return Small Cap Funds India',
      description: 'Invest in top small cap mutual funds for high returns. Best small cap funds like SBI Small Cap, Kotak Small Cap. Higher risk, higher returns. Start SIP today.',
      keywords: 'small cap mutual funds, best small cap funds 2024, high return mutual funds, small cap funds india, growth mutual funds'
    },
    'elss': {
      title: 'Best ELSS Mutual Funds 2024 | Tax Saving Funds Under 80C | Save Tax',
      description: 'Best ELSS tax saving mutual funds under Section 80C. Save up to ₹46,800 tax annually. Top ELSS funds with 15%+ returns. 3-year lock-in period.',
      keywords: 'ELSS funds, tax saving mutual funds, 80C tax saving, best ELSS funds 2024, tax saving investment'
    },
    'mid-cap': {
      title: 'Best Mid Cap Mutual Funds 2024 | Top Mid Cap Funds India',
      description: 'Invest in best mid cap mutual funds for balanced growth. Mid cap funds offer growth potential with moderate risk. Compare top mid cap funds.',
      keywords: 'mid cap mutual funds, best mid cap funds 2024, mid cap funds india, balanced mutual funds'
    }
  };
};
