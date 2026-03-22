import { clsx } from 'clsx';

/**
 * Summary stat card (Income / Expense / Balance).
 */
export default function SummaryCard({ label, amount, icon: Icon, variant = 'neutral' }) {
  const styles = {
    income: {
      bg: 'bg-income-50',
      iconBg: 'bg-income-100',
      iconColor: 'text-income-600',
      value: 'text-income-700',
    },
    expense: {
      bg: 'bg-expense-50',
      iconBg: 'bg-expense-100',
      iconColor: 'text-expense-600',
      value: 'text-expense-700',
    },
    balance: {
      bg: 'bg-primary-50',
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      value: 'text-primary-700',
    },
    neutral: {
      bg: 'bg-slate-50',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-500',
      value: 'text-slate-700',
    },
  };

  const s = styles[variant] ?? styles.neutral;

  return (
    <div
      className={clsx(
        'flex items-center gap-4 rounded-xl p-5 shadow-card border border-slate-100 bg-white',
      )}
    >
      {Icon && (
        <div className={clsx('flex h-12 w-12 items-center justify-center rounded-xl', s.iconBg)}>
          <Icon size={22} className={s.iconColor} />
        </div>
      )}
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <p className={clsx('text-2xl font-bold mt-0.5', s.value)}>
          {typeof amount === 'number'
            ? `฿${Math.abs(amount).toLocaleString('th-TH', { minimumFractionDigits: 2 })}`
            : '—'}
        </p>
      </div>
    </div>
  );
}
