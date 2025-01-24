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

        // Get current user session
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('Not authenticated');
        }

        const response = await fetch(`/api/meals?limit=${limit}&userId=${user.id}`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch meals');
        }

        const data = await response.json();
        console.log('Fetched meals:', data);
        setMeals(data || []);
      } catch (err) {
        console.error('Error fetching meals:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch meals');
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, [limit]);

  return { meals, loading, error };
}
