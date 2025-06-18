
export const generateXMLSitemap = () => {
  const baseUrl = 'https://sipbrewery.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/fund-comparison', priority: '0.9', changefreq: 'daily' },
    { url: '/public-funds', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
    
    // Popular mutual fund pages
    { url: '/fund/hdfc-top-100-fund', priority: '0.8', changefreq: 'daily' },
    { url: '/fund/sbi-small-cap-fund', priority: '0.8', changefreq: 'daily' },
    { url: '/fund/icici-prudential-bluechip-fund', priority: '0.8', changefreq: 'daily' },
    { url: '/fund/axis-long-term-equity-fund', priority: '0.8', changefreq: 'daily' },
    { url: '/fund/mirae-asset-large-cap-fund', priority: '0.8', changefreq: 'daily' },
    { url: '/fund/parag-parikh-flexi-cap-fund', priority: '0.8', changefreq: 'daily' },
    { url: '/fund/motilal-oswal-nasdaq-100-fund', priority: '0.8', changefreq: 'daily' },
    { url: '/fund/kotak-emerging-equity-fund', priority: '0.8', changefreq: 'daily' },
  ];

  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const xmlFooter = '</urlset>';
  
  const urlEntries = urls.map(({ url, priority, changefreq }) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  return `${xmlHeader}${urlEntries}\n${xmlFooter}`;
};

// Function to download sitemap as XML file
export const downloadSitemap = () => {
  const xmlContent = generateXMLSitemap();
  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
