import { Phone, MessageSquare } from 'lucide-react';
import { site, telHref, smsHref } from '@/config/site';
import { track } from '@/lib/analytics';
import { buttonClass } from './buttonStyles';

type Props = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost-light';
  size?: 'md' | 'lg';
  className?: string;
  /** Where on the page the click came from, for conversion reports. */
  location: string;
  label?: string;
};

/** Click-to-call button. Every phone CTA should use this so calls are tracked. */
export function CallButton({ variant = 'primary', size = 'md', className = '', location, label }: Props) {
  return (
    <a
      href={telHref}
      onClick={() => track('call_click', { location })}
      className={buttonClass({ variant, size, className })}
    >
      <Phone className="h-4 w-4" aria-hidden />
      {label ?? site.phone.display}
    </a>
  );
}

export function TextButton({ variant = 'outline', size = 'md', className = '', location, label = 'Text us' }: Props) {
  return (
    <a
      href={smsHref}
      onClick={() => track('text_click', { location })}
      className={buttonClass({ variant, size, className })}
    >
      <MessageSquare className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}
