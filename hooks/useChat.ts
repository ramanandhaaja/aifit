// hooks/useChat.ts
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/types/message';
import { supabase } from '@/lib/supabase';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;
      
      if (!userId) {
        setError('Please sign in to send messages');
        return;
      }

      const userMessage: Message = {
        id: uuidv4(),
        user_id: userId,
        role: 'user',
        content,
        created_at: new Date().toISOString(),
      };
        
      setMessages(prev => [...prev, userMessage]);

      // Call API to get AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: uuidv4(),
        user_id: userId,
        role: 'assistant',
        content: data.message,
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
}