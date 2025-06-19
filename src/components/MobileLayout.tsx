
import React from 'react';
import { useEffect, useState } from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Check if running in Capacitor (mobile app)
    const checkPlatform = () => {
      const isCapacitor = !!(window as any).Capacitor;
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsMobile(isCapacitor || isMobileDevice);
      
      // Detect low-end devices for performance optimization
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 4;
      const isLowEnd = hardwareConcurrency <= 2 || memory <= 2;
      setIsLowEndDevice(isLowEnd);
      
      if (isCapacitor || isMobileDevice) {
        // Add mobile-specific styles
        document.body.classList.add('mobile-app');
        
        // Performance optimizations for mobile
        if (isLowEnd) {
          document.body.classList.add('low-end-device');
        }
        
        // Set viewport height variable for mobile browsers
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Update on resize
        const handleResize = () => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    };

    checkPlatform();
  }, []);

  useEffect(() => {
    // Performance optimizations for low-end devices
    if (isLowEndDevice) {
      // Reduce animation complexity
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
      
      // Enable GPU acceleration for critical elements
      const criticalElements = document.querySelectorAll('.gpu-accelerated');
      criticalElements.forEach(el => {
        (el as HTMLElement).style.transform = 'translateZ(0)';
      });
    }
  }, [isLowEndDevice]);

  return (
    <div 
      className={`min-h-screen ${isMobile ? 'mobile-app-container' : ''} ${isLowEndDevice ? 'low-performance' : ''}`}
      style={{ minHeight: isMobile ? 'calc(var(--vh, 1vh) * 100)' : '100vh' }}
    >
      {children}
    </div>
  );
};

export default MobileLayout;
