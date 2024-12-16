import Header from "@/components/Header";
import { useUIContext } from "@/contexts/UIContext";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const { hideAllPanes } = useUIContext();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/propiedad")) {
      hideAllPanes();
    }
  }, [location]);

  return (
    <div className="flex flex-col h-dvh w-full p-6 gap-6 relative z-10">
      <Header />
      <Outlet />
    </div>
  );
}
