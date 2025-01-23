import { useState, useEffect } from 'react';
import { Meal } from '@/types/meal';
import { supabase } from '@/lib/supabase';

export function useLastMeals(limit: number = 10) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('meals')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);

        if (fetchError) throw fetchError;
        setMeals(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch meals');
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();

    // Set up real-time subscription
    const subscription = supabase
      .channel('meals-channel')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'meals',
        },
        async (payload) => {
          // Refetch meals when any change occurs
          await fetchMeals();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [limit]);

  return { meals, loading, error };
}
