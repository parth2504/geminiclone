import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ChatMessage } from '@/components/ChatMessage';
import { TypingIndicator } from '@/components/TypingIndicator';
import { ChatInput } from '@/components/ChatInput';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { showSuccess } from '@/utils/toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
}

const Chatroom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { ref, inView } = useInView();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatrooms } = useChatStore();

  const chatroom = chatrooms.find(c => c.id === id);

  // Simulate initial messages
  useEffect(() => {
    if (id) {
      const initialMessages = [...Array(5)].map((_, i) => ({
        id: `msg-${i}`,
        content: i % 2 === 0 
          ? `This is a sample user message ${i + 1}` 
          : `This is a simulated AI response ${i + 1}`,
        isUser: i % 2 === 0,
        timestamp: new Date(Date.now() - (i * 60000)),
      }));
      setMessages(initialMessages);
    }
  }, [id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMoreMessages = async () => {
    setLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newMessages = [...Array(5)].map((_, i) => ({
      id: `old-${page}-${i}`,
      content: `Older message ${i + 1} from page ${page}`,
      isUser: Math.random() > 0.5,
      timestamp: new Date(Date.now() - (page * 86400000 * 7)),
    }));

    setMessages(prev => [...newMessages, ...prev]);
    setPage(prev => prev + 1);
    setHasMore(page < 3);
    setLoadingMore(false);
  };

  const handleSendMessage = (message: string, image?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
      imageUrl: image,
    };
    
    setMessages(prev => [...prev, newMessage]);
    showSuccess('Message sent!');
    
    // Simulate AI response
    if (message.trim() || image) {
      setIsTyping(true);
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now().toString(),
          content: `I'm your simulated AI response to: "${message}"`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000 + Math.random() * 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-semibold">{chatroom?.title || 'Chat'}</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loadingMore && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
            imageUrl={message.imageUrl}
          />
        ))}

        <div ref={ref} className="h-1" />
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput 
        onSend={handleSendMessage} 
        disabled={isTyping}
      />
    </div>
  );
};

export default Chatroom;