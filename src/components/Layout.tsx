import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { loading } = useSupabaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary mx-auto mb-4 shadow-glow"></div>
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse"></div>
          </div>
          <p className="text-foreground font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Loading your investment platform...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 relative">
        {/* Subtle background effects for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;