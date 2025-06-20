
import React from 'react';
import { useEffect, useState } from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    const checkPlatform = () => {
      const isCapacitor = !!(window as any).Capacitor;
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsMobile(isCapacitor || isMobileDevice);
      
      // Enhanced low-end device detection
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 4;
      const connection = (navigator as any).connection;
      
      const isLowEnd = hardwareConcurrency <= 2 || 
                      memory <= 2 || 
                      (connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g')) ||
                      window.innerWidth < 400; // Very small screens
                      
      setIsLowEndDevice(isLowEnd);
      
      if (isCapacitor || isMobileDevice) {
        document.body.classList.add('mobile-app');
        
        // Performance optimizations for mobile
        if (isLowEnd) {
          document.body.classList.add('low-performance');
          // Disable complex animations and effects
          document.documentElement.style.setProperty('--animation-duration', '0ms');
        }
        
        // Set viewport height variable for mobile browsers
        const updateVH = () => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        updateVH();
        window.addEventListener('resize', updateVH, { passive: true });
        window.addEventListener('orientationchange', updateVH, { passive: true });
        
        return () => {
          window.removeEventListener('resize', updateVH);
          window.removeEventListener('orientationchange', updateVH);
        };
      }
    };

    checkPlatform();
  }, []);

  useEffect(() => {
    // Performance optimizations for low-end devices
    if (isLowEndDevice) {
      // Reduce animation complexity
      document.documentElement.style.setProperty('--animation-duration', '0.05s');
      
      // Disable intersection observer for very low-end devices
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.willChange = 'auto';
          }
        });
      }, { threshold: 0.1 });

      // Observe elements that might need performance optimization
      const elements = document.querySelectorAll('.gpu-accelerated, .will-change-transform');
      elements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [isLowEndDevice]);

  // Preload critical resources on mobile
  useEffect(() => {
    if (isMobile) {
      // Preload critical images
      const preloadImage = (src: string) => {
        const img = new Image();
        img.src = src;
      };
      
      // Preload logo
      preloadImage('/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png');
      
      // Register service worker for caching
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Silently fail if service worker registration fails
        });
      }
    }
  }, [isMobile]);

  return (
    <div 
      className={`min-h-screen ${isMobile ? 'mobile-app-container' : ''} ${isLowEndDevice ? 'low-performance' : ''}`}
      style={{ 
        minHeight: isMobile ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
        // Optimize rendering for mobile
        ...(isMobile && {
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'none'
        })
      }}
    >
      {children}
    </div>
  );
};

export default MobileLayout;
