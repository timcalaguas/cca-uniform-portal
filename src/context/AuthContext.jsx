import { createContext, useContext, useState, useEffect } from "react";
import { privateAxios, publicAxios } from "../utils/axios";
import { clearJWT, setJWT } from "../utils/auth";
import { toast } from "react-toastify";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in when the app loads
    checkSession();
  }, []);

  const checkSession = async () => {
    setLoading(true);
    try {
      const response = await privateAxios("/api:XMz8-EnZ/auth/me");

      if (response.status !== 200) {
        throw new Error("Not authenticated");
      }

      const user = response.data;
      setUser(user);
    } catch (error) {
      setUser(null);
      console.error("Session check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await publicAxios.post(
        "/api:XMz8-EnZ/auth/login",
        credentials
      );

      setJWT(response.data.authToken);
      await checkSession(); // Fetch and set user data
      return response.data;
    } catch (error) {
      console.error("❌ Login error:", error.response?.data || error.message);
      toast.error("Wrong email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, fullName) => {
    setLoading(true);
    try {
      // 👇 Adjust endpoint to match your Xano setup
      const response = await publicAxios.post("/api:XMz8-EnZ/auth/signup", {
        email,
        password,
        name: fullName,
      });

      if (response.status !== 200) {
        throw new Error("Signup failed");
      }

      // Xano usually returns a JWT token after successful signup
      const token = response.data?.authToken;
      if (token) {
        setJWT(token); // store it in sessionStorage
        await checkSession(); // Fetch and set user data
      }

      return response.data;
    } catch (error) {
      console.error("❌ Signup error:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    clearJWT();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
