
import { useEffect } from 'react';

const NewsSitemapPage = () => {
  useEffect(() => {
    // Set the content type to XML
    document.contentType = 'application/xml';
    
    // Generate the news sitemap XML content
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  
  <url>
    <loc>https://sipbrewery.com/blog/hdb-financial-services-ipo-analysis</loc>
    <news:news>
      <news:publication>
        <news:name>SIP Brewery</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2025-06-21T18:00:00+05:30</news:publication_date>
      <news:title>HDB Financial Services IPO Analysis</news:title>
    </news:news>
  </url>

  <url>
    <loc>https://sipbrewery.com/blog/veeda-clinical-research-ipo-analysis</loc>
    <news:news>
      <news:publication>
        <news:name>SIP Brewery</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2025-06-21T17:30:00+05:30</news:publication_date>
      <news:title>Veeda Clinical Research IPO Analysis</news:title>
    </news:news>
  </url>

  <url>
    <loc>https://sipbrewery.com/blog/nbfc-sector-analysis-india-2025</loc>
    <news:news>
      <news:publication>
        <news:name>SIP Brewery</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2025-06-21T17:00:00+05:30</news:publication_date>
      <news:title>India's NBFC Sector Analysis 2025</news:title>
    </news:news>
  </url>

  <url>
    <loc>https://sipbrewery.com/blog/how-fund-managers-make-money-mutual-funds</loc>
    <news:news>
      <news:publication>
        <news:name>SIP Brewery</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2025-06-20T12:00:00+05:30</news:publication_date>
      <news:title>How Fund Managers Make Money in Mutual Funds</news:title>
    </news:news>
  </url>

  <url>
    <loc>https://sipbrewery.com/blog/ipo-analysis-guide</loc>
    <news:news>
      <news:publication>
        <news:name>SIP Brewery</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2025-06-21T16:30:00+05:30</news:publication_date>
      <news:title>Beginner's Guide to IPO Analysis</news:title>
    </news:news>
  </url>

  <url>
    <loc>https://sipbrewery.com/blog/healthcare-sector-outlook</loc>
    <news:news>
      <news:publication>
        <news:name>SIP Brewery</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2025-06-21T16:00:00+05:30</news:publication_date>
      <news:title>Healthcare Sector Outlook India 2025</news:title>
    </news:news>
  </url>

</urlset>`;

    // Clear the document and write raw XML
    document.open();
    document.write(xmlContent);
    document.close();
    
    console.log('📰 News Sitemap XML served as raw XML');
  }, []);

  // This component won't render since we replace the document
  return null;
};

export default NewsSitemapPage;
