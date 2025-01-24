// components/chat/message-list.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/types/message";
import { ChatMessage } from "@/components/chat/message";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative shadow-lg bg-white border-2 border-indigo-300 rounded-b-lg mb-24 h-[calc(100vh-120px)]">
      <div className="absolute inset-0 overflow-hidden rounded-b-lg">
        <ScrollArea className="h-full w-full">
          <div className="p-6 space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}