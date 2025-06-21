
import React, { useEffect } from 'react';
import { generateNewsSitemap, getNewsArticles } from '@/utils/newsSitemapGenerator';

const NewsSitemapPage = () => {
  useEffect(() => {
    // Generate the XML content
    const articles = getNewsArticles();
    const xmlContent = generateNewsSitemap(articles);
    
    // Replace the entire document with XML content
    document.open();
    document.write(xmlContent);
    document.close();
    
    // Try to set the content type via document properties
    try {
      (document as any).contentType = 'application/xml';
    } catch (e) {
      // Fallback - some browsers don't allow this
      console.log('Could not set content type directly');
    }
    
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
