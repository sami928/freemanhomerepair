import { useEffect, type ReactElement } from 'react';
import { features, site } from '@/config/site';
import { findService } from '@/data/services';
import { useRoute } from '@/lib/router';
import { useSEO, type PageMeta } from '@/lib/seo';
import { trackPageView } from '@/lib/analytics';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileCtaBar } from '@/components/MobileCtaBar';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ServicePage } from '@/pages/ServicePage';
import { ServiceAreaPage } from '@/pages/ServiceAreaPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { ThankYouPage } from '@/pages/ThankYouPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ReviewsPage, TeamPage, CareersPage } from '@/pages/ExpansionPages';

type Page = { element: ReactElement; meta: PageMeta };

const suffix = `| ${site.name}`;

/** Static routes. Add a page by adding an entry here (and to navItems in routes.ts if it belongs in the nav). */
const staticRoutes: Record<string, () => Page> = {
  '/': () => ({
    element: <HomePage />,
    meta: {
      title: `Portland Handyman & Home Repair Services ${suffix}`,
      description: `Reliable handyman, home repair and maintenance across the Portland metro. Licensed & insured, upfront pricing. Call ${site.phone.display} or get a free quote online.`,
    },
  }),
  '/services': () => ({
    element: <ServicesPage />,
    meta: { title: `Handyman Services in Portland, OR ${suffix}`, description: 'Drywall, painting, minor plumbing, fixtures, doors, decks, fences and general repairs across the Portland metro.' },
  }),
  '/service-area': () => ({
    element: <ServiceAreaPage />,
    meta: { title: `Service Area — Portland Metro ${suffix}`, description: 'Serving Portland, Beaverton, Hillsboro, Tigard, Lake Oswego, Gresham, Vancouver WA and more.' },
  }),
  '/about': () => ({
    element: <AboutPage />,
    meta: { title: `About Us ${suffix}`, description: `${site.name} is a local, licensed and insured Portland home repair company.` },
  }),
  '/contact': () => ({
    element: <ContactPage />,
    meta: { title: `Contact Us — Free Quote ${suffix}`, description: `Call, text or request a free quote. We reply ${site.responseTime}.` },
  }),
  '/thank-you': () => ({
    element: <ThankYouPage />,
    meta: { title: `Thank You ${suffix}`, description: 'Your request has been received.', noindex: true },
  }),
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

function resolve(path: string): Page {
  const fixed = staticRoutes[path];
  if (fixed) return fixed();

  const serviceMatch = path.match(/^\/services\/([\w-]+)$/);
  const service = serviceMatch && findService(serviceMatch[1]);
  if (service) {
    return {
      element: <ServicePage service={service} />,
      meta: { title: `${service.name} in Portland, OR ${suffix}`, description: `${service.summary} Licensed & insured. Free quotes across the Portland metro.` },
    };
  }

  return { element: <NotFoundPage />, meta: { title: `Page Not Found ${suffix}`, description: 'Page not found.', noindex: true } };
}

export default function App() {
  const path = useRoute();
  const page = resolve(path);
  useSEO(path, page.meta);

  useEffect(() => trackPageView(path), [path]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main" className="flex-1">
        {page.element}
      </main>
      <Footer />
      {features.mobileCtaBar && <MobileCtaBar />}
    </div>
  );
}
