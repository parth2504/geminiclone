import { useParams, Link } from "react-router-dom";
import { useChatStore } from "@/store/chatStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Chatroom = () => {
  const { id } = useParams<{ id: string }>();
  const chatroom = useChatStore((state) =>
    state.chatrooms.find((c) => c.id === id)
  );

  if (!chatroom) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Chatroom not found</h1>
        <Button asChild>
          <Link to="/">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center gap-4 mb-4">
        <Button asChild variant="ghost" size="icon">
          <Link to="/">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">{chatroom.title}</h1>
      </header>
      <div className="flex flex-col h-[calc(100vh-8rem)] border rounded-lg p-4">
        <div className="flex-grow">
          <p>Chat messages will appear here...</p>
        </div>
        <div>
          <p>Message input will be here...</p>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;