
export interface NewsArticle {
  url: string;
  title: string;
  publishedDate: string;
  language?: string;
}

export const generateNewsSitemap = (articles: NewsArticle[]) => {
  const baseUrl = 'https://sipbrewery.com';
  
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;
  
  const xmlFooter = '</urlset>';
  
  const urlEntries = articles.map(article => `
  <url>
    <loc>${baseUrl}${article.url}</loc>
    <news:news>
      <news:publication>
        <news:name>SIP Brewery</news:name>
        <news:language>${article.language || 'en'}</news:language>
      </news:publication>
      <news:publication_date>${article.publishedDate}</news:publication_date>
      <news:title><![CDATA[${article.title}]]></news:title>
    </news:news>
  </url>`).join('');

  return `${xmlHeader}${urlEntries}\n${xmlFooter}`;
};

export const getNewsArticles = (): NewsArticle[] => {
  return [
    {
      url: '/blog/hdb-financial-services-ipo-analysis',
      title: 'HDB Financial Services IPO Analysis 2025 | Complete Financial Review & SWOT',
      publishedDate: '2025-06-21T18:00:00+05:30',
      language: 'en'
    },
    {
      url: '/blog/veeda-clinical-research-ipo-analysis',
      title: 'Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review',
      publishedDate: '2025-06-21T17:30:00+05:30',
      language: 'en'
    },
    {
      url: '/blog/nbfc-sector-analysis-india-2025',
      title: 'NBFC Sector Analysis India 2025: Complete Guide to Non-Banking Financial Companies',
      publishedDate: '2025-06-21T17:00:00+05:30',
      language: 'en'
    },
    {
      url: '/blog/how-fund-managers-make-money-mutual-funds',
      title: 'Why Regular Mutual Fund Plans Can Outperform Direct Plans',
      publishedDate: '2025-06-20T12:00:00+05:30',
      language: 'en'
    },
    {
      url: '/blog/ipo-analysis-guide',
      title: 'IPO Analysis Guide: Understanding Key Metrics for IPO Evaluation 2025',
      publishedDate: '2025-06-21T16:30:00+05:30',
      language: 'en'
    },
    {
      url: '/blog/healthcare-sector-outlook',
      title: 'Healthcare Sector Outlook: India\'s Healthcare & Biotech Investment Themes 2025',
      publishedDate: '2025-06-21T16:00:00+05:30',
      language: 'en'
    }
  ];
};

// Function to download news sitemap as XML file
export const downloadNewsSitemap = () => {
  const articles = getNewsArticles();
  const xmlContent = generateNewsSitemap(articles);
  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'news-sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log('📰 News Sitemap Generated:', {
    totalArticles: articles.length,
    sampleContent: xmlContent.substring(0, 500) + '...'
  });
};
