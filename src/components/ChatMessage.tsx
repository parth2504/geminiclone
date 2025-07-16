import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
  onCopy?: (text: string) => void;
}

export const ChatMessage = ({
  content,
  isUser,
  timestamp,
  imageUrl,
  onCopy,
}: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 p-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="flex-shrink-0">
          <AvatarImage src="/gemini-icon.png" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3 relative group",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded content"
            className="rounded-lg mb-2 max-w-full h-auto max-h-64 object-contain"
          />
        )}
        <p className="whitespace-pre-wrap">{content}</p>
        <div className="flex justify-between items-center mt-2 text-xs">
          <span>
            {format(timestamp, 'h:mm a')}
          </span>
          {isUser && onCopy && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-6 w-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity",
                isUser ? "text-primary-foreground hover:text-primary-foreground/80" 
                       : "text-secondary-foreground hover:text-secondary-foreground/80"
              )}
              onClick={() => onCopy(content)}
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      {isUser && (
        <Avatar className="flex-shrink-0">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};