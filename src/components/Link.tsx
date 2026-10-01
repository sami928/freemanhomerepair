import type { AnchorHTMLAttributes } from 'react';
import { handleLinkClick } from '@/lib/router';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/** Internal link: real href for crawlers and new-tab clicks, client-side navigation otherwise. */
export function Link({ to, onClick, ...rest }: Props) {
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e);
        handleLinkClick(e, to);
      }}
      {...rest}
    />
  );
}
