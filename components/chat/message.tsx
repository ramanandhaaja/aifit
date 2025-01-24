// components/chat/message.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/types/message";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.role === 'assistant';
  
  return (
    <div className={`px-6 py-4 rounded-xl shadow-sm ${isAI ? 'bg-indigo-50 border border-indigo-100' : 'bg-pink-50 border border-pink-100'}`}>
      <div className="max-w-[800px] p-2 flex gap-4">
        <Avatar className="  rounded-full border-2 border-white shadow-md">
          <AvatarFallback className={`${isAI ? 'bg-indigo-600 text-white' : 'bg-pink-600 text-white'}  text-md font-bold`}>
            {isAI ? 'AI' : 'ME'}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-3 flex">
          <div className={`text-md ${isAI ? 'text-indigo-600' : 'text-pink-600'} leading-relaxed pt-2`}>
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
}