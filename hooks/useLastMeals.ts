import { useState, useEffect } from 'react';
import { Meal } from '@/types/meal';

export function useLastMeals(limit: number = 5) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/meals?limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }

        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch meals');
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, [limit]);

  return { meals, loading, error };
}
