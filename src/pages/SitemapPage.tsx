
import { useEffect } from 'react';
import { generateXMLSitemap } from '@/utils/sitemapGenerator';

const SitemapPage = () => {
  useEffect(() => {
    // Generate XML content
    const xmlContent = generateXMLSitemap();
    
    // Clear the document and write raw XML
    document.open();
    document.write(xmlContent);
    document.close();
    
    console.log('📄 Sitemap XML served as raw XML');
  }, []);

  // This component won't render since we replace the document
  return null;
};

export default SitemapPage;
