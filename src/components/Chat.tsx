import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ConversationSidebar } from "./ConversationSidebar";
import { useConversations, Message } from "@/hooks/useConversations";
import { useToast } from "@/hooks/use-toast";
import { Bot, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const DEFAULT_API_KEY = "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";

export const Chat = () => {
  const {
    conversations,
    currentConversationId,
    currentMessages,
    createNewConversation,
    deleteConversation,
    addMessage,
    setCurrentConversationId
  } = useConversations();

  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [tempApiKey, setTempApiKey] = useState(DEFAULT_API_KEY);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const saveApiKey = () => {
    setApiKey(tempApiKey);
    setIsSettingsOpen(false);
    toast({
      title: "Success",
      description: "API key updated successfully."
    });
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    addMessage(currentConversationId, userMessage);
    setIsLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "AI Chat Assistant",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI assistant. Be concise, friendly, and helpful in your responses."
            },
            ...currentMessages.map(msg => ({
              role: msg.isUser ? "user" : "assistant",
              content: msg.content
            })),
            {
              role: "user",
              content: content
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      addMessage(currentConversationId, aiMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Error",
        description: errorMessage.includes("OpenAI is requiring a key") 
          ? "API key doesn't have access to this model. Try updating your key in settings." 
          : "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={setCurrentConversationId}
        onNewConversation={createNewConversation}
        onDeleteConversation={deleteConversation}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-chat-bg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-ai-gradient flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">AI Assistant</h1>
              <p className="text-xs text-muted-foreground">Powered by OpenRouter</p>
            </div>
          </div>
          
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">OpenRouter API Key</label>
                  <Input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder="Enter your OpenRouter API key"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Get your API key from{" "}
                    <a 
                      href="https://openrouter.ai/keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      OpenRouter
                    </a>
                  </p>
                </div>
                <Button onClick={saveApiKey} className="w-full">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="max-w-4xl mx-auto">
            {currentMessages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-message-bg rounded-2xl px-4 py-3 border border-border/20">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};