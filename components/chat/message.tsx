// components/chat/message.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.role === 'assistant';
  
  return (
    <div className={`px-4 py-6 rounded-lg ${isAI ? 'bg-[#444654]' : 'bg-[#343541]'}`}>
      <div className="max-w-[800px] mx-auto flex gap-4">
        <Avatar className="h-8 w-8">
          <AvatarFallback className={isAI ? 'bg-teal-500' : 'bg-purple-500'}>
            {isAI ? 'AI' : 'ME'}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <div className="text-white">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
}