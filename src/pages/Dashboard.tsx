import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { CreateChatroomDialog } from "@/components/CreateChatroomDialog";
import { DeleteChatroomAlert } from "@/components/DeleteChatroomAlert";
import { ThemeToggle } from "@/components/ThemeToggle";

const Dashboard = () => {
  const { chatrooms } = useChatStore();
  const { phoneNumber, logout } = useAuthStore();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatroomToDelete, setChatroomToDelete] = useState<string | null>(null);

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString();
  };

  return (
    <>
      <div className="container mx-auto p-4 md:p-6">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Chats</h1>
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

        <div className="grid gap-4">
          {chatrooms.map((chatroom) => (
            <div
              key={chatroom.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
            >
              <div>
                <h3 className="font-medium">{chatroom.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Created: {formatDate(chatroom.createdAt)}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setChatroomToDelete(chatroom.id);
                  setDeleteDialogOpen(true);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
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