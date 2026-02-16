import { useState, useEffect } from 'react';
import type { FileWithMeta } from '../types';
import { fetchAllFiles } from '../utils/github';

interface UseRepoDataReturn {
  categories: Map<string, FileWithMeta[]>;
  loading: boolean;
  error: string | null;
}

export function useRepoData(): UseRepoDataReturn {
  const [categories, setCategories] = useState<Map<string, FileWithMeta[]>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchAllFiles();
        if (!cancelled) {
          setCategories(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading, error };
}
