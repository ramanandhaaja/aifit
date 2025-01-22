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
    
    // This command inserts a new meal into the 'meals' table in Supabase,
    // then selects and returns the inserted row as a single object.
    // If successful, 'data' will contain the inserted meal,
    // and if there's an error, it will be in the 'error' variable.
    const { data, error } = await supabase
      .from('meals')
      .insert([meal])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save meal' }, 
      { status: 500 }
    );
  }
}