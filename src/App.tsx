import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Connect from "./pages/Connect";
import PdfReaderPage from "./pages/PdfReaderPage";
import NotFound from "./pages/NotFound";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Chatbot from "./components/Chatbot";
import AccessibilityButton from "./components/AccessibilityButton";

const queryClient = new QueryClient();

const AppContent = () => {
  const { dir } = useLanguage();
  return (
    <div dir={dir}>
      <Toaster />
      <Sonner />
      <ThemeSwitcher />
      <AccessibilityButton />
      <Chatbot />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/pdf-reader" element={<PdfReaderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
