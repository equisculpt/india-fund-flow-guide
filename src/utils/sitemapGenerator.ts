
export const generateXMLSitemap = (): string => {
  const baseUrl = 'https://sipbrewery.com';
  
  const urls = [
    // Main Pages
    { loc: `${baseUrl}/`, lastmod: '2025-06-21T10:30:00.000Z', changefreq: 'daily', priority: '1.0' },
    
    // Blog Posts
    { loc: `${baseUrl}/blog/hdb-financial-services-ipo-analysis`, lastmod: '2025-06-21T10:30:00.000Z', changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/blog/veeda-clinical-research-ipo-analysis`, lastmod: '2025-06-21T10:30:00.000Z', changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/blog/nbfc-sector-analysis-india-2025`, lastmod: '2025-06-21T10:30:00.000Z', changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/blog/how-fund-managers-make-money-mutual-funds`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/blog/ipo-analysis-guide`, lastmod: '2025-06-21T10:30:00.000Z', changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/blog/healthcare-sector-outlook`, lastmod: '2025-06-21T10:30:00.000Z', changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/blog/what-are-mutual-funds`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/blog/how-mutual-funds-work`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/blog/mutual-fund-benefits`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/blog/sebi-guidelines`, lastmod: '2025-06-21T10:30:00.000Z', changefreq: 'monthly', priority: '0.7' },

    // Core Platform Pages
    { loc: `${baseUrl}/fund-comparison`, lastmod: '2025-06-21T10:30:00.000Z', changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/public-funds`, lastmod: '2025-06-21T10:30:00.000Z', changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/sip-calculator`, lastmod: '2025-06-21T10:30:00.000Z', changefreq: 'weekly', priority: '0.8' },

    // Popular Fund Pages
    { loc: `${baseUrl}/fund/hdfc-top-100-fund`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/sbi-small-cap-fund`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/icici-prudential-bluechip-fund`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/axis-long-term-equity-fund`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/mirae-asset-large-cap-fund`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/parag-parikh-flexi-cap-fund`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/fund/motilal-oswal-nasdaq-100-fund`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'daily', priority: '0.7' },
    { loc: `${baseUrl}/fund/kotak-emerging-equity-fund`, lastmod: '2025-06-20T00:00:00.000Z', changefreq: 'daily', priority: '0.7' },

    // Information Pages
    { loc: `${baseUrl}/about`, lastmod: '2025-06-19T00:00:00.000Z', changefreq: 'monthly', priority: '0.6' },
    { loc: `${baseUrl}/contact`, lastmod: '2025-06-19T00:00:00.000Z', changefreq: 'monthly', priority: '0.6' },
    { loc: `${baseUrl}/terms`, lastmod: '2025-06-19T00:00:00.000Z', changefreq: 'yearly', priority: '0.4' },
    { loc: `${baseUrl}/privacy`, lastmod: '2025-06-19T00:00:00.000Z', changefreq: 'yearly', priority: '0.4' },
    { loc: `${baseUrl}/risk-disclosure`, lastmod: '2025-06-19T00:00:00.000Z', changefreq: 'yearly', priority: '0.4' }
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

// Export a function to update the static sitemap file
export const updateStaticSitemap = () => {
  const xmlContent = generateXMLSitemap();
  console.log('Generated sitemap content for static file update');
  return xmlContent;
};
