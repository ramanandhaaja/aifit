import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const meal = await request.json();
    
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