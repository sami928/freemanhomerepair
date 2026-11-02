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

type Tag = { attr: 'name' | 'property'; key: string; content: string };
type Head = { title: string; canonical: string; metas: Tag[]; jsonLd: { business: object; page: object[] | null } };

/** Everything that goes in <head> for a page. Shared by the browser hook and the build-time prerender. */
export function buildHead(path: string, meta: PageMeta): Head {
  const canonicalPath = meta.canonicalPath ?? path;
  const url = `${site.url}${canonicalPath === '/' ? '' : canonicalPath}`;
  const image = `${site.url}/og-image.jpg`;
  return {
    title: meta.title,
    canonical: url,
    metas: [
      { attr: 'name', key: 'description', content: meta.description },
      { attr: 'name', key: 'robots', content: meta.noindex ? 'noindex, nofollow' : 'index, follow' },
      { attr: 'property', key: 'og:title', content: meta.title },
      { attr: 'property', key: 'og:description', content: meta.description },
      { attr: 'property', key: 'og:url', content: url },
      { attr: 'property', key: 'og:type', content: 'website' },
      { attr: 'property', key: 'og:site_name', content: site.name },
      { attr: 'property', key: 'og:image', content: image },
      { attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
      { attr: 'name', key: 'twitter:title', content: meta.title },
      { attr: 'name', key: 'twitter:description', content: meta.description },
      { attr: 'name', key: 'twitter:image', content: image },
    ],
    jsonLd: { business: localBusinessSchema(), page: meta.jsonLd?.length ? meta.jsonLd : null },
  };
}

/** Serialized <head> tags, written into each prerendered HTML file. */
export function headHtml(path: string, meta: PageMeta): string {
  const h = buildHead(path, meta);
  const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // JSON inside <script> only needs "</" neutralized.
  const json = (v: object) => JSON.stringify(v).replace(/</g, '\\u003c');
  return [
    `<title>${esc(h.title)}</title>`,
    ...h.metas.map((m) => `<meta ${m.attr}="${m.key}" content="${esc(m.content)}" />`),
    `<link rel="canonical" href="${esc(h.canonical)}" />`,
    `<script type="application/ld+json" id="jsonld-business">${json(h.jsonLd.business)}</script>`,
    ...(h.jsonLd.page ? [`<script type="application/ld+json" id="jsonld-page">${json(h.jsonLd.page)}</script>`] : []),
  ].join('\n    ');
}

/** Keeps <head> in sync as the visitor navigates between pages in the browser. */
export function useSEO(path: string, pageMeta: PageMeta) {
  // Route tables build a fresh meta object on every render; key on its content.
  const key = JSON.stringify(pageMeta);
  useEffect(() => {
    const h = buildHead(path, JSON.parse(key) as PageMeta);
    document.title = h.title;
    for (const m of h.metas) setMeta(m.attr, m.key, m.content);
    setLink('canonical', h.canonical);
    setJsonLd('jsonld-business', h.jsonLd.business);
    setJsonLd('jsonld-page', h.jsonLd.page);
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
