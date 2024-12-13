import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./pages/home/index.tsx";
import { PropertyPage } from "./pages/property/index.tsx";
import { NewProperty } from "./pages/newProperty/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={<App />}
          >
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/property/:id"
              element={<PropertyPage />}
            />
            <Route
              path="/newProperty/:id"
              element={<NewProperty />}
            />
            <Route
              path="/newProperty"
              element={<NewProperty />}
            />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
