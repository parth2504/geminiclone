interface ChatState {
  chatrooms: Chatroom[];
  isLoading: boolean;
  createChatroom: (title: string) => void;
  deleteChatroom: (id: string) => void;
  loadChatrooms: () => Promise<void>;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      isLoading: false,
      createChatroom: (title: string) => {
        // ... existing implementation
      },
      deleteChatroom: (id: string) => {
        // ... existing implementation
      },
      loadChatrooms: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        set({ 
          chatrooms: [...Array(3)].map((_, i) => ({
            id: `demo-${i}`,
            title: `Demo Chat ${i + 1}`,
            createdAt: new Date(),
          })),
          isLoading: false 
        });
      },
    }),
    // ... existing persist config
  )
);