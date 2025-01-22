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
    <div className="p-10 fixed bottom-0 w-1/2 bg-[#343541] border-r border-[#1E1E1E] left-0">
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="resize-none bg-[#40414f] border border-white focus-visible:ring-0 text-white"
          rows={1}
        />
        <Button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-[#40414f] border border-white hover:bg-[#40414f]"
        >
          Send
        </Button>
      </div>
    </div>
  );
}