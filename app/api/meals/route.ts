import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '5';

    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch meals' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const meal = await request.json();
    console.log("Received meal data:", meal);

    // Round nutritional values to integers
    const roundedMeal = {
      ...meal,
      protein: Math.round(Number(meal.protein) || 0),
      carbs: Math.round(Number(meal.carbs) || 0),
      fat: Math.round(Number(meal.fat) || 0),
      calories: Math.round(Number(meal.calories) || 0),
    };

    // Set default values for optional nutritional fields
    const mealWithDefaults = {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
      ...roundedMeal
    };

    // Validate required non-nutritional fields
    const requiredFields = ['meal_type', 'description', 'date'];
    const missingFields = requiredFields.filter(field => !mealWithDefaults[field]);
    
    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate meal_type
    const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    if (!validMealTypes.includes(mealWithDefaults.meal_type)) {
      console.error("Invalid meal_type:", mealWithDefaults.meal_type);
      return NextResponse.json(
        { error: `Invalid meal_type. Must be one of: ${validMealTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate numeric fields are not negative
    const numericFields = ['calories', 'protein', 'carbs', 'fat'];
    for (const field of numericFields) {
      if (typeof mealWithDefaults[field] !== 'number' || mealWithDefaults[field] < 0) {
        console.error(`Invalid ${field}:`, mealWithDefaults[field]);
        return NextResponse.json(
          { error: `Invalid ${field}. Must be a number greater than or equal to 0` },
          { status: 400 }
        );
      }
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(mealWithDefaults.date)) {
      console.error("Invalid date format:", mealWithDefaults.date);
      return NextResponse.json(
        { error: 'Invalid date format. Must be YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // Add created_at
    const finalMeal = {
      ...mealWithDefaults,
      created_at: new Date().toISOString(),
    };

    // Insert into database
    const { data, error } = await supabase
      .from('meals')
      .insert([finalMeal])
      .select()
      .single();

    console.log("Supabase response:", { data, error });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to save meal:", error);
    return NextResponse.json(
      { error: 'Failed to save meal', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}