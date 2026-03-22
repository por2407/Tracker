import { clsx } from 'clsx';

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
  secondary:
    'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400',
  danger:
    'bg-expense-600 text-white hover:bg-expense-700 focus-visible:ring-expense-500',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-800 focus-visible:ring-slate-400',
  outline:
    'border border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
  icon: 'h-9 w-9',
};

/**
 * Reusable Button
 * @param {'primary'|'secondary'|'danger'|'ghost'|'outline'} variant
 * @param {'sm'|'md'|'lg'|'icon'} size
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
