
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface HydrationAwareSEOProps {
  children: React.ReactNode;
}

const HydrationAwareSEO = ({ children }: HydrationAwareSEOProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Set hydrated state after component mounts
    setIsHydrated(true);
  }, []);

  // During SSR or initial render, don't render any SEO
  if (!isHydrated) {
    console.log('🚫 SEO HYDRATION GUARD: Blocking SEO during initial render', {
      path: location.pathname,
      isHydrated: false,
      timestamp: new Date().toISOString()
    });
    return null;
  }

  console.log('✅ SEO HYDRATION GUARD: Allowing SEO after hydration', {
    path: location.pathname,
    isHydrated: true,
    timestamp: new Date().toISOString()
  });

  return <>{children}</>;
};

export default HydrationAwareSEO;
