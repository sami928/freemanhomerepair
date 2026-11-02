import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { initAnalytics } from './lib/analytics';
import { captureUtm } from './lib/leads';
// Self-hosted fonts, Latin only (Inter's @font-face is in index.css).
import '@fontsource/noto-serif/latin-600.css';
import '@fontsource/noto-serif/latin-700.css';
import '@fontsource/noto-serif/latin-800.css';
import './index.css';

captureUtm();
initAnalytics();

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production pages arrive prerendered (scripts/prerender.mjs): attach to that
// HTML instead of rebuilding it. The dev server serves an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
