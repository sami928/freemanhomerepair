import { useEffect } from 'react';
import { site } from '@/config/site';
import { areas } from '@/data/areas';

export type PageMeta = {
  title: string;
  description: string;
  noindex?: boolean;
};

/** Sets title, description, canonical, Open Graph and LocalBusiness JSON-LD. */
export function useSEO(path: string, meta: PageMeta) {
  useEffect(() => {
    const url = `${site.url}${path === '/' ? '' : path}`;
    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');
    setLink('canonical', url);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', site.name);
    setJsonLd(localBusinessSchema());
  }, [path, meta.title, meta.description, meta.noindex]);
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: site.name,
    url: site.url,
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

function setJsonLd(data: object) {
  const id = 'jsonld-business';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
