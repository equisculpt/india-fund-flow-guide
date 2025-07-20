
export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
}

export interface NewsArticle {
  loc: string;
  publicationDate: string;
  title: string;
  keywords?: string;
  stockTickers?: string[];
}

class UnifiedSitemapGenerator {
  private baseUrl = 'https://sipbrewery.com';
  private currentDate = new Date().toISOString().split('T')[0];

  // Static pages configuration
  private getStaticPages(): SitemapURL[] {
    return [
      {
        loc: `${this.baseUrl}/`,
        lastmod: this.currentDate,
        changefreq: 'daily',
        priority: '1.0',
        images: [{
          loc: `${this.baseUrl}/og-image.png`,
          title: 'SIP Brewery - Mutual Fund Investment Platform',
          caption: 'India\'s leading SEBI registered mutual fund investment platform'
        }]
      },
      {
        loc: `${this.baseUrl}/fund-comparison`,
        lastmod: this.currentDate,
        changefreq: 'daily',
        priority: '0.9'
      },
      {
        loc: `${this.baseUrl}/public-funds`,
        lastmod: this.currentDate,
        changefreq: 'daily',
        priority: '0.9'
      },
      {
        loc: `${this.baseUrl}/sip-calculator`,
        lastmod: this.currentDate,
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        loc: `${this.baseUrl}/contact`,
        lastmod: this.currentDate,
        changefreq: 'monthly',
        priority: '0.6'
      },
      {
        loc: `${this.baseUrl}/about`,
        lastmod: '2025-06-19',
        changefreq: 'monthly',
        priority: '0.6'
      },
      {
        loc: `${this.baseUrl}/terms`,
        lastmod: '2025-06-19',
        changefreq: 'yearly',
        priority: '0.4'
      },
      {
        loc: `${this.baseUrl}/privacy`,
        lastmod: '2025-06-19',
        changefreq: 'yearly',
        priority: '0.4'
      },
      {
        loc: `${this.baseUrl}/risk-disclosure`,
        lastmod: '2025-06-19',
        changefreq: 'yearly',
        priority: '0.4'
      }
    ];
  }

  // Blog pages configuration
  private getBlogPages(): SitemapURL[] {
    return [
      {
        loc: `${this.baseUrl}/blog/hdb-financial-services-ipo-analysis`,
        lastmod: '2025-06-22',
        changefreq: 'weekly',
        priority: '0.8',
        images: [{
          loc: `${this.baseUrl}/og-image.png`,
          title: 'HDB Financial Services IPO Analysis',
          caption: 'Complete financial review and SWOT analysis of HDB Financial Services IPO'
        }]
      },
      {
        loc: `${this.baseUrl}/blog/veeda-clinical-research-ipo-analysis`,
        lastmod: '2025-06-22',
        changefreq: 'weekly',
        priority: '0.8',
        images: [{
          loc: `${this.baseUrl}/og-image.png`,
          title: 'Veeda Clinical Research IPO Analysis',
          caption: 'Complete SWOT and financial review of Veeda Clinical Research IPO'
        }]
      },
      {
        loc: `${this.baseUrl}/blog/nbfc-sector-analysis-india-2025`,
        lastmod: '2025-06-22',
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        loc: `${this.baseUrl}/blog/how-fund-managers-make-money-mutual-funds`,
        lastmod: '2025-06-21',
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        loc: `${this.baseUrl}/blog/ipo-analysis-guide`,
        lastmod: '2025-06-22',
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        loc: `${this.baseUrl}/blog/healthcare-sector-outlook`,
        lastmod: '2025-06-22',
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        loc: `${this.baseUrl}/blog/what-are-mutual-funds`,
        lastmod: '2025-06-20',
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        loc: `${this.baseUrl}/blog/how-mutual-funds-work`,
        lastmod: '2025-06-20',
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        loc: `${this.baseUrl}/blog/mutual-fund-benefits`,
        lastmod: '2025-06-20',
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        loc: `${this.baseUrl}/blog/sebi-guidelines`,
        lastmod: '2025-06-22',
        changefreq: 'monthly',
        priority: '0.7'
      }
    ];
  }

  // Popular fund pages
  private getFundPages(): SitemapURL[] {
    const popularFunds = [
      'hdfc-top-100-fund',
      'sbi-small-cap-fund',
      'icici-prudential-bluechip-fund',
      'axis-long-term-equity-fund',
      'mirae-asset-large-cap-fund',
      'parag-parikh-flexi-cap-fund',
      'motilal-oswal-nasdaq-100-fund',
      'kotak-emerging-equity-fund',
      'sbi-bluechip-fund',
      'hdfc-small-cap-fund',
      'axis-bluechip-fund'
    ];

    return popularFunds.map(fund => ({
      loc: `${this.baseUrl}/fund/${fund}`,
      lastmod: '2025-06-20',
      changefreq: 'daily',
      priority: '0.8'
    }));
  }

  // News articles for news sitemap
  private getNewsArticles(): NewsArticle[] {
    return [
      {
        loc: `${this.baseUrl}/blog/hdb-financial-services-ipo-analysis`,
        publicationDate: '2025-06-22T10:00:00+05:30',
        title: 'HDB Financial Services IPO Analysis 2025 | Complete Financial Review & SWOT',
        keywords: 'HDB Financial Services IPO, NBFC IPO India, financial services',
        stockTickers: ['HDBFS']
      },
      {
        loc: `${this.baseUrl}/blog/veeda-clinical-research-ipo-analysis`,
        publicationDate: '2025-06-22T09:30:00+05:30',
        title: 'Veeda Clinical Research IPO Analysis 2024 | Complete SWOT & Financial Review',
        keywords: 'Veeda Clinical Research IPO, CRO IPO India, healthcare IPO'
      },
      {
        loc: `${this.baseUrl}/blog/nbfc-sector-analysis-india-2025`,
        publicationDate: '2025-06-22T09:00:00+05:30',
        title: 'NBFC Sector Analysis India 2025: Complete Guide to Non-Banking Financial Companies',
        keywords: 'NBFC sector India, non-banking financial companies, NBFC analysis'
      },
      {
        loc: `${this.baseUrl}/blog/how-fund-managers-make-money-mutual-funds`,
        publicationDate: '2025-06-21T12:00:00+05:30',
        title: 'Why Regular Mutual Fund Plans Can Outperform Direct Plans',
        keywords: 'mutual fund plans, regular vs direct, fund manager commission'
      },
      {
        loc: `${this.baseUrl}/blog/ipo-analysis-guide`,
        publicationDate: '2025-06-22T08:30:00+05:30',
        title: 'IPO Analysis Guide: Understanding Key Metrics for IPO Evaluation 2025',
        keywords: 'IPO analysis guide, IPO evaluation, IPO metrics'
      },
      {
        loc: `${this.baseUrl}/blog/healthcare-sector-outlook`,
        publicationDate: '2025-06-22T08:00:00+05:30',
        title: 'Healthcare Sector Outlook: India\'s Healthcare & Biotech Investment Themes 2025',
        keywords: 'healthcare sector outlook, biotech investment, healthcare stocks'
      }
    ];
  }

  // Generate main sitemap
  generateMainSitemap(): string {
    const staticPages = this.getStaticPages();
    const blogPages = this.getBlogPages();
    const fundPages = this.getFundPages();
    
    const allUrls = [...staticPages, ...blogPages, ...fundPages];
    
    const urlElements = allUrls.map(url => {
      let urlXml = `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>`;

      if (url.images && url.images.length > 0) {
        url.images.forEach(image => {
          urlXml += `
    <image:image>
      <image:loc>${image.loc}</image:loc>`;
          if (image.title) {
            urlXml += `
      <image:title><![CDATA[${image.title}]]></image:title>`;
          }
          if (image.caption) {
            urlXml += `
      <image:caption><![CDATA[${image.caption}]]></image:caption>`;
          }
          urlXml += `
    </image:image>`;
        });
      }

      urlXml += `
  </url>`;
      return urlXml;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlElements}
</urlset>`;
  }

  // Generate news sitemap
  generateNewsSitemap(): string {
    const newsArticles = this.getNewsArticles();
    
    const newsElements = newsArticles.map(article => {
      let newsXml = `  <url>
    <loc>${article.loc}</loc>
    <news:news>
      <news:publication>
        <news:name>SIP Brewery</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${article.publicationDate}</news:publication_date>
      <news:title><![CDATA[${article.title}]]></news:title>`;

      if (article.keywords) {
        newsXml += `
      <news:keywords>${article.keywords}</news:keywords>`;
      }

      if (article.stockTickers && article.stockTickers.length > 0) {
        newsXml += `
      <news:stock_tickers>${article.stockTickers.join(', ')}</news:stock_tickers>`;
      }

      newsXml += `
    </news:news>
  </url>`;
      return newsXml;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsElements}
</urlset>`;
  }

  // Generate sitemap index
  generateSitemapIndex(): string {
    const lastmod = new Date().toISOString();
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${this.baseUrl}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${this.baseUrl}/news-sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;
  }
}

export const sitemapGenerator = new UnifiedSitemapGenerator();

// Export functions for easy use
export const generateMainSitemap = () => sitemapGenerator.generateMainSitemap();
export const generateNewsSitemap = () => sitemapGenerator.generateNewsSitemap();
export const generateSitemapIndex = () => sitemapGenerator.generateSitemapIndex();
