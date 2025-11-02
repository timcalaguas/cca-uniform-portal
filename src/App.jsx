import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import NotFound from "./pages/user/NotFound";
import Login from "./pages/user/Login";
import MyOrders from "./pages/user/MyOrders";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* USER PROTECTED ROUTE */}
        <Route element={<ProtectedRoute requiredRole="user" />}>
          <Route path="/orders" element={<MyOrders />} />
        </Route>

        {/* ADMIN PROTECTED ROUTE */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin">
            <Route index element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
