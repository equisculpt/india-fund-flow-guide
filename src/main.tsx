
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('🔄 Main.tsx starting...');

const container = document.getElementById("root");
if (!container) {
  console.error('❌ Root element not found');
  throw new Error("Root element not found");
}

console.log('✅ Root element found, initializing React...');

// Support react-snap hydration
if (container.hasChildNodes()) {
  console.log('🔄 Hydrating existing content...');
  hydrateRoot(container, 
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.log('🔄 Creating new React root...');
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

console.log('✅ React initialization complete');
