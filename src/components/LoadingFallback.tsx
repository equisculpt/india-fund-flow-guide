import React from 'react';

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
    <div className="text-center">
      <div className="relative">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"
          style={{ willChange: 'transform' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse"></div>
      </div>
      <p className="text-foreground font-medium text-sm">Loading...</p>
    </div>
  </div>
);

export default LoadingFallback;