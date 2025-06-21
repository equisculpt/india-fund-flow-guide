
import React, { useEffect } from 'react';
import { generateNewsSitemap } from '@/utils/newsSitemapGenerator';

const NewsSitemapPage = () => {
  useEffect(() => {
    // Set content type for XML
    document.title = 'News Sitemap';
    
    // Generate and serve XML content
    const xmlContent = generateNewsSitemap();
    
    // Create a blob with XML content
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Set up XML response
    const response = new Response(xmlContent, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
    console.log('📰 News Sitemap XML generated successfully:', {
      url: window.location.href,
      contentType: 'application/xml',
      size: xmlContent.length
    });
    
  }, []);

  // Return XML content directly for the component
  const xmlContent = generateNewsSitemap();
  
  return (
    <div 
      style={{ 
        fontFamily: 'monospace', 
        whiteSpace: 'pre-wrap', 
        padding: '20px',
        backgroundColor: '#f5f5f5' 
      }}
    >
      {xmlContent}
    </div>
  );
};

export default NewsSitemapPage;
