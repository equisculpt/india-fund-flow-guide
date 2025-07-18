import { useEffect } from 'react';

const CacheOptimizer = () => {
  useEffect(() => {
    // Register service worker for caching if supported
    if ('serviceWorker' in navigator && 'caches' in window) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, continue without caching
      });
    }

    // Prefetch critical resources
    const prefetchResources = [
      '/src/components/Header.tsx',
      '/src/components/HeroSection.tsx',
      '/src/components/Layout.tsx'
    ];

    prefetchResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });

    // Clean up prefetch links on unmount
    return () => {
      prefetchResources.forEach(resource => {
        const links = document.querySelectorAll(`link[href="${resource}"]`);
        links.forEach(link => link.remove());
      });
    };
  }, []);

  return null;
};

export default CacheOptimizer;