import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { headHtml } from './lib/seo';
import { resolve, pagePaths, redirects } from './routeTable';

/**
 * Build-time entry used by scripts/prerender.mjs (never shipped to browsers).
 * Renders a page to static HTML plus its own <head> tags, so crawlers and
 * link previews that don't run JavaScript still get the right content.
 */
export function render(path: string): { html: string; head: string } {
  const page = resolve(path);
  const html = renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  );
  return { html, head: headHtml(path, page.meta) };
}

export { pagePaths, redirects };
