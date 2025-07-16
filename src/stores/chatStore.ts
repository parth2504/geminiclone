import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
}

interface Chatroom {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
}

interface ChatState {
  chatrooms: Chatroom[];
  activeChatroom: string | null;
  isLoading: boolean;
  isTyping: boolean;
  createChatroom: (title: string) => void;
  deleteChatroom: (id: string) => void;
  sendMessage: (content: string, image?: string) => Promise<void>;
  loadMoreMessages: () => Promise<void>;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      activeChatroom: null,
      isLoading: false,
      isTyping: false,
      createChatroom: (title) => {
        const newChatroom: Chatroom = {
          id: nanoid(),
          title,
          createdAt: new Date(),
          messages: [],
        };
        set((state) => ({
          chatrooms: [newChatroom, ...state.chatrooms],
          activeChatroom: newChatroom.id,
        }));
        toast.success(`Chatroom "${title}" created!`);
      },
      deleteChatroom: (id) => {
        set((state) => ({
          chatrooms: state.chatrooms.filter((room) => room.id !== id),
          activeChatroom: state.activeChatroom === id ? null : state.activeChatroom,
        }));
        toast.success('Chatroom deleted');
      },
      sendMessage: async (content, image) => {
        const { activeChatroom, chatrooms } = get();
        if (!activeChatroom) return;

        // Add user message
        const userMessage: Message = {
          id: nanoid(),
          content,
          isUser: true,
          timestamp: new Date(),
          imageUrl: image,
        };

        set({
          chatrooms: chatrooms.map((room) =>
            room.id === activeChatroom
              ? { ...room, messages: [...room.messages, userMessage] }
              : room
          ),
          isTyping: true,
        });

        // Simulate AI thinking
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 + Math.random() * 2000)
        );

        // Add AI response
        const aiMessage: Message = {
          id: nanoid(),
          content: `I'm your AI response to: "${content}"`,
          isUser: false,
          timestamp: new Date(),
        };

        set({
          chatrooms: chatrooms.map((room) =>
            room.id === activeChatroom
              ? { ...room, messages: [...room.messages, aiMessage] }
              : room
          ),
          isTyping: false,
        });
      },
      loadMoreMessages: async () => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Load older messages logic here
        set({ isLoading: false });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);