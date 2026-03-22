import { ArrowDownLeft, ArrowUpRight, Loader2, Plus, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import TransactionForm from '../components/shared/TransactionForm';
import SummaryCard from '../components/shared/SummaryCard';
import TransactionItem from '../components/shared/TransactionItem';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Modal from '../components/ui/Modal';
import { useAuth } from '../store/authStore';
import { useCategories } from '../hooks/useCategories';
import { useTransactions } from '../hooks/useTransactions';

export default function DashboardPage() {
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

  const recentTransactions = summary?.transactions?.slice(0, 5) ?? [];

  return (
    <>
      <Navbar title={t('dashboard.title')} />

      <div className="space-y-6 mt-6">
        {/* Period filter */}
        <div className="flex flex-wrap items-center gap-3">
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
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-card outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />
          <Button onClick={openAdd} size="sm" className="ml-auto">
            <Plus size={15} /> {t('transactions.add')}
          </Button>
        </div>

        {/* Summary cards */}
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="animate-spin text-primary-500" size={32} />
          </div>
        ) : error ? (
          <p className="rounded-xl bg-expense-50 px-4 py-3 text-sm text-expense-700">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SummaryCard label={t('dashboard.totalIncome')}  amount={summary?.total_income  ?? 0} icon={ArrowUpRight}  variant="income" />
              <SummaryCard label={t('dashboard.totalExpense')} amount={summary?.total_expense ?? 0} icon={ArrowDownLeft} variant="expense" />
              <SummaryCard label={t('dashboard.balance')}      amount={summary?.balance       ?? 0} icon={TrendingUp}    variant="balance" />
            </div>

            {/* Recent transactions */}
            <div className="rounded-xl bg-white shadow-card border border-slate-100">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-700">{t('dashboard.recentTransactions')}</h2>
                <Link to="/transactions" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  {t('dashboard.seeAll')}
                </Link>
              </div>
              {recentTransactions.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-slate-400">{t('dashboard.noTransactions')}</p>
              ) : (
                <div className="divide-y divide-slate-50">
                  {recentTransactions.map((tx) => (
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
          </>
        )}
      </div>

      {/* Add / Edit modal */}
      <Modal open={modalOpen} onClose={closeModal} title={editTarget ? t('transactions.editTitle') : t('transactions.newTitle')}>
        <TransactionForm initial={editTarget} categories={categories} onSubmit={handleSubmit} onCancel={closeModal} />
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
