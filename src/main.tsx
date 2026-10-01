import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initAnalytics } from './lib/analytics';
import { captureUtm } from './lib/leads';
import './index.css';

captureUtm();
initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
