import { useEffect, useState } from 'react';
import { getCategories } from '../api/category.api';

/**
 * Fetches and caches category list for the duration of the session.
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then(setCategories)
      .catch((err) =>
        setError(err.response?.data?.error ?? 'Failed to load categories'),
      )
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
