import { site } from '@/config/site';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="7" fill={light ? '#ffffff' : '#174337'} />
        <path d="M8 17 16 9l8 8v7a1 1 0 0 1-1 1h-4v-5h-6v5H9a1 1 0 0 1-1-1z" fill={light ? '#174337' : '#ffffff'} />
        <path d="M16 9 6 18.5M16 9l10 9.5" stroke="#ff8a3d" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-brand-900'}`}>
          Freeman
        </span>
        <span className={`block text-[11px] font-semibold uppercase tracking-[0.16em] ${light ? 'text-brand-200' : 'text-brand-600'}`}>
          Home Services
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
