import { clsx } from 'clsx';
import { Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

function formatAmount(amount) {
  return `${amount >= 0 ? '+' : ''}฿${Math.abs(amount).toLocaleString('th-TH', {
    minimumFractionDigits: 2,
  })}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('th-TH', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Single transaction row.
 * @param {{ id, amount, note, date, category_id }} transaction
 * @param {Category[]} categories
 * @param {(tx) => void} onEdit
 * @param {(id) => void} onDelete
 */
export default function TransactionItem({ transaction, categories, onEdit, onDelete }) {
  const { t } = useTranslation();
  const isIncome = transaction.amount >= 0;
  const category = categories.find((c) => c.id === transaction.category_id);

  return (
    <div className="flex items-center justify-between gap-3 py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors group">
      {/* Left: indicator + info */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={clsx(
            'h-10 w-10 shrink-0 flex items-center justify-center rounded-xl text-lg font-bold',
            isIncome ? 'bg-income-50 text-income-600' : 'bg-expense-50 text-expense-600',
          )}
        >
          {isIncome ? '+' : '−'}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">
            {transaction.note || t('transactions.noDescription')}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            {category && (
              <Badge variant="neutral">{category.name}</Badge>
            )}
            <span className="text-xs text-slate-400">{formatDate(transaction.date)}</span>
          </div>
        </div>
      </div>

      {/* Right: amount + actions */}
      <div className="flex items-center gap-2 shrink-0">
        <span
          className={clsx(
            'text-sm font-semibold',
            isIncome ? 'text-income-600' : 'text-expense-600',
          )}
        >
          {formatAmount(transaction.amount)}
        </span>

        {/* Edit / Delete shown on hover */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-primary-600"
            onClick={() => onEdit(transaction)}
            aria-label={t('transactions.editLabel')}
          >
            <Pencil size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-expense-600"
            onClick={() => onDelete(transaction.id)}
            aria-label={t('transactions.deleteLabel')}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}
