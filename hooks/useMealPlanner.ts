// hooks/useMealPlanner.ts
import { useState } from 'react';

export function useMealPlanner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMeal = async (mealType: string) => {
    try {
      setLoading(true);
      setError(null);

      // Call OpenAI API
      const mealResponse = await fetch('/api/generate-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealType }),
      });

      if (!mealResponse.ok) throw new Error('Failed to generate meal');
      const meal = await mealResponse.json();

      // Save meal through API
      const saveResponse = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meal),
      });

      if (!saveResponse.ok) throw new Error('Failed to save meal');
      return await saveResponse.json();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateMeal, loading, error };
}