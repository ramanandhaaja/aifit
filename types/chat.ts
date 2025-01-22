// types/chat.ts
export type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  };

