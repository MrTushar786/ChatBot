import { cn } from "@/lib/utils";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

// Function to copy text to clipboard
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};

// Function to render code blocks with syntax highlighting and copy button
const renderCodeBlock = (content: string) => {
  const [copied, setCopied] = useState(false);
  
  // Extract language and code content
  const lines = content.split('\n');
  const firstLine = lines[0];
  const language = firstLine.replace('```', '').trim();
  const codeContent = lines.slice(1, -1).join('\n');
  
  const handleCopy = async () => {
    const success = await copyToClipboard(codeContent);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className="bg-gray-900 rounded-lg p-4 my-3 border border-gray-700 shadow-lg relative group">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between mb-3">
        {language && (
          <div className="text-xs text-gray-400 font-mono bg-gray-800 px-2 py-1 rounded">
            {language}
          </div>
        )}
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all duration-200",
            "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-gray-100",
            "border border-gray-600 hover:border-gray-500",
            copied && "bg-green-600 hover:bg-green-500 text-white border-green-500"
          )}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      
      {/* Code content */}
      <pre className="text-sm text-gray-100 overflow-x-auto">
        <code className="font-mono leading-relaxed">{codeContent}</code>
      </pre>
    </div>
  );
};

// Function to render inline code
const renderInlineCode = (content: string) => {
  const parts = content.split('`');
  return (
    <span>
      {parts.map((part, index) => 
        index % 2 === 0 ? (
          <span key={index}>{part}</span>
        ) : (
          <code key={index} className="bg-gray-800 text-gray-100 px-1.5 py-0.5 rounded text-xs font-mono border border-gray-600">
            {part}
          </code>
        )
      )}
    </span>
  );
};

// Function to format the message content
const formatMessage = (content: string) => {
  // Split by code blocks first
  const codeBlockRegex = /```([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index);
      if (textContent.trim()) {
        parts.push({ type: 'text', content: textContent });
      }
    }
    
    // Add code block
    parts.push({ type: 'code', content: match[0] });
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex);
    if (remainingText.trim()) {
      parts.push({ type: 'text', content: remainingText });
    }
  }
  
  return parts;
};

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  if (isUser) {
    return (
      <div className={cn(
        "flex w-full mb-4 animate-in fade-in-0 slide-in-from-bottom-2",
        "justify-end"
      )}>
        <div className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          "bg-user-gradient text-white shadow-glow"
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
  }

  // For AI messages, format the content
  const formattedParts = formatMessage(message);

  return (
    <div className={cn(
      "flex w-full mb-4 animate-in fade-in-0 slide-in-from-bottom-2",
      "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
        "bg-message-bg text-foreground border border-border/20"
      )}>
        <div className="text-sm leading-relaxed space-y-2">
          {formattedParts.map((part, index) => {
            if (part.type === 'code') {
              return <div key={index}>{renderCodeBlock(part.content)}</div>;
            } else {
              // Process text content for inline code and basic formatting
              const lines = part.content.split('\n');
              return (
                <div key={index}>
                  {lines.map((line, lineIndex) => (
                    <p key={lineIndex} className="whitespace-pre-wrap mb-2 last:mb-0">
                      {renderInlineCode(line)}
                    </p>
                  ))}
                </div>
              );
            }
          })}
        </div>
        
        {timestamp && (
          <p className="text-xs opacity-70 mt-3">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};