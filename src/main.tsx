import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropertiesProvider } from "./contexts/PropertiesContext.tsx";
import { UIContextProvider } from "./contexts/UIContext.tsx";
import { FiltersProvider } from "./contexts/FiltersContext.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UIContextProvider>
        <PropertiesProvider>
          <FiltersProvider>
            <App />
            <Toaster richColors />
          </FiltersProvider>
        </PropertiesProvider>
      </UIContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
