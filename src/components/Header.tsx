import { useEffect, useState } from 'react';
import { Menu, X, Clock } from 'lucide-react';
import { site } from '@/config/site';
import { navItems } from '@/routes';
import { Link } from './Link';
import { Logo } from './Logo';
import { ButtonLink } from './Button';
import { CallButton } from './ContactLinks';

export function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  const isActive = (to: string) => (to === '/' ? path === '/' : path === to || path.startsWith(`${to}/`));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      {/* Top strip: hours + license — trust signals before anything else */}
      <div className="hidden bg-brand-900 text-xs text-brand-100 sm:block">
        <div className="container-x flex h-9 items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {site.hours[0].days} {site.hours[0].time} · Serving the Portland metro
          </span>
          <span>Licensed &amp; insured · OR CCB #{site.ccbNumber}</span>
        </div>
      </div>

      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.path) ? 'text-brand-800' : 'text-slate-600 hover:text-brand-800'
              }`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CallButton variant="outline" location="header" className="hidden md:inline-flex" />
          <ButtonLink to="/#quote" className="hidden sm:inline-flex">
            Free Quote
          </ButtonLink>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white lg:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col py-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-md px-3 py-3 text-base font-medium ${
                  isActive(item.path) ? 'bg-brand-50 text-brand-800' : 'text-slate-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <CallButton variant="outline" location="mobile_menu" label="Call" />
              <ButtonLink to="/#quote">Free Quote</ButtonLink>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
