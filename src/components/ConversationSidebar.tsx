import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  lastMessageAt: Date;
  messageCount: number;
}

interface ConversationSidebarProps {
  conversations: Conversation[];
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ConversationSidebar = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isCollapsed,
  onToggleCollapse
}: ConversationSidebarProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const groupedConversations = conversations.reduce((groups, conv) => {
    const date = formatDate(conv.lastMessageAt);
    if (!groups[date]) groups[date] = [];
    groups[date].push(conv);
    return groups;
  }, {} as Record<string, Conversation[]>);

  return (
    <div className={cn(
      "h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
      isCollapsed ? "w-12" : "w-80"
    )}>
      <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
        {!isCollapsed && (
          <h2 className="font-semibold text-sidebar-foreground">Conversations</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="p-3">
        <Button
          onClick={onNewConversation}
          className={cn(
            "bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground",
            isCollapsed ? "w-full p-2" : "w-full"
          )}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      {!isCollapsed && (
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-4">
            {Object.entries(groupedConversations).map(([date, convs]) => (
              <div key={date}>
                <div className="flex items-center gap-2 px-2 py-1 text-xs text-sidebar-foreground/60">
                  <Calendar className="h-3 w-3" />
                  {date}
                </div>
                <div className="space-y-1">
                  {convs.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={cn(
                        "group relative flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                        conversation.id === currentConversationId
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                      )}
                      onClick={() => onSelectConversation(conversation.id)}
                      onMouseEnter={() => setHoveredId(conversation.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <MessageCircle className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-sidebar-foreground/60">
                          {conversation.messageCount} messages
                        </p>
                      </div>
                      {hoveredId === conversation.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteConversation(conversation.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-sidebar-foreground/60 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};