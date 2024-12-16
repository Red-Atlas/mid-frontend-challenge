import ContextWrapper from "@/contexts/ContextWrapper";
import queryClient from "@/lib/queryClient";
import Router from "@/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <ContextWrapper>
          <Router />
        </ContextWrapper>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
