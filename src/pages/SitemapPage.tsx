
import React, { useEffect } from 'react';
import { generateXMLSitemap } from '@/utils/sitemapGenerator';

const SitemapPage = () => {
  const xmlContent = generateXMLSitemap();

  useEffect(() => {
    // Set the document title
    document.title = 'Sitemap - SIP Brewery';
    
    // Set content type meta tag for XML
    const metaContentType = document.querySelector('meta[http-equiv="Content-Type"]');
    if (metaContentType) {
      metaContentType.setAttribute('content', 'application/xml; charset=utf-8');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'Content-Type');
      meta.setAttribute('content', 'application/xml; charset=utf-8');
      document.head.appendChild(meta);
    }

    console.log('📄 Sitemap XML generated successfully:', {
      url: window.location.href,
      contentType: 'application/xml',
      size: xmlContent.length,
      urlCount: (xmlContent.match(/<url>/g) || []).length
    });

    // For browsers that support it, set the response headers
    if ('serviceWorker' in navigator) {
      // This helps with caching
      console.log('Service worker available for caching');
    }
  }, [xmlContent]);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <pre 
        style={{ 
          fontFamily: 'monospace', 
          fontSize: '12px',
          lineHeight: '1.4',
          margin: 0,
          padding: '10px',
          backgroundColor: '#fff',
          color: '#333',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}
        dangerouslySetInnerHTML={{ __html: xmlContent.replace(/</g, '&lt;').replace(/>/g, '&gt;') }}
      />
    </div>
  );
};

export default SitemapPage;
