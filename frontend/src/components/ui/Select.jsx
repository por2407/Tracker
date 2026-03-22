import { clsx } from 'clsx';
import { forwardRef } from 'react';

/**
 * Reusable <select> wrapper.
 */
const Select = forwardRef(function Select(
  { label, error, className, id, children, ...props },
  ref,
) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm text-slate-800 outline-none transition bg-white',
          error
            ? 'border-expense-500 focus:ring-2 focus:ring-expense-300'
            : 'border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-expense-600">{error}</p>}
    </div>
  );
});

export default Select;
