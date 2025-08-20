import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { VoiceInput } from "./VoiceInput";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setMessage(prev => prev + (prev ? " " : "") + transcript);
  };

  return (
    <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border/20 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
        <div className="flex-1 flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className={cn(
              "flex-1 bg-message-bg border-border/20 focus:border-primary/50",
              "focus:shadow-glow transition-all duration-200"
            )}
            disabled={isLoading}
          />
          <VoiceInput 
            onTranscript={handleVoiceTranscript}
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={!message.trim() || isLoading}
          className="bg-ai-gradient hover:shadow-glow-lg transition-all duration-200"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};