import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { showSuccess, showError } from "@/utils/toast";

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
  isLoading: boolean;
  createChatroom: (title: string) => void;
  deleteChatroom: (id: string) => void;
  loadChatrooms: () => Promise<void>;
  addMessage: (chatroomId: string, message: Omit<Message, 'id'>) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      isLoading: false,
      createChatroom: (title: string) => {
        if (!title.trim()) {
          showError("Chatroom title cannot be empty.");
          return;
        }
        const newChatroom: Chatroom = {
          id: Date.now().toString(),
          title,
          createdAt: new Date(),
          messages: [],
        };
        set({ chatrooms: [newChatroom, ...get().chatrooms] });
        showSuccess(`Chatroom "${title}" created!`);
      },
      deleteChatroom: (id: string) => {
        const chatroomToDelete = get().chatrooms.find((c) => c.id === id);
        if (chatroomToDelete) {
          set({
            chatrooms: get().chatrooms.filter((chatroom) => chatroom.id !== id),
          });
          showSuccess(`Chatroom "${chatroomToDelete.title}" deleted.`);
        }
      },
      loadChatrooms: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ 
          chatrooms: [...Array(3)].map((_, i) => ({
            id: `demo-${i}`,
            title: `Demo Chat ${i + 1}`,
            createdAt: new Date(),
            messages: [],
          })),
          isLoading: false 
        });
      },
      addMessage: (chatroomId: string, message: Omit<Message, 'id'>) => {
        set({
          chatrooms: get().chatrooms.map(chatroom => 
            chatroom.id === chatroomId
              ? {
                  ...chatroom,
                  messages: [
                    ...chatroom.messages,
                    { ...message, id: Date.now().toString() }
                  ]
                }
              : chatroom
          )
        });
      },
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
      deserialize: (str) => {
        const parsed = JSON.parse(str);
        return {
          ...parsed,
          state: {
            ...parsed.state,
            chatrooms: parsed.state.chatrooms.map((chatroom: any) => ({
              ...chatroom,
              createdAt: new Date(chatroom.createdAt),
              messages: chatroom.messages.map((message: any) => ({
                ...message,
                timestamp: new Date(message.timestamp),
              })),
            })),
          },
        };
      },
    }
  )
);