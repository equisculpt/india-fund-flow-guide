
import { StrictMode } from 'react'
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

// Use startTransition for non-urgent renders
import { startTransition } from 'react';

startTransition(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});

// Clean up placeholders after React takes over
setTimeout(() => {
  headerFallback?.remove();
  heroPlaceholder?.remove();
}, 100);
