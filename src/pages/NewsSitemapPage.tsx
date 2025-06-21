
import { useEffect } from 'react';

const NewsSitemapPage = () => {
  useEffect(() => {
    // Fetch and serve the static news-sitemap.xml file
    fetch('/news-sitemap.xml')
      .then(response => response.text())
      .then(xmlContent => {
        // Clear the document and write raw XML
        document.open();
        document.write(xmlContent);
        document.close();
        
        console.log('📰 News Sitemap XML served as raw XML');
      })
      .catch(error => {
        console.error('Error loading news sitemap:', error);
      });
  }, []);

  // This component won't render since we replace the document
  return null;
};

export default NewsSitemapPage;
