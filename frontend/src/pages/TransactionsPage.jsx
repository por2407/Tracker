import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/layout/Navbar';
import TransactionForm from '../components/shared/TransactionForm';
import TransactionItem from '../components/shared/TransactionItem';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Modal from '../components/ui/Modal';
import { useCategories } from '../hooks/useCategories';
import { useTransactions } from '../hooks/useTransactions';
import { useAuth } from '../store/authStore';

export default function TransactionsPage() {
  const { user } = useAuth();
  const { categories } = useCategories();
  const { t } = useTranslation();
  const {
    summary,
    loading,
    error,
    filterType,
    setFilterType,
    filterDate,
    setFilterDate,
    create,
    update,
    remove,
  } = useTransactions(user?.id);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openAdd  = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (tx) => { setEditTarget(tx); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  const handleSubmit = async (payload) => {
    if (editTarget) await update(payload);
    else await create(payload);
    closeModal();
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try { await remove(deleteId); }
    finally { setDeleting(false); setDeleteId(null); }
  };

  const periodOptions = [
    { value: 'daily',   label: t('period.daily') },
    { value: 'monthly', label: t('period.monthly') },
    { value: 'yearly',  label: t('period.yearly') },
  ];

  const transactions = summary?.transactions ?? [];

  return (
    <>
      <Navbar title={t('transactions.title')} />

      <div className="space-y-6 mt-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Period filter */}
            <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white shadow-card">
              {periodOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFilterType(value)}
                  className={`px-4 py-2 text-sm font-medium transition-colors
                    ${filterType === value
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Date picker */}
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-card outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <Button onClick={openAdd} className="shrink-0">
            <Plus size={16} />
            {t('transactions.add')}
          </Button>
        </div>

        {/* ── Transaction list ──────────────────────────── */}
        <div className="rounded-xl bg-white shadow-card border border-slate-100">
          {/* Summary strip */}
          {summary && (
            <div className="flex items-center gap-6 px-5 py-3 bg-slate-50 rounded-t-xl border-b border-slate-100 text-sm">
              <span className="text-slate-500">
                {t('transactions.period')}:{' '}
                <span className="font-medium text-slate-700">{summary.period}</span>
              </span>
              <span className="text-income-600 font-medium">
                +฿{summary.total_income.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-expense-600 font-medium">
                −฿{Math.abs(summary.total_expense).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-primary-700 font-semibold ml-auto">
                {t('dashboard.balance')}: ฿{summary.balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          {/* Loading / Error / List */}
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="animate-spin text-primary-500" size={28} />
            </div>
          ) : error ? (
            <p className="px-5 py-8 text-center text-sm text-expense-700">{error}</p>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-slate-400">
              <p className="text-sm">{t('transactions.noData')}</p>
              <Button variant="outline" size="sm" onClick={openAdd}>
                <Plus size={14} /> {t('transactions.addFirst')}
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  categories={categories}
                  onEdit={openEdit}
                  onDelete={(id) => setDeleteId(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editTarget ? t('transactions.editTitle') : t('transactions.newTitle')}
      >
        <TransactionForm
          initial={editTarget}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title={t('transactions.confirmDeleteTitle')}
        message={t('transactions.confirmDeleteMsg')}
        loading={deleting}
      />
    </>
  );
}
