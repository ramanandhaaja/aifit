// app/api/generate-meal/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { mealType } = await request.json();

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a nutritionist who provides healthy meal recommendations."
                },
                {
                    role: "user",
                    content: `Suggest a healthy ${mealType} meal. Respond with a JSON object containing these fields:
          {
            "meal_type": "string (breakfast, lunch, or dinner)",
            "description": "string (detailed meal description)",
            "calories": "number (estimated calorie count)"
          }
          Ensure all fields are present and properly formatted as shown above.`
                }
            ]
        });

        console.log(completion);

        // Clean the response of any markdown formatting
        const content = completion.choices[0].message.content || '{}';
        const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
        const mealSuggestion = JSON.parse(cleanedContent);


        /*
        -- First disable RLS
        alter table meals disable row level security;
    
        -- Grant all permissions to anon role
        grant all privileges on table meals to anon;
    
        -- Grant all permissions to authenticated role as well (for completeness)
        grant all privileges on table meals to authenticated;
    
        -- If you're using UUID, also grant usage on the uuid-ossp extension
        grant usage on schema public to anon;
        grant usage on schema public to authenticated;
        */

        console.log(mealSuggestion);
        return NextResponse.json(mealSuggestion);
    } catch (error) {
        console.error('Meal generation error:', error);
        return NextResponse.json({
            error: 'Failed to generate meal',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}