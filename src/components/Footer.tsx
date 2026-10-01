import { Mail, MapPin, Phone } from 'lucide-react';
import { site, features, telHref, mailHref } from '@/config/site';
import { featuredServices } from '@/data/services';
import { navItems } from '@/routes';
import { track } from '@/lib/analytics';
import { Link } from './Link';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-950 pb-20 text-brand-100 sm:pb-0">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">{site.tagline}.</p>
          <p className="mt-4 text-xs text-brand-300">Licensed &amp; insured · Oregon CCB #{site.ccbNumber}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {featuredServices.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="font-semibold text-accent-300 hover:text-accent-200">
                All services →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            {features.careers && (
              <li>
                <Link to="/careers" className="hover:text-white">
                  Careers — we’re hiring
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={telHref} onClick={() => track('call_click', { location: 'footer' })} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4" aria-hidden /> {site.phone.display}
              </a>
            </li>
            <li>
              <a href={mailHref} onClick={() => track('email_click', { location: 'footer' })} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4" aria-hidden /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden /> Portland metro, OR &amp; Vancouver, WA
            </li>
          </ul>
          <dl className="mt-5 space-y-1 text-xs text-brand-300">
            {site.hours.map((h) => (
              <div key={h.days} className="flex gap-2">
                <dt className="w-20">{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-brand-300 sm:flex-row sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Proudly serving Portland, Oregon.</p>
        </div>
      </div>
    </footer>
  );
}
