import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useChatStore } from '@/stores/chatStore';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { ChatInput } from '@/components/chat/ChatInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ChatPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { chatrooms, activeChatroom, isTyping, setActiveChatroom } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      setActiveChatroom(id);
    }
  }, [id, setActiveChatroom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatrooms]);

  const chatroom = chatrooms.find((room) => room.id === activeChatroom);

  if (!chatroom) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p>Chatroom not found</p>
        <Button onClick={() => router.push('/chat')}>Back to chats</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push('/chat')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{chatroom.title}</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatroom.messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatPage;