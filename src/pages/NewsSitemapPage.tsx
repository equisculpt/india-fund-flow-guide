
import React, { useEffect } from 'react';
import { generateNewsSitemap, getNewsArticles } from '@/utils/newsSitemapGenerator';

const NewsSitemapPage = () => {
  useEffect(() => {
    // Generate the XML content
    const articles = getNewsArticles();
    const xmlContent = generateNewsSitemap(articles);
    
    // Set proper XML content type
    document.contentType = 'application/xml';
    
    // Clear the body and set XML content
    document.body.innerHTML = '';
    document.body.style.fontFamily = 'monospace';
    document.body.style.whiteSpace = 'pre-wrap';
    document.body.style.fontSize = '12px';
    document.body.style.padding = '10px';
    document.body.style.backgroundColor = '#f5f5f5';
    
    // Create a text node with the XML content
    const xmlTextNode = document.createTextNode(xmlContent);
    document.body.appendChild(xmlTextNode);
    
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
