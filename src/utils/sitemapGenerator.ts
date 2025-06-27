
export const generateXMLSitemap = (): string => {
  const baseUrl = 'https://sipbrewery.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    // Homepage - Highest Priority
    { loc: `${baseUrl}/`, lastmod: currentDate, changefreq: 'daily', priority: '1.0' },
    
    // Core Platform Pages - High Priority
    { loc: `${baseUrl}/fund-comparison`, lastmod: currentDate, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/public-funds`, lastmod: currentDate, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/sip-calculator`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },

    // Recent Blog Posts - High Priority for Fresh Content
    { loc: `${baseUrl}/blog/hdb-financial-services-ipo-analysis`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/blog/veeda-clinical-research-ipo-analysis`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/blog/nbfc-sector-deep-dive-analysis`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/blog/indogulf-cropsciences-ipo-complete-analysis-2024`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },

    // Educational Blog Content
    { loc: `${baseUrl}/blog/ipo-analysis-guide`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/blog/healthcare-sector-outlook`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/blog/how-fund-managers-make-money-mutual-funds`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/blog/what-are-mutual-funds`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/blog/how-mutual-funds-work`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/blog/mutual-fund-benefits`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/blog/sebi-guidelines`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },

    // Popular Fund Pages - High Priority for Financial Content
    { loc: `${baseUrl}/fund/hdfc-top-100-fund`, lastmod: currentDate, changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/sbi-small-cap-fund`, lastmod: currentDate, changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/icici-prudential-bluechip-fund`, lastmod: currentDate, changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/axis-long-term-equity-fund`, lastmod: currentDate, changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/mirae-asset-large-cap-fund`, lastmod: currentDate, changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/parag-parikh-flexi-cap-fund`, lastmod: currentDate, changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/motilal-oswal-nasdaq-100-fund`, lastmod: currentDate, changefreq: 'daily', priority: '0.7' },
    { loc: `${baseUrl}/fund/kotak-emerging-equity-fund`, lastmod: currentDate, changefreq: 'daily', priority: '0.7' },

    // Community & Information Pages
    { loc: `${baseUrl}/community`, lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: `${baseUrl}/contact`, lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },

    // Legal & Compliance Pages
    { loc: `${baseUrl}/terms`, lastmod: currentDate, changefreq: 'yearly', priority: '0.5' },
    { loc: `${baseUrl}/privacy`, lastmod: currentDate, changefreq: 'yearly', priority: '0.5' },
    { loc: `${baseUrl}/secure-admin`, lastmod: currentDate, changefreq: 'monthly', priority: '0.3' }
  ];

  const urlElements = urls.map(url => 
    `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

// Helper function to get current date in YYYY-MM-DD format
export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Export a function to update the static sitemap file
export const updateStaticSitemap = () => {
  const xmlContent = generateXMLSitemap();
  console.log('Generated consolidated sitemap content for static file update');
  return xmlContent;
};
