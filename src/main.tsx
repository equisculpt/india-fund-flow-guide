
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

// Add error handling for module loading
try {
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
} catch (error) {
  console.error('❌ Failed to initialize React:', error);
  // Fallback rendering
  container.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>Loading...</h1>
      <p>Please wait while we load the application.</p>
      <div style="margin-top: 20px;">
        <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 2s linear infinite;"></div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </div>
  `;
}
