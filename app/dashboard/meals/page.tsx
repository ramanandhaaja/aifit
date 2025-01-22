// app/page.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useMealPlanner } from '@/hooks/useMealPlanner';

export default function Home() {
  const { generateMeal, loading, error } = useMealPlanner();
  const [meals, setMeals] = useState<any[]>([]);

  const handleGenerateMeal = async (mealType: string) => {
    const meal = await generateMeal(mealType);
    if (meal) {
      setMeals(prev => [...prev, meal]);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">AI Meal Planner</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button 
          onClick={() => handleGenerateMeal('breakfast')}
          disabled={loading}
        >
          Generate Breakfast
        </Button>
        <Button 
          onClick={() => handleGenerateMeal('lunch')}
          disabled={loading}
        >
          Generate Lunch
        </Button>
        <Button 
          onClick={() => handleGenerateMeal('dinner')}
          disabled={loading}
        >
          Generate Dinner
        </Button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals.map((meal, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{meal.meal_type.toUpperCase()}</CardTitle>
              <p className="font-bold">Calories: {meal.calories}, Protein: {meal.protein}, Fat: {meal.fat}, Carbs: {meal.carbs}</p>
            </CardHeader>
            <CardContent>
              
              <p>{meal.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}