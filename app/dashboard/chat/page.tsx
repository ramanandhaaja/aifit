'use client';

import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/input";
import { useChat } from "@/hooks/useChat";
import { useLastMeals } from "@/hooks/useLastMeals";
import { Meal } from "@/types/meal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ChatPage() {
  const { messages, sendMessage, isLoading } = useChat();
  const { meals, loading: mealsLoading } = useLastMeals(10);

  // Group meals by date
  const groupedMeals = meals.reduce((groups: { [key: string]: Meal[] }, meal) => {
    const date = meal.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(meal);
    return groups;
  }, {});

  return (
    <>
      <div className="w-1/2">
        <MessageList messages={messages} />
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
      <div className="w-1/2 relative mt-8">
        <div className="flex flex-col items-center p-6 space-y-6">
          <div className="flex justify-end mb-4">
            <Link href="/dashboard">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-indigo-600 drop-shadow-sm">
            Your previous meal's
          </h1>


          {mealsLoading ? (
            <p className="text-indigo-400">Loading meals...</p>
          ) : (
            <ScrollArea className="w-full h-[calc(100vh-200px)] rounded-2xl">
              <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-md space-y-8 pr-4">
                  {Object.entries(groupedMeals).map(([date, dateMeals]) => (
                    <div key={date} className="space-y-4 animate-fade-in">
                      <h3 className="text-indigo-600 font-bold text-lg bg-indigo-50 px-4 py-2 rounded-full">
                        {new Intl.DateTimeFormat('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        }).format(new Date(date))}
                      </h3>
                      <div className="space-y-3">
                        {dateMeals.map((meal) => (
                          <div
                            key={meal.id}
                            className="bg-white rounded-xl p-4 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:border-2 hover:border-indigo-100 motion-reduce:transform-none"
                          >
                            <div className="flex justify-between items-center">
                              <div className="space-y-2">
                                <h4 className="text-indigo-600 font-semibold text-md">
                                  {meal.meal_type.toUpperCase()}
                                </h4>
                                <div className="flex gap-4 text-sm">
                                  <p className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                                    Calories: {meal.calories}
                                  </p>
                                  <p className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                                    Protein: {meal.protein}
                                  </p>
                                  <p className="bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
                                    Fat: {meal.fat}
                                  </p>
                                  <p className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                                    Carbs: {meal.carbs}
                                  </p>
                                </div>
                                <p className="text-gray-600 text-sm mt-2">
                                  {meal.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </>
  );
}