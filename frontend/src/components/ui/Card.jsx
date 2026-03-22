import { clsx } from 'clsx';

/**
 * Reusable Card container.
 * @param {'sm'|'md'|'lg'} padding
 */
export default function Card({ className, padding = 'md', children, ...props }) {
  const paddings = { sm: 'p-4', md: 'p-5', lg: 'p-6' };
  return (
    <div
      className={clsx(
        'rounded-xl bg-white shadow-card border border-slate-100',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
