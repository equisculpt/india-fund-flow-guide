
import React, { useEffect } from 'react';
import { generateNewsSitemap, getNewsArticles } from '@/utils/newsSitemapGenerator';

const NewsSitemapPage = () => {
  useEffect(() => {
    // Generate the XML content
    const articles = getNewsArticles();
    const xmlContent = generateNewsSitemap(articles);
    
    // Set the content type to XML
    document.contentType = 'application/xml';
    
    // Replace the entire page content with XML
    document.open();
    document.write(xmlContent);
    document.close();
    
    console.log('📰 News Sitemap served dynamically:', {
      totalArticles: articles.length,
      url: window.location.href
    });
  }, []);

  // This component won't actually render anything visible
  // because we replace the document content with XML
  return null;
};

export default NewsSitemapPage;
