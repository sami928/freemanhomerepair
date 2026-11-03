import type { ReactElement } from 'react';
import { features, site } from '@/config/site';
import { services, findService } from '@/data/services';
import type { PageMeta } from '@/lib/seo';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ServicePage } from '@/pages/ServicePage';
import { ServiceAreaPage } from '@/pages/ServiceAreaPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { ThankYouPage } from '@/pages/ThankYouPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ReviewsPage, TeamPage, CareersPage } from '@/pages/ExpansionPages';
import { ChristmasLightsPage } from '@/pages/ChristmasLightsPage';
import { PATH as CHRISTMAS_PATH, pageMeta as christmasMeta, christmasJsonLd } from '@/data/christmasLights';

export type Page = { element: ReactElement; meta: PageMeta };

const suffix = `| ${site.name}`;
/** Shorter brand for long, keyword-first titles; Google shows the site name above results anyway. */
const shortSuffix = '| Freeman';

/** Static routes. Add a page by adding an entry here (and to navItems in routes.ts if it belongs in the nav). */
const staticRoutes: Record<string, () => Page> = {
  '/': () => ({
    element: <HomePage />,
    meta: {
      title: `Handyman in Portland, OR ${suffix}`,
      description: `Portland handyman for home repairs and maintenance — drywall, painting, fixtures, doors, decks and more. Upfront pricing, no job too small. ${site.phone.display}.`,
    },
  }),
  '/services': () => ({
    element: <ServicesPage />,
    meta: {
      title: `Home Repair & Maintenance Services in Portland ${shortSuffix}`,
      description: 'Every home repair and maintenance service we offer in the Portland metro, from drywall and painting to gutters, TV mounting and holiday lights. Free quotes.',
    },
  }),
  '/service-area': () => ({
    element: <ServiceAreaPage />,
    meta: {
      title: `Service Area: Portland, Beaverton & Lake Oswego ${shortSuffix}`,
      description: 'Home repair and maintenance in Portland, Beaverton, Hillsboro, Tigard, Tualatin, Lake Oswego, West Linn, Milwaukie, Gresham, Happy Valley and Vancouver, WA.',
    },
  }),
  '/about': () => ({
    element: <AboutPage />,
    meta: {
      title: `About Us: Locally Owned in Portland ${suffix}`,
      description: `Meet ${site.name}: a locally owned Portland home repair and maintenance company that shows up on time, prices upfront and does work we’re proud of.`,
    },
  }),
  '/contact': () => ({
    element: <ContactPage />,
    meta: {
      title: `Contact Us for a Free Home Repair Quote ${shortSuffix}`,
      description: `Call or text ${site.phone.display}, email us, or request a free home repair quote online. We reply ${site.responseTime}. Serving the Portland metro.`,
    },
  }),
  '/thank-you': () => ({
    element: <ThankYouPage />,
    meta: { title: `Thank You ${suffix}`, description: 'Your request has been received.', noindex: true },
  }),
  ...(features.holidayLights
    ? {
        [CHRISTMAS_PATH]: () => ({ element: <ChristmasLightsPage />, meta: { ...christmasMeta, jsonLd: christmasJsonLd() } }),
      }
    : {}),
  ...(features.reviews
    ? {
        '/reviews': () => ({ element: <ReviewsPage />, meta: { title: `Reviews ${suffix}`, description: `What Portland homeowners say about ${site.name}.` } }),
      }
    : {}),
  ...(features.team
    ? {
        '/team': () => ({ element: <TeamPage />, meta: { title: `Our Team ${suffix}`, description: `Meet the ${site.name} team.` } }),
      }
    : {}),
  ...(features.careers
    ? {
        '/careers': () => ({ element: <CareersPage />, meta: { title: `Careers ${suffix}`, description: `Join the ${site.name} team in Portland.` } }),
      }
    : {}),
};

export function resolve(path: string): Page {
  const fixed = staticRoutes[path];
  if (fixed) return fixed();

  const serviceMatch = path.match(/^\/services\/([\w-]+)$/);
  const service = serviceMatch && findService(serviceMatch[1]);
  // A service with its own landing page: render that page, canonical to its real URL.
  if (service?.href && staticRoutes[service.href]) {
    const landing = staticRoutes[service.href]();
    return { ...landing, meta: { ...landing.meta, canonicalPath: service.href } };
  }
  if (service) {
    return {
      element: <ServicePage service={service} />,
      meta: { title: `${service.seo.title} ${shortSuffix}`, description: service.seo.description, noindex: service.noindex },
    };
  }

  return { element: <NotFoundPage />, meta: { title: `Page Not Found ${suffix}`, description: 'Page not found.', noindex: true } };
}

/** Every real page, for the build-time prerender and the sitemap. */
export function pagePaths(): string[] {
  return [...Object.keys(staticRoutes), ...services.filter((s) => !s.href).map((s) => `/services/${s.slug}`)];
}

/** Old or alternate URLs that should permanently redirect to a page. */
export function redirects(): { from: string; to: string }[] {
  return services.filter((s) => s.href && staticRoutes[s.href]).map((s) => ({ from: `/services/${s.slug}`, to: s.href! }));
}
