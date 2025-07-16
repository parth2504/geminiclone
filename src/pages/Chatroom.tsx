import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatMessage } from '@/components/ChatMessage';
import { TypingIndicator } from '@/components/TypingIndicator';
import { ChatInput } from '@/components/ChatInput';
import { useInView } from 'react-intersection-observer';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const Chatroom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chatrooms, addMessage, loadMoreMessages, isSending } = useChatStore();
  const { logout } = useAuthStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ref, inView] = useInView();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatroom = chatrooms.find(c => c.id === id);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatroom?.messages]);

  // Load more messages when scrolling to top
  useEffect(() => {
    if (inView && id) {
      loadMoreMessages(id);
    }
  }, [inView, id, loadMoreMessages]);

  const handleSendMessage = async (message: string, image?: string) => {
    if (!id) return;
    
    if (message.trim() || image) {
      await addMessage(id, {
        content: message,
        isUser: true,
        timestamp: new Date(),
        imageUrl: image
      });
      toast.success('Message sent!');
    }
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  if (!chatroom) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <p className="text-muted-foreground">Chatroom not found</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="p-4 border-b flex items-center justify-between bg-card">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="md:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{chatroom.title}</h1>
        </div>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </header>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Loading indicator for older messages */}
        <div ref={ref} className="flex justify-center py-2">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>

        {/* Messages */}
        {chatroom.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>No messages yet</p>
            <p className="text-sm">Start a conversation with Gemini</p>
          </div>
        ) : (
          chatroom.messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              imageUrl={message.imageUrl}
              onCopy={handleCopyMessage}
            />
          ))
        )}

        {/* Typing indicator */}
        {isSending && <TypingIndicator />}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput 
        onSend={handleSendMessage} 
        disabled={isSending}
      />
    </div>
  );
};

export default Chatroom;