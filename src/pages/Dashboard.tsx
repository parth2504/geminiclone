import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

const Dashboard = () => {
  const { logout, phoneNumber } = useAuthStore();

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{phoneNumber}</span>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="text-center py-16">
        <h2 className="text-xl font-semibold">Welcome to Gemini Clone</h2>
        <p className="text-muted-foreground mt-2">
          Your chatrooms will appear here.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;