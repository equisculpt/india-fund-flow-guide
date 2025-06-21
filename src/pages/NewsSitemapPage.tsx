
import React, { useEffect } from 'react';
import { generateNewsSitemap, getNewsArticles } from '@/utils/newsSitemapGenerator';

const NewsSitemapPage = () => {
  useEffect(() => {
    // Generate the XML content
    const articles = getNewsArticles();
    const xmlContent = generateNewsSitemap(articles);
    
    // Set response headers for XML content type
    const setXMLHeaders = () => {
      // We can't modify document.contentType directly, but we can set meta tags
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Type';
      meta.content = 'application/xml; charset=utf-8';
      document.head.appendChild(meta);
    };
    
    setXMLHeaders();
    
    // Replace the entire page content with XML
    document.open();
    document.write(xmlContent);
    document.close();
    
    console.log('📰 News Sitemap served dynamically:', {
      totalArticles: articles.length,
      url: window.location.href,
      xmlPreview: xmlContent.substring(0, 200) + '...'
    });
  }, []);

  // This component won't actually render anything visible
  // because we replace the document content with XML
  return null;
};

export default NewsSitemapPage;
