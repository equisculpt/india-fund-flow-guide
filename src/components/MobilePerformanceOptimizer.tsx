
import { useEffect } from 'react';

const MobilePerformanceOptimizer = () => {
  useEffect(() => {
    // Lightweight performance optimizations
    const optimizeForMobile = () => {
      // Set viewport meta tag if not present
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no');

      // Add critical resource hints only
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' }
      ];

      hints.forEach(hint => {
        if (!document.querySelector(`link[href="${hint.href}"]`)) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
          document.head.appendChild(link);
        }
      });
    };

    // Optimize images with intersection observer (lightweight)
    const optimizeImages = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
              }
              if (!img.hasAttribute('decoding')) {
                img.decoding = 'async';
              }
              imageObserver.unobserve(img);
            }
          });
        });

        // Only observe images that don't have loading attributes
        document.querySelectorAll('img:not([loading])').forEach(img => {
          imageObserver.observe(img);
        });
      }
    };

    // Run optimizations
    optimizeForMobile();
    
    // Delay image optimization to avoid blocking
    const timer = setTimeout(optimizeImages, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
};

export default MobilePerformanceOptimizer;
