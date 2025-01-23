// app/api/chat/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Message } from "@/types/message";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    console.log("Received message:", message);

    if (!message || typeof message !== "object" || !message.user_id) {
      console.error("Invalid message format:", message);
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    // Use the user_id from the message instead of getting it from session
    const userId = message.user_id;

    // Store the user message in Supabase
    const { data, error: insertError } = await supabase
      .from("messages")
      .insert(message)
      .select();

    if (insertError) {
      console.error("Error storing message:", insertError);
      return NextResponse.json(
        {
          error: "Failed to store message",
          details: insertError.message,
        },
        { status: 500 }
      );
    }

    console.log("Successfully inserted message:", data);

    // Fetch previous messages for this user
    const { data: previousMessages, error: fetchError } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(50); // Limit to last 50 messages to manage context length

    if (fetchError) {
      console.error("Error fetching previous messages:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch message history" },
        { status: 500 }
      );
    }

    // Convert previous messages to OpenAI format
    const messageHistory = previousMessages.map((msg) => ({
      role: msg.role as "user" | "assistant" | "system",
      content: msg.content,
    }));

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI meal planning assistant that manages meals in a database. 
          When users want to:
          
          1. Record new meal: Respond with JSON format:
          {
            "action": "create",
            "meal": {
              "meal_type": "breakfast | lunch | dinner | snack",
              "description": "detailed meal description",
              "calories": number,
              "protein": number,
              "carbs": number,
              "fat": number,
              "date": "YYYY-MM-DD",
              "user_id": "string"
            }
          }
          
          2. Update meal: Respond with JSON format:
          {
            "action": "update",
            "meal_id": number,
            "updates": {
              "meal_type?": "breakfast | lunch | dinner | snack",
              "description?": "string",
              "calories?": number,
              "protein?": number,
              "carbs?": number,
              "fat?": number,
              "date?": "YYYY-MM-DD"
            }
          }
          
          3. Delete meal: Respond with JSON format:
          {
            "action": "delete",
            "meal_id": number
          }
          
          For other queries, respond normally with text. Always be helpful and friendly. 
          When creating or updating meals, ensure all numeric values are positive numbers.
          The date should be in YYYY-MM-DD format.
          Meal type must be one of: breakfast, lunch, dinner, or snack.`,
        },
        ...messageHistory, // Include previous conversation
        {
          role: "user",
          content: message.content,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content || "";
    let finalResponse = aiResponse;

    // Try to parse response as JSON for database operations
    try {
      const parsed = JSON.parse(aiResponse);
      console.log("Parsed AI response:", parsed);
      
      if (parsed.action) {
        // Handle database operations through the meals API
        switch (parsed.action) {
          case "create": {
            console.log("Creating meal with data:", {
              ...parsed.meal,
              user_id: userId,
              created_at: new Date().toISOString(),
            });

            // Ensure we use today's date
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            const response = await fetch(`${request.headers.get('origin')}/api/meals`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...parsed.meal,
                user_id: userId,
                date: formattedDate, // Override any date provided by AI
                created_at: new Date().toISOString(),
              }),
            });

            const responseData = await response.json();
            console.log("Meal creation response:", responseData);

            if (!response.ok) {
              console.error("Failed to create meal:", responseData);
              throw new Error(`Failed to create meal: ${responseData.error || 'Unknown error'}`);
            }

            finalResponse = `Successfully created meal: ${parsed.meal.description}`;
            break;
          }

          case "update": {
            const response = await fetch(`${request.headers.get('origin')}/api/meals/${parsed.meal_id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...parsed.updates,
                user_id: userId,
              }),
            });

            if (!response.ok) throw new Error('Failed to update meal');
            finalResponse = `Successfully updated meal with ID: ${parsed.meal_id}`;
            break;
          }

          case "delete": {
            const response = await fetch(`${request.headers.get('origin')}/api/meals/${parsed.meal_id}`, {
              method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete meal');
            finalResponse = `Successfully deleted meal with ID: ${parsed.meal_id}`;
            break;
          }
        }
      }
    } catch (error) {
      console.log("Not a database operation or error:", error);
    }

    const assistantMessage: Message = {
      id: uuidv4(),
      user_id: userId,
      role: "assistant",
      content: finalResponse,
      created_at: new Date().toISOString(),
    };

    // Store the assistant message in Supabase
    const { data: assistantData, error: assistantInsertError } = await supabase
      .from("messages")
      .insert(assistantMessage)
      .select();

    if (assistantInsertError) {
      console.error("Error storing assistant message:", assistantInsertError);
      return NextResponse.json(
        {
          error: "Failed to store assistant message",
          details: assistantInsertError.message,
        },
        { status: 500 }
      );
    }

    console.log("Successfully inserted message:", assistantData);

    return NextResponse.json({
      message: assistantMessage.content,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
