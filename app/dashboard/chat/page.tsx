'use client';

import { MessageList } from "@/components/chat/message-list";
import { ChatInput } from "@/components/chat/input";
import { useChat } from "@/hooks/useChat";

export default function ChatPage() {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <div className="h-screen bg-[#343541] ">
      <div>
        <div className="w-1/2 h-full border-r border-[#1E1E1E] px-10">
          <MessageList messages={messages} />
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}