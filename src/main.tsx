
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance optimizations
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Remove the initial loading placeholder
const headerFallback = container.querySelector('.header-fallback');
const heroPlaceholder = container.querySelector('.hero-placeholder');

const root = createRoot(container);

// Performance monitoring
if (typeof window !== 'undefined') {
  // Monitor performance metrics
  window.addEventListener('load', () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navigationEntry = entry as any;
          console.log('Navigation timing:', navigationEntry.loadEventEnd - navigationEntry.fetchStart);
        }
      });
    });
    
    try {
      observer.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      // Fallback for unsupported browsers
      console.log('Performance monitoring not supported');
    }
  });
}

// Render the app immediately
root.render(<App />);

// Clean up placeholders after React takes over
setTimeout(() => {
  headerFallback?.remove();
  heroPlaceholder?.remove();
}, 50);
