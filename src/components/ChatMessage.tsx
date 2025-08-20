import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-in fade-in-0 slide-in-from-bottom-2",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
        isUser 
          ? "bg-user-gradient text-white shadow-glow" 
          : "bg-message-bg text-foreground border border-border/20"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p className="text-xs opacity-70 mt-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};