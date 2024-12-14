import { Navigate, Outlet } from "react-router-dom";
import { useStoreApp } from "../../store/useStore";

export function ProtectedRoute() {
  const { isAuthenticated } = useStoreApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
