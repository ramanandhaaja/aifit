'use client';

import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/input";
import { useChat } from "@/hooks/useChat";
import { useLastMeals } from "@/hooks/useLastMeals";
import { Meal } from "@/types/meal";

export default function ChatPage() {
  const { messages, sendMessage, isLoading } = useChat();
  const { meals, loading: mealsLoading } = useLastMeals(5);

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
      <div className="w-1/2 border-r border-[#1E1E1E]">
        <MessageList messages={messages} />
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
      <div className="w-1/2 relative mt-[100px]">
        <div className="flex flex-col items-center p-10 space-y-6">
          <h2 className="text-2xl font-bold text-white">Your last meals</h2>
          {mealsLoading ? (
            <p className="text-gray-400">Loading meals...</p>
          ) : (
            <div className="w-full max-w-md space-y-8">
              {Object.entries(groupedMeals).map(([date, dateMeals]) => (
                <div key={date} className="space-y-4">
                  <h3 className="text-white font-bold text-xl border-b border-gray-600 pb-2">
                    {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date))} 
                  </h3>
                  <div className="space-y-3">
                    {dateMeals.map((meal) => (
                      <div 
                        key={meal.id} 
                        className="bg-[#40414f] rounded-lg p-4 shadow-lg"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-white font-medium text-lg">
                              {meal.meal_type.toUpperCase()}
                            </h4>
                            <p className="font-bold text-white text-sm">
                              {meal.calories} CAL
                            </p>
                            <p className="text-white text-sm">
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
          )}
        </div>
      </div>
    </>
  );
}