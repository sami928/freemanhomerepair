import { features } from '@/config/site';

/**
 * Main navigation. Page components are mapped to paths in App.tsx; this
 * file only holds what the header/footer need, so it has no page imports.
 */
export type NavItem = { path: string; label: string };

export const navItems: NavItem[] = [
  { path: '/services', label: 'Services' },
  { path: '/service-area', label: 'Service Area' },
  { path: '/about', label: 'About' },
  ...(features.reviews ? [{ path: '/reviews', label: 'Reviews' }] : []),
  ...(features.team ? [{ path: '/team', label: 'Our Team' }] : []),
  { path: '/contact', label: 'Contact' },
];
