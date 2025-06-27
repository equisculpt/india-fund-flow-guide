
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('🔄 Main.tsx starting...');

const container = document.getElementById("root");
if (!container) {
  console.error('❌ Root element not found');
  throw new Error("Root element not found");
}

console.log('✅ Root element found, initializing React...');

try {
  console.log('🔄 Creating React root...');
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('✅ React initialization complete');
} catch (error) {
  console.error('❌ Failed to initialize React:', error);
  container.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>Loading Error</h1>
      <p>There was an error loading the application. Please refresh the page.</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Refresh Page
      </button>
    </div>
  `;
}
