import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const DEFAULT_FORM = {
  type: 'income',
  amount: '',
  category_id: '',
  note: '',
  date: new Date().toISOString().split('T')[0],
};

export default function TransactionForm({ initial, categories, onSubmit, onCancel }) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initial) {
      setForm({
        type: initial.amount >= 0 ? 'income' : 'expense',
        amount: String(Math.abs(initial.amount)),
        category_id: String(initial.category_id),
        note: initial.note ?? '',
        date: initial.date?.split('T')[0] ?? DEFAULT_FORM.date,
      });
    } else {
      setForm(DEFAULT_FORM);
    }
    setError('');
  }, [initial]);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.amount || Number(form.amount) <= 0) {
      setError(t('common.invalidAmount'));
      return;
    }
    if (!form.category_id) {
      setError(t('common.selectCategory'));
      return;
    }

    const signedAmount =
      form.type === 'income' ? Number(form.amount) : -Number(form.amount);

    const payload = {
      ...(initial?.id ? { id: initial.id } : {}),
      user_id: user.id,
      category_id: Number(form.category_id),
      amount: signedAmount,
      note: form.note.trim(),
      date: new Date(form.date).toISOString(),
    };

    setSubmitting(true);
    try {
      await onSubmit(payload);
    } catch (err) {
      setError(err.response?.data?.error ?? t('common.somethingWrong'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Income / Expense toggle */}
      <div className="flex rounded-lg overflow-hidden border border-slate-200">
        {['income', 'expense'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setForm((p) => ({ ...p, type }))}
            className={`flex-1 py-2 text-sm font-medium capitalize transition-colors
              ${
                form.type === type
                  ? type === 'income'
                    ? 'bg-income-500 text-white'
                    : 'bg-expense-500 text-white'
                  : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
          >
            {t(`transactions.${type}`)}
          </button>
        ))}
      </div>

      <Input
        label={t('transactions.amount')}
        type="number"
        min="0.01"
        step="0.01"
        placeholder="0.00"
        value={form.amount}
        onChange={set('amount')}
        required
      />

      <Select
        label={t('transactions.category')}
        value={form.category_id}
        onChange={set('category_id')}
        required
      >
        <option value="">{t('transactions.selectCategory')}</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>

      <Input
        label={t('transactions.note')}
        type="text"
        placeholder={t('transactions.notePlaceholder')}
        value={form.note}
        onChange={set('note')}
      />

      <Input
        label={t('transactions.date')}
        type="date"
        value={form.date}
        onChange={set('date')}
        required
      />

      {error && (
        <p className="text-sm text-expense-600 rounded-lg bg-expense-50 px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t('transactions.cancel')}
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting
            ? t('transactions.saving')
            : initial
            ? t('transactions.saveChanges')
            : t('transactions.add')}
        </Button>
      </div>
    </form>
  );
}
