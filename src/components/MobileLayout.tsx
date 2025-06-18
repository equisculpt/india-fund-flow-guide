
import React from 'react';
import { useEffect, useState } from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if running in Capacitor (mobile app)
    const checkPlatform = () => {
      const isCapacitor = !!(window as any).Capacitor;
      setIsMobile(isCapacitor);
      
      if (isCapacitor) {
        // Add mobile-specific styles
        document.body.classList.add('mobile-app');
      }
    };

    checkPlatform();
  }, []);

  return (
    <div className={`min-h-screen ${isMobile ? 'mobile-app-container' : ''}`}>
      {children}
    </div>
  );
};

export default MobileLayout;
