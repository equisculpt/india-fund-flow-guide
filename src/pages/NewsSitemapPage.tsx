
import { useEffect } from 'react';
import { generateNewsSitemap } from '@/utils/newsSitemapGenerator';

const NewsSitemapPage = () => {
  useEffect(() => {
    // Generate and serve the XML content directly
    const xmlContent = generateNewsSitemap();
    
    // Clear the document and write raw XML
    document.open();
    document.write(xmlContent);
    document.close();
    
    // Set proper headers if possible
    try {
      const response = new Response(xmlContent, {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
      });
    } catch (e) {
      console.log('Could not set response headers');
    }
    
    console.log('📰 News Sitemap XML served directly');
  }, []);

  // This component won't render since we replace the document
  return null;
};

export default NewsSitemapPage;
