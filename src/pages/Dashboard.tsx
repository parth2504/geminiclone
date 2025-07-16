import { PlusCircle, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";
import { CreateChatroomDialog } from "@/components/CreateChatroomDialog";
import { DeleteChatroomAlert } from "@/components/DeleteChatroomAlert";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Dashboard = () => {
  const { chatrooms, isLoading, createChatroom, deleteChatroom, loadChatrooms } = useChatStore();
  const { phoneNumber, logout } = useAuthStore();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatroomToDelete, setChatroomToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredChatrooms = chatrooms.filter(chatroom =>
    chatroom.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadChatrooms();
  }, [loadChatrooms]);

  return (
    <>
      <div className="container mx-auto p-4 md:p-6">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Gemini Chats</h1>
            <span className="text-sm text-muted-foreground hidden md:inline">
              {phoneNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={() => setCreateDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Chat
            </Button>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chatrooms..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Chatrooms List */}
        <div className="grid gap-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))
          ) : filteredChatrooms.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm ? "No matching chatrooms found" : "No chatrooms yet"}
              </p>
              <Button 
                onClick={() => setCreateDialogOpen(true)} 
                className="mt-4"
              >
                Create your first chat
              </Button>
            </div>
          ) : (
            filteredChatrooms.map((chatroom) => (
              <div
                key={chatroom.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => navigate(`/chat/${chatroom.id}`)}
              >
                <div>
                  <h3 className="font-medium">{chatroom.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created: {format(new Date(chatroom.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setChatroomToDelete(chatroom.id);
                    setDeleteDialogOpen(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      <CreateChatroomDialog
        isOpen={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      <DeleteChatroomAlert
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        chatroomId={chatroomToDelete}
      />
    </>
  );
};

export default Dashboard;