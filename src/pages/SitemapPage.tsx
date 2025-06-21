
import { useEffect } from 'react';

const SitemapPage = () => {
  useEffect(() => {
    // Fetch and serve the static sitemap.xml file
    fetch('/sitemap.xml')
      .then(response => response.text())
      .then(xmlContent => {
        // Clear the document and write raw XML
        document.open();
        document.write(xmlContent);
        document.close();
        
        console.log('📄 Sitemap XML served as raw XML');
      })
      .catch(error => {
        console.error('Error loading sitemap:', error);
      });
  }, []);

  // This component won't render since we replace the document
  return null;
};

export default SitemapPage;
