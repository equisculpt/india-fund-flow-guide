
import { useEffect } from 'react';
import { generateNewsSitemap } from '@/utils/newsSitemapGenerator';

const NewsSitemapPage = () => {
  useEffect(() => {
    // Generate XML content
    const xmlContent = generateNewsSitemap();
    
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
