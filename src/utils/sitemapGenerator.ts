
import { generateNewsSitemap, getNewsArticles } from './newsSitemapGenerator';

export const generateXMLSitemap = () => {
  const baseUrl = 'https://sipbrewery.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    { url: '/', lastmod: '2025-06-21' },
    { url: '/fund-comparison', lastmod: '2025-06-21' },
    { url: '/public-funds', lastmod: '2025-06-21' },
    { url: '/about', lastmod: '2025-06-19' },
    { url: '/contact', lastmod: '2025-06-19' },
    { url: '/terms', lastmod: '2025-06-19' },
    { url: '/privacy', lastmod: '2025-06-19' },
    
    // Blog articles with actual publication dates
    { url: '/blog/hdb-financial-services-ipo-analysis', lastmod: '2025-06-21' },
    { url: '/blog/veeda-clinical-research-ipo-analysis', lastmod: '2025-06-21' },
    { url: '/blog/nbfc-sector-analysis-india-2025', lastmod: '2025-06-21' },
    { url: '/blog/how-fund-managers-make-money-mutual-funds', lastmod: '2025-06-20' },
    { url: '/blog/ipo-analysis-guide', lastmod: '2025-06-21' },
    { url: '/blog/healthcare-sector-outlook', lastmod: '2025-06-21' },
    
    // Popular mutual fund pages
    { url: '/fund/hdfc-top-100-fund', lastmod: '2025-06-20' },
    { url: '/fund/sbi-small-cap-fund', lastmod: '2025-06-20' },
    { url: '/fund/icici-prudential-bluechip-fund', lastmod: '2025-06-20' },
    { url: '/fund/axis-long-term-equity-fund', lastmod: '2025-06-20' },
    { url: '/fund/mirae-asset-large-cap-fund', lastmod: '2025-06-20' },
    { url: '/fund/parag-parikh-flexi-cap-fund', lastmod: '2025-06-20' },
    { url: '/fund/motilal-oswal-nasdaq-100-fund', lastmod: '2025-06-20' },
    { url: '/fund/kotak-emerging-equity-fund', lastmod: '2025-06-20' },
  ];

  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const xmlFooter = '</urlset>';
  
  const urlEntries = urls.map(({ url, lastmod }) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${lastmod}</lastmod>
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
  
  console.log('📄 Updated sitemap downloaded (Google compliant)');
};

// Function to download both regular and news sitemaps
export const downloadAllSitemaps = () => {
  // Download regular sitemap
  downloadSitemap();
  
  // Download news sitemap
  const articles = getNewsArticles();
  const newsXmlContent = generateNewsSitemap(articles);
  const newsBlob = new Blob([newsXmlContent], { type: 'application/xml' });
  const newsUrl = URL.createObjectURL(newsBlob);
  const newsLink = document.createElement('a');
  newsLink.href = newsUrl;
  newsLink.download = 'news-sitemap.xml';
  document.body.appendChild(newsLink);
  newsLink.click();
  document.body.removeChild(newsLink);
  URL.revokeObjectURL(newsUrl);
  
  console.log('📄 Both sitemaps downloaded successfully (Google compliant)');
};
