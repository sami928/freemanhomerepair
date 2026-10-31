import { useEffect } from 'react';
import { site } from '@/config/site';
import { areas } from '@/data/areas';

export type PageMeta = {
  title: string;
  description: string;
  noindex?: boolean;
  /** Canonical path when it differs from the current path (e.g. an alias URL). */
  canonicalPath?: string;
  /** Extra page-specific structured data (Service, FAQPage, …). */
  jsonLd?: object[];
};

/** Sets title, description, canonical, Open Graph and LocalBusiness JSON-LD. */
export function useSEO(path: string, pageMeta: PageMeta) {
  // Route tables build a fresh meta object on every render; key on its content.
  const key = JSON.stringify(pageMeta);
  useEffect(() => {
    const meta = JSON.parse(key) as PageMeta;
    const canonical = meta.canonicalPath ?? path;
    const url = `${site.url}${canonical === '/' ? '' : canonical}`;
    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');
    setLink('canonical', url);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', site.name);
    setMeta('property', 'og:image', `${site.url}/og-image.jpg`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:image', `${site.url}/og-image.jpg`);
    setJsonLd('jsonld-business', localBusinessSchema());
    setJsonLd('jsonld-page', meta.jsonLd?.length ? meta.jsonLd : null);
  }, [path, key]);
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/freeman-logo.png`,
    image: `${site.url}/og-image.jpg`,
    telephone: site.phone.tel,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: areas.map((a) => ({ '@type': 'City', name: a.name })),
    openingHours: site.openingHours,
    priceRange: '$$',
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id: string, data: object | null) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
