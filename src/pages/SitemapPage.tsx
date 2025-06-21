
import { useEffect } from 'react';
import { generateXMLSitemap } from '@/utils/sitemapGenerator';

const SitemapPage = () => {
  useEffect(() => {
    // Generate XML content
    const xmlContent = generateXMLSitemap();
    
    // Replace the entire document with raw XML
    document.open();
    document.write(xmlContent);
    document.close();
    
    // Set proper content type
    if (document.querySelector('meta[http-equiv="Content-Type"]')) {
      document.querySelector('meta[http-equiv="Content-Type"]')?.setAttribute('content', 'application/xml; charset=utf-8');
    }
    
    console.log('📄 Sitemap XML served as raw XML');
  }, []);

  // This component won't actually render since we replace the document
  return null;
};

export default SitemapPage;
