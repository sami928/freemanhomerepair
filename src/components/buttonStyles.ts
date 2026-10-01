import type { ReactNode } from 'react';

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost-light';
export type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-accent-500 text-white shadow-sm hover:bg-accent-600 focus-visible:outline-accent-500',
  secondary: 'bg-brand-800 text-white hover:bg-brand-900 focus-visible:outline-brand-800',
  outline: 'border-2 border-brand-800 text-brand-800 hover:bg-brand-50 focus-visible:outline-brand-800',
  'ghost-light': 'border-2 border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white',
};

const sizes: Record<Size, string> = {
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

export type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function buttonClass({ variant = 'primary', size = 'md', className = '' }: Omit<Common, 'children'>) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

