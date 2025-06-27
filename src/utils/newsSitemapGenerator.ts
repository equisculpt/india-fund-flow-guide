
export const generateNewsSitemap = (): string => {
  const baseUrl = 'https://sipbrewery.com';
  
  const newsArticles = [
    {
      loc: `${baseUrl}/blog/hdb-financial-services-ipo-analysis`,
      publicationDate: '2025-06-21T18:00:00+05:30',
      title: 'HDB Financial Services IPO Analysis 2025 | Complete Financial Review & SWOT'
    },
    {
      loc: `${baseUrl}/blog/veeda-clinical-research-ipo-analysis`,
      publicationDate: '2025-06-21T17:30:00+05:30',
      title: 'Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review'
    },
    {
      loc: `${baseUrl}/blog/nbfc-sector-analysis-india-2025`,
      publicationDate: '2025-06-21T17:00:00+05:30',
      title: 'NBFC Sector Analysis India 2025: Complete Guide to Non-Banking Financial Companies'
    },
    {
      loc: `${baseUrl}/blog/how-fund-managers-make-money-mutual-funds`,
      publicationDate: '2025-06-20T12:00:00+05:30',
      title: 'Why Regular Mutual Fund Plans Can Outperform Direct Plans'
    },
    {
      loc: `${baseUrl}/blog/ipo-analysis-guide`,
      publicationDate: '2025-06-21T16:30:00+05:30',
      title: 'IPO Analysis Guide: Understanding Key Metrics for IPO Evaluation 2025'
    },
    {
      loc: `${baseUrl}/blog/healthcare-sector-outlook`,
      publicationDate: '2025-06-21T16:00:00+05:30',
      title: 'Healthcare Sector Outlook: India\'s Healthcare & Biotech Investment Themes 2025'
    }
  ];

  const newsElements = newsArticles.map(article => 
    `  <url>
    <loc>${article.loc}</loc>
    <news:news>
      <news:publication>
        <news:name>SIP Brewery</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${article.publicationDate}</news:publication_date>
      <news:title><![CDATA[${article.title}]]></news:title>
    </news:news>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsElements}
</urlset>`;
};
