import { site } from '@/config/site';

const NAVY = '#1e3a5f';
const GOLD = '#d4a534';

/** The shield emblem from the Freeman logo, redrawn as SVG so it stays crisp at any size. */
export function LogoMark({ className = 'h-11 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} aria-hidden>
      <path d="M50 2 96 14v46c0 28-20 46-46 58C24 106 4 88 4 60V14Z" fill={NAVY} />
      <path d="M50 9.5 89 19.5V60c0 24-17 39-39 50.5C28 99 11 84 11 60V19.5Z" fill="none" stroke={GOLD} strokeWidth="2.6" />
      <g fill={GOLD} stroke={GOLD} strokeLinecap="round">
        {/* hammer */}
        <line x1="31" y1="80" x2="62" y2="49" strokeWidth="7.5" />
        <rect x="49" y="38.5" width="32" height="12" rx="1.5" stroke="none" transform="rotate(45 65 44.5)" />
        {/* wrench */}
        <line x1="36" y1="46" x2="68" y2="79" strokeWidth="7.5" />
        <circle cx="36" cy="46" r="11" stroke="none" />
      </g>
      {/* wrench jaw opening */}
      <rect x="32.5" y="30" width="7" height="13" fill={NAVY} transform="rotate(-45 36 46)" />
    </svg>
  );
}

/** Full logo lockup: emblem + FREEMAN / gold rule / HOME SERVICES. */
export function Logo({ light = false }: { light?: boolean }) {
  const ink = light ? 'text-white' : 'text-brand-800';
  return (
    <span className="flex items-center gap-3">
      <LogoMark className="h-11 w-auto shrink-0 sm:h-12" />
      <span className="flex flex-col leading-none" aria-hidden>
        <span className={`font-display text-[22px] font-bold tracking-[0.06em] sm:text-2xl ${ink}`}>FREEMAN</span>
        <span className="my-[5px] h-[2px] w-full bg-accent-500" />
        <span className={`font-display text-[9.5px] font-semibold tracking-[0.42em] sm:text-[10.5px] ${ink}`}>HOME SERVICES</span>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
