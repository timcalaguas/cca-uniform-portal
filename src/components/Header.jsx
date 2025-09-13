import { useState } from "react";

import {
  Home,
  User,
  ShoppingBag,
  ShoppingCart,
  LogOut,
  XIcon,
  Plus,
  Minus,
  Trash,
} from "lucide-react";

import Logo from "../assets/logo.png";

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  return (
    <>
      <header className="fixed z-40 top-0 left-0 w-full py-4 px-4 xl:px-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-md">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="Logo" className="w-10 h-10" />
              <div>
                <h1 className="text-xl hidden sm:block font-bold text-gray-900">
                  CCA Uniform Portal
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 px-3 py-1 "
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingCart className="w-4 h-4 text-black" />
              </div>

              <div
                className="flex items-center gap-2 p-3 bg-green-100 rounded-full relative cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              >
                <User className="w-4 h-4 text-black" />
                {showMenu && (
                  <div className="absolute top-14 right-0 bg-green-600 text-white rounded-md shadow-lg p-2 w-fit min-w-32 flex flex-col items-start gap-1">
                    <p className="text-white ">Timothy</p>
                    <div className="border-t border-green-300 w-full"></div>
                    <div className="flex flex-col gap-2 w-full mt-4 items">
                      <p className="text-xs text-white flex gap-1 items-center">
                        <ShoppingBag className="w-4 h-4" />
                        Orders
                      </p>
                      <p className="text-xs text-white flex gap-1 items-center">
                        <LogOut className="w-4 h-4" />
                        Signout
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* <button
              onClick={() => {}}
              className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </button> */}
            </div>
          </div>
        </div>
      </header>
      <div
        className={`fixed h-screen w-full sm:min-w-[400px] sm:w-1/5 bg-gray-100 top-0 right-0 z-50 py-5 px-7 flex flex-col justify-between ${
          showCart ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="relative z-20 flex justify-between items-center mb-5 border-b pb-3 border-gray-300">
          <p className="text-black text-xl font-semibold">Cart</p>
          <div className="cursor-pointer" onClick={() => setShowCart(false)}>
            <XIcon className="w-6 h-6  text-black" />
          </div>
        </div>
        <div className="h-full w-full grow overflow-hidden">
          <div className="absolute left-0 top-0 w-full py-5 px-7 pt-20 flex flex-col gap-3 h-full overflow-hidden overflow-y-auto">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div className="flex gap-3 items-center justify-between flex-wrap">
                  <div className="flex gap-3 items-center j">
                    <img
                      src="https://placehold.co/600x400"
                      alt="Placeholder"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="">
                      <p className="text-black font-semibold">Uniform 1</p>
                      <p className="text-black text-sm font-semibold">$20.00</p>
                      <p className="text-gray-600 text-xs">Size: M</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1 items-center">
                      <Plus className="w-4 h-4 text-black " />
                      <input
                        type="number"
                        readOnly
                        className="w-12 border border-gray-300 rounded-md p-1 text-center bg-transparent text-black"
                        value={1}
                      />
                      <Minus className="w-4 h-4 text-black " />
                    </div>
                    <Trash className="w-4 h-4 text-red-600 cursor-pointer" />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <button className="mt-5 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
          Checkout
        </button>
      </div>
    </>
  );
};
