import React, { lazy, Suspense } from 'react';
import Header from './Header';
import { useBackendAuth } from '@/contexts/BackendAuthContext';
import PerformanceMonitor from './performance/PerformanceMonitor';

// Lazy load footer to reduce initial bundle size
const Footer = lazy(() => import('./Footer'));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { loading } = useBackendAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="text-center">
          <div className="relative">
            <div 
              className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary mx-auto mb-4 shadow-glow"
              style={{ willChange: 'transform' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse"></div>
          </div>
          <p className="text-foreground font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Loading your investment platform...
          </p>
        </div>
        <PerformanceMonitor />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PerformanceMonitor />
      <Header />
      <main className="flex-1 relative container" style={{ contain: 'layout style paint' }}>
        {/* Optimized background effects */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"
          style={{ willChange: 'auto' }}
        ></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <Suspense fallback={
        <div className="h-32 bg-background flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Loading footer...</div>
        </div>
      }>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;