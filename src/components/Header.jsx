import { useState } from "react";

import { User, ShoppingBag, ShoppingCart, LogOut } from "lucide-react";

import Logo from "../assets/logo.png";
import { useCartStore } from "../store/cartStore";
import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";
import { Cart } from "./Cart";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { user, logout } = useAuth();

  const { totalItems } = useCartStore();

  return (
    <>
      <header className="fixed z-40 top-0 left-0 w-full py-4 px-4 xl:px-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white to-teal-50 rounded-2xl shadow-md">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link className="flex items-center gap-3" to="/">
              <img
                src={Logo}
                alt="Logo"
                className="w-10 h-10 rounded-full shadow-sm"
              />
              <h1 className="text-xl hidden sm:block font-bold text-gray-900">
                CCA Uniform Portal
              </h1>
            </Link>

            {/* Actions */}
            <div className="flex flex-row items-center gap-5">
              {/* Cart */}
              <div
                className="flex gap-1 relative cursor-pointer"
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingCart className="w-5 h-5 text-black" />
                <span
                  className="text-xs font-bold 
            text-white bg-teal-600/60 rounded-full w-5 h-5 flex items-center justify-center shadow"
                >
                  {totalItems()}
                </span>
              </div>

              {/* User */}
              {user ? (
                <div
                  className="flex items-center gap-2 p-2 bg-teal-400 rounded-full relative cursor-pointer hover:bg-teal-600 transition-colors"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <User className="w-5 h-5 text-white" />
                  {showMenu && (
                    <div className="absolute top-12 right-0 bg-teal-600 text-white rounded-xl shadow-lg p-3 w-40 flex flex-col gap-2 origin-top-right animate-scaleIn">
                      <p className="font-semibold">{user.name}</p>
                      <div className="border-t border-teal-400" />
                      <Link
                        className="flex gap-2 items-center text-sm hover:text-teal-200 transition"
                        to="/orders"
                      >
                        <ShoppingBag className="w-4 h-4" /> Orders
                      </Link>
                      <button
                        className="flex gap-2 items-center text-sm hover:text-teal-200 transition"
                        onClick={logout}
                      >
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex gap-2 items-center text-xs bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 transition"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <Cart showCart={showCart} setShowCart={setShowCart} user={user} />
    </>
  );
};
