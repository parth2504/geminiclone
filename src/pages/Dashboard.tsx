import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import { CreateChatroomDialog } from "@/components/CreateChatroomDialog";
import { DeleteChatroomAlert } from "@/components/DeleteChatroomAlert";
import { PlusCircle, Trash2, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const { logout, phoneNumber } = useAuthStore();
  const { chatrooms } = useChatStore();
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedChatroomId, setSelectedChatroomId] = useState<string | null>(
    null
  );

  const handleDeleteClick = (e: React.MouseEvent, chatroomId: string) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setSelectedChatroomId(chatroomId);
    setDeleteDialogOpen(true);
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
            <Button onClick={() => setCreateDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Chat
            </Button>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </header>

        <main>
          {chatrooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {chatrooms.map((chatroom) => (
                <Link
                  to={`/chat/${chatroom.id}`}
                  key={chatroom.id}
                  className="block"
                >
                  <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="truncate">
                        {chatroom.title}
                      </CardTitle>
                      <CardDescription>
                        Created on{" "}
                        {new Date(chatroom.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDeleteClick(e, chatroom.id)}
                        aria-label={`Delete chatroom ${chatroom.title}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">No Chats Yet</h2>
              <p className="text-muted-foreground mt-2">
                Click "New Chat" to start a conversation.
              </p>
            </div>
          )}
        </main>
      </div>

      <CreateChatroomDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      <DeleteChatroomAlert
        isOpen={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        chatroomId={selectedChatroomId}
      />
    </>
  );
};

export default Dashboard;