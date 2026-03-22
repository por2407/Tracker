import { clsx } from 'clsx';
import { forwardRef } from 'react';

/**
 * Reusable text input (also works as textarea via `as` prop).
 */
const Input = forwardRef(function Input(
  { label, error, className, id, ...props },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm text-slate-800 outline-none transition',
          'placeholder:text-slate-400',
          error
            ? 'border-expense-500 focus:ring-2 focus:ring-expense-300'
            : 'border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-expense-600">{error}</p>}
    </div>
  );
});

export default Input;
