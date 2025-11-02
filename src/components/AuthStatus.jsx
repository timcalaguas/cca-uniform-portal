import React from "react";
import { useAuthContext } from "../context/AuthContext";

export default function AuthStatus() {
  const { user, isAuthenticated, loading, logout } = useAuthContext();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <div>Welcome, {user?.first_name || user?.name || user?.email}</div>
      <button onClick={logout} className="px-3 py-1 border rounded">
        Log out
      </button>
    </div>
  );
}
