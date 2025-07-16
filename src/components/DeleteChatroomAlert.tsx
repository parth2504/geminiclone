import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useChatStore } from "@/store/chatStore";

interface DeleteChatroomAlertProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  chatroomId: string | null;
}

export const DeleteChatroomAlert = ({
  isOpen,
  onOpenChange,
  chatroomId,
}: DeleteChatroomAlertProps) => {
  const { deleteChatroom, chatrooms } = useChatStore();

  const chatroom = chatrooms.find((c) => c.id === chatroomId);

  const handleDelete = () => {
    if (chatroomId) {
      deleteChatroom(chatroomId);
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the "
            {chatroom?.title}" chatroom.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};