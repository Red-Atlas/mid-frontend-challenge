import "./App.scss";
import "./global.scss";

import { Outlet } from "react-router";
import { Header } from "./components/header";
import { Toaster } from "sonner";

// const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster richColors />
    </>
  );
}

export default App;
