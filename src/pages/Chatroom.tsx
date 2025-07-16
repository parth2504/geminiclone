// Previous imports remain the same
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";

const Chatroom = () => {
  // Previous state remains the same
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { ref, inView } = useInView();

  // Add this useEffect for infinite scroll
  useEffect(() => {
    if (inView && hasMore && !loadingMore) {
      loadMoreMessages();
    }
  }, [inView]);

  const loadMoreMessages = async () => {
    setLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    const newMessages = [...Array(5)].map((_, i) => ({
      id: `old-${page}-${i}`,
      content: `Older message ${i + 1} from page ${page}`,
      isUser: Math.random() > 0.5,
      timestamp: new Date(Date.now() - (page * 86400000 * 7)), // Older dates
    }));

    setMessages(prev => [...newMessages, ...prev]);
    setPage(prev => prev + 1);
    setHasMore(page < 3); // Simulate only 3 pages of history
    setLoadingMore(false);
  };

  // Update the messages container to include infinite scroll
  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      {/* Header remains the same */}
      
      <div className="flex flex-col flex-grow border rounded-lg overflow-hidden">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {loadingMore && (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              imageUrl={message.imageUrl}
            />
          ))}

          <div ref={ref} className="h-1" />
          
          {isTyping && <TypingIndicator />}
        </div>

        {/* Message input remains the same */}
      </div>
    </div>
  );
};