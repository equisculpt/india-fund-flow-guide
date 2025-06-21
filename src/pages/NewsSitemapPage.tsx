
import React, { useEffect } from 'react';
import { generateNewsSitemap, getNewsArticles } from '@/utils/newsSitemapGenerator';

const NewsSitemapPage = () => {
  useEffect(() => {
    // Generate the XML content
    const articles = getNewsArticles();
    const xmlContent = generateNewsSitemap(articles);
    
    // Set the proper content type header
    const response = new Response(xmlContent, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
    
    // Clear the body and replace with XML content
    document.open('text/xml', 'replace');
    document.write(xmlContent);
    document.close();
    
    console.log('📰 News Sitemap served successfully:', {
      totalArticles: articles.length,
      url: window.location.href,
      contentType: 'application/xml',
      xmlPreview: xmlContent.substring(0, 300) + '...'
    });
  }, []);

  // This component won't render React content since we replace it with XML
  return null;
};

export default NewsSitemapPage;
