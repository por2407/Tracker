import { clsx } from 'clsx';

const variants = {
  income:  'bg-income-50  text-income-700  border border-income-200',
  expense: 'bg-expense-50 text-expense-700 border border-expense-200',
  primary: 'bg-primary-50 text-primary-700 border border-primary-200',
  neutral: 'bg-slate-100  text-slate-600   border border-slate-200',
};

/**
 * Pill badge.
 * @param {'income'|'expense'|'primary'|'neutral'} variant
 */
export default function Badge({ variant = 'neutral', className, children }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
