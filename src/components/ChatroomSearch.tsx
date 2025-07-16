import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import { useState } from "react";

export const ChatroomSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { chatrooms } = useChatStore();

  const filteredChatrooms = chatrooms.filter(chatroom =>
    chatroom.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search chatrooms..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};