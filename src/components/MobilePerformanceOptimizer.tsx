
import { useEffect } from 'react';

const MobilePerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      fontLink.as = 'style';
      fontLink.onload = () => {
        fontLink.rel = 'stylesheet';
      };
      document.head.appendChild(fontLink);

      // Preload critical images
      const criticalImages = [
        '/og-image.png'
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    // Optimize for mobile viewport
    const optimizeForMobile = () => {
      // Set viewport meta tag if not present
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover');

      // Add performance hints
      const performanceHints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
      ];

      performanceHints.forEach(hint => {
        if (!document.querySelector(`link[href="${hint.href}"]`)) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
          document.head.appendChild(link);
        }
      });
    };

    // Defer non-critical scripts
    const deferNonCriticalScripts = () => {
      const scripts = document.querySelectorAll('script:not([async]):not([defer])');
      scripts.forEach(script => {
        const scriptElement = script as HTMLScriptElement;
        if (!scriptElement.src.includes('main') && !scriptElement.src.includes('vendor')) {
          scriptElement.defer = true;
        }
      });
    };

    // Optimize images loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const imgElement = img as HTMLImageElement;
        // Add loading="lazy" to non-critical images
        if (!imgElement.hasAttribute('loading') && !imgElement.closest('[data-critical]')) {
          imgElement.loading = 'lazy';
        }
        
        // Add decoding="async"
        if (!imgElement.hasAttribute('decoding')) {
          imgElement.decoding = 'async';
        }
      });
    };

    // Run optimizations
    preloadCriticalResources();
    optimizeForMobile();
    deferNonCriticalScripts();
    
    // Delay image optimization to avoid blocking
    setTimeout(optimizeImages, 100);

    // Service Worker registration for caching
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Ignore service worker registration errors
      });
    }

  }, []);

  return null;
};

export default MobilePerformanceOptimizer;
