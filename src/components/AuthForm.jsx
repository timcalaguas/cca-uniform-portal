import React, { useState } from "react";
import { UserPlus, LogIn, Users, ShoppingBag } from "lucide-react";

import Logo from "../assets/logo.png";

export const AuthForm = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        // const { error } = await signUp(email, password, fullName, role);
        if (error) throw error;
      }
      onSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-fit p-2 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src={Logo} alt="Logo" className="w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            CCA Uniform Portal
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      role === "buyer"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <ShoppingBag className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-sm font-medium">Buyer</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("seller")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      role === "seller"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <Users className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-sm font-medium">Seller</div>
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border text-black bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                {isLogin ? (
                  <LogIn className="w-4 h-4" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                {isLogin ? "Sign In" : "Sign Up"}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};
