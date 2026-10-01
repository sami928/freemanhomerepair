import { Phone, MessageSquare, ClipboardList } from 'lucide-react';
import { telHref, smsHref } from '@/config/site';
import { track } from '@/lib/analytics';
import { Link } from './Link';

/**
 * Sticky bottom bar on phones — most handyman leads come from mobile,
 * so call / text / quote is always one tap away.
 */
export function MobileCtaBar() {
  const item = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold';
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,0.06)] sm:hidden">
      <a href={telHref} onClick={() => track('call_click', { location: 'mobile_bar' })} className={`${item} text-brand-800`}>
        <Phone className="h-5 w-5" aria-hidden />
        Call
      </a>
      <a href={smsHref} onClick={() => track('text_click', { location: 'mobile_bar' })} className={`${item} border-x border-slate-200 text-brand-800`}>
        <MessageSquare className="h-5 w-5" aria-hidden />
        Text
      </a>
      <Link to="/#quote" className={`${item} bg-accent-500 text-white`}>
        <ClipboardList className="h-5 w-5" aria-hidden />
        Free Quote
      </Link>
    </div>
  );
}
