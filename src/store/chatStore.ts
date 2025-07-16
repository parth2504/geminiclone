import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { showSuccess, showError } from "@/utils/toast";

export interface Chatroom {
  id: string;
  title: string;
  createdAt: Date;
}

interface ChatState {
  chatrooms: Chatroom[];
  createChatroom: (title: string) => void;
  deleteChatroom: (id: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      createChatroom: (title: string) => {
        if (!title.trim()) {
          showError("Chatroom title cannot be empty.");
          return;
        }
        const newChatroom: Chatroom = {
          id: Date.now().toString(),
          title,
          createdAt: new Date(),
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
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
      // Add this reviver function to properly deserialize Dates
      deserialize: (str) => {
        const parsed = JSON.parse(str);
        return {
          ...parsed,
          state: {
            ...parsed.state,
            chatrooms: parsed.state.chatrooms.map((chatroom: any) => ({
              ...chatroom,
              createdAt: new Date(chatroom.createdAt),
            })),
          },
        };
      },
    }
  )
);