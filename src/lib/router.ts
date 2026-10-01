import { useEffect, useState, type MouseEvent } from 'react';

/**
 * Minimal History API router. Routes are real paths (/services, not
 * /#/services) so every page is crawlable. The host must serve index.html
 * for unknown paths — see public/.htaccess, public/_redirects, vercel.json.
 *
 * If the site outgrows this (nested layouts, data loaders), swap in
 * react-router; pages only depend on useRoute(), navigate() and <Link>.
 */

const ROUTE_CHANGE = 'app:routechange';

function normalize(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function useRoute(): string {
  const [path, setPath] = useState(() => normalize(window.location.pathname));

  useEffect(() => {
    const onChange = () => setPath(normalize(window.location.pathname));
    window.addEventListener('popstate', onChange);
    window.addEventListener(ROUTE_CHANGE, onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener(ROUTE_CHANGE, onChange);
    };
  }, []);

  return path;
}

export function navigate(to: string) {
  const [path, hash] = to.split('#');
  const target = normalize(path || window.location.pathname);

  if (target !== normalize(window.location.pathname)) {
    window.history.pushState({}, '', target + (hash ? `#${hash}` : ''));
    window.dispatchEvent(new Event(ROUTE_CHANGE));
  }

  // Wait a frame so the new page has rendered before scrolling.
  requestAnimationFrame(() => {
    const el = hash ? document.getElementById(hash) : null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0 });
  });
}

/** onClick handler for internal <a href> links: lets modified clicks open new tabs. */
export function handleLinkClick(e: MouseEvent<HTMLAnchorElement>, to: string) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  navigate(to);
}
