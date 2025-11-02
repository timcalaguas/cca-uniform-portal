import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "./SplashScreen";

export default function ProtectedRoute({ requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) return <SplashScreen />;

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole === "admin" && !user.is_seller) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
