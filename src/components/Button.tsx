import { Link } from './Link';
import { buttonClass, type Common } from './buttonStyles';

/** Internal route button. */
export function ButtonLink({ to, ...rest }: Common & { to: string }) {
  return (
    <Link to={to} className={buttonClass(rest)}>
      {rest.children}
    </Link>
  );
}
