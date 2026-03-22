import { useCallback, useEffect, useState } from 'react';
import {
  createTransaction,
  deleteTransaction,
  getSummary,
  updateTransaction,
} from '../api/transaction.api';

/**
 * Manages all transaction data fetching and mutations for a given userID.
 */
export function useTransactions(userID) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter state
  const [filterType, setFilterType] = useState('monthly');
  const [filterDate, setFilterDate] = useState(
    () => new Date().toISOString().split('T')[0], // today YYYY-MM-DD
  );

  const fetchSummary = useCallback(async () => {
    if (!userID) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getSummary(userID, filterType, filterDate);
      setSummary(data);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [userID, filterType, filterDate]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const create = async (payload) => {
    await createTransaction(payload);
    await fetchSummary();
  };

  const update = async (payload) => {
    await updateTransaction(payload);
    await fetchSummary();
  };

  const remove = async (id) => {
    await deleteTransaction(id);
    await fetchSummary();
  };

  return {
    summary,
    loading,
    error,
    filterType,
    setFilterType,
    filterDate,
    setFilterDate,
    refetch: fetchSummary,
    create,
    update,
    remove,
  };
}
