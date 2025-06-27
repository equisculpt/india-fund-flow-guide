
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Support react-snap hydration
if (container.hasChildNodes()) {
  hydrateRoot(container, 
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
