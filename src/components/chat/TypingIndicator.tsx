import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 p-4 justify-start">
      <Avatar>
        <AvatarImage src="/gemini-icon.png" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div className="bg-secondary text-secondary-foreground rounded-lg p-3 max-w-[80%]">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
        </div>
      </div>
    </div>
  );
};