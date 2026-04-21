import { Message } from '@/constants/chat/message';
import { createContext, useContext, useState } from 'react';

type ChatContextType = {
  voiceInputActivated: boolean;
  setVoiceInputActivated: (value: boolean) => void;
  messages: Message[];
  addMessage: (text: string, role: 'user' | 'assistant') => void;
  isAssistantThinking: boolean;
  setIsAssistantThinking: (value: boolean) => void;
  questionInput: string;
  setQuestionInput: (value: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [voiceInputActivated, setVoiceInputActivated] = useState(false);
  const [isAssistantThinking, setIsAssistantThinking] = useState(false);
  const [questionInput, setQuestionInput] = useState('');

  const addMessage = (text: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString() + '_' + role,
      role,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMessage]);
  }


  return (
    <ChatContext.Provider value={{ voiceInputActivated, setVoiceInputActivated, messages, addMessage, isAssistantThinking, setIsAssistantThinking, questionInput, setQuestionInput }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatConversationContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatConversation must be used inside ChatProvider');
  return ctx;
}
