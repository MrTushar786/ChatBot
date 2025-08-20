import { useState, useEffect } from "react";
import { Conversation } from "@/components/ConversationSidebar";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ConversationData {
  messages: Message[];
  title: string;
  createdAt: Date;
  lastMessageAt: Date;
}

const STORAGE_KEY = "ai-chat-conversations";

export const useConversations = () => {
  const [conversations, setConversations] = useState<Record<string, ConversationData>>({});
  const [currentConversationId, setCurrentConversationId] = useState<string>("");

  // Load conversations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        const converted = Object.entries(parsed).reduce((acc, [id, data]: [string, any]) => {
          acc[id] = {
            ...data,
            createdAt: new Date(data.createdAt),
            lastMessageAt: new Date(data.lastMessageAt),
            messages: data.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          };
          return acc;
        }, {} as Record<string, ConversationData>);
        
        setConversations(converted);
        
        // Set current conversation to the most recent one
        const sortedIds = Object.keys(converted).sort((a, b) => 
          converted[b].lastMessageAt.getTime() - converted[a].lastMessageAt.getTime()
        );
        if (sortedIds.length > 0) {
          setCurrentConversationId(sortedIds[0]);
        } else {
          createNewConversation();
        }
      } catch (error) {
        console.error("Error loading conversations:", error);
        createNewConversation();
      }
    } else {
      createNewConversation();
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(conversations).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  const createNewConversation = () => {
    const id = Date.now().toString();
    const welcomeMessage: Message = {
      id: "welcome",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    };

    const newConversation: ConversationData = {
      messages: [welcomeMessage],
      title: "New Chat",
      createdAt: new Date(),
      lastMessageAt: new Date()
    };

    setConversations(prev => ({
      ...prev,
      [id]: newConversation
    }));
    setCurrentConversationId(id);
    return id;
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    if (currentConversationId === id) {
      const remainingIds = Object.keys(conversations).filter(convId => convId !== id);
      if (remainingIds.length > 0) {
        setCurrentConversationId(remainingIds[0]);
      } else {
        createNewConversation();
      }
    }
  };

  const addMessage = (conversationId: string, message: Message) => {
    setConversations(prev => {
      const conversation = prev[conversationId];
      if (!conversation) return prev;

      const updatedMessages = [...conversation.messages, message];
      let title = conversation.title;
      
      // Update title based on first user message
      if (message.isUser && conversation.messages.length === 1) {
        title = message.content.slice(0, 30) + (message.content.length > 30 ? "..." : "");
      }

      return {
        ...prev,
        [conversationId]: {
          ...conversation,
          messages: updatedMessages,
          title,
          lastMessageAt: new Date()
        }
      };
    });
  };

  const getCurrentMessages = (): Message[] => {
    return conversations[currentConversationId]?.messages || [];
  };

  const getConversationList = (): Conversation[] => {
    return Object.entries(conversations).map(([id, data]) => ({
      id,
      title: data.title,
      createdAt: data.createdAt,
      lastMessageAt: data.lastMessageAt,
      messageCount: data.messages.length
    })).sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
  };

  return {
    conversations: getConversationList(),
    currentConversationId,
    currentMessages: getCurrentMessages(),
    createNewConversation,
    deleteConversation,
    addMessage,
    setCurrentConversationId
  };
};