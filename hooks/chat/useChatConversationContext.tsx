import { createContext, useContext, useState } from 'react';

type ChatContextType = {
  hasStartedConversation: boolean;
  setHasStartedConversation: (value: boolean) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  return (
    <ChatContext.Provider value={{ hasStartedConversation, setHasStartedConversation }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatConversationContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatConversation must be used inside ChatProvider');
  return ctx;
}