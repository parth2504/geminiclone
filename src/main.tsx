import { createRoot } from "react-dom/client";
import App from "./App";  // Make sure this import matches
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
  </ThemeProvider>
);