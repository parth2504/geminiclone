import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
}

export const ChatMessage = ({
  content,
  isUser,
  timestamp,
  imageUrl,
}: ChatMessageProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <div
      className={cn(
        "flex gap-3 p-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar>
          <AvatarImage src="/gemini-icon.png" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
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
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isUser && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-2 text-white hover:text-white/80"
              onClick={handleCopy}
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      {isUser && (
        <Avatar>
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};