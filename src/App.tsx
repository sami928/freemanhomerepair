import { useEffect } from 'react';
import { features } from '@/config/site';
import { useRoute } from '@/lib/router';
import { useSEO } from '@/lib/seo';
import { trackPageView } from '@/lib/analytics';
import { resolve } from '@/routeTable';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileCtaBar } from '@/components/MobileCtaBar';

/** `initialPath` is only set by the build-time prerender (src/entry-server.tsx). */
export default function App({ initialPath }: { initialPath?: string }) {
  const path = useRoute(initialPath);
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
