// components/chat/input.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 fixed bottom-0 w-1/2 bg-white  left-0 shadow-lg rounded-t-2xl">
      <div className="flex gap-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="resize-none bg-indigo-50 border-2 border-indigo-200 focus-visible:ring-0 text-indigo-600 rounded-xl placeholder:text-indigo-300 focus:border-indigo-400 transition-all not-rounded"
          rows={2}
        />
        <Button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 text-white rounded-full px-8 py-6 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        >
          Send
        </Button>
      </div>
    </div>
  );
}