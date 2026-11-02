/**
 * Conversion tracking. Calls go to GA4 (property G-JDGPSR18GZ, or
 * VITE_GA_ID if set), so components can track freely. Add Meta Pixel,
 * Google Ads conversions, etc. here without touching the components.
 */

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export type ConversionEvent =
  | 'call_click'
  | 'text_click'
  | 'email_click'
  | 'quote_start'
  | 'quote_submit'
  | 'quote_error';

export function initAnalytics() {
  const id = import.meta.env.VITE_GA_ID || 'G-JDGPSR18GZ';
  if (!id || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false });

  // Events queue in dataLayer until the tag loads, so nothing is lost by
  // waiting. Google's ~180 KB tag otherwise ties up phones for ~0.4 s while
  // the page is loading, so load it on the visitor's first interaction, or
  // 5 s after the page loads, whichever comes first.
  const triggers = ['scroll', 'pointerdown', 'keydown', 'touchstart'] as const;
  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    triggers.forEach((t) => window.removeEventListener(t, load));
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
  };
  triggers.forEach((t) => window.addEventListener(t, load, { once: true, passive: true }));
  const afterLoad = () => setTimeout(load, 5000);
  if (document.readyState === 'complete') afterLoad();
  else window.addEventListener('load', afterLoad, { once: true });
}

export function track(event: ConversionEvent, params: Record<string, unknown> = {}) {
  window.gtag?.('event', event, params);
  if (import.meta.env.DEV) console.debug('[track]', event, params);
}

export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', { page_path: path, page_title: document.title });
}
