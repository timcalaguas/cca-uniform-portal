import React, { useEffect, useState } from "react";
import { AuthForm } from "./components/AuthForm";
import { Header } from "./components/Header";
// import { SellerDashboard } from "./components/seller/SellerDashboard";
// import { BuyerDashboard } from "./components/buyer/BuyerDashboard";
// import { useAuth } from "./hooks/useAuth";

import { ShoppingCart } from "lucide-react";

import Hero from "./assets/hero.jpg";
import Footer from "./components/Footer";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  if (showAuth) {
    return <AuthForm onSuccess={() => setShowAuth(false)} />;
  }

  return (
    <div className="min-h-screen bg-black/5">
      <Header />
      <main>
        <div className="relative min-h-96 overflow-hidden pt-24">
          <div className="absolute z-10 left-0 top-0 w-full h-full bg-gray-900/80"></div>
          <img
            src={Hero}
            alt="Hero"
            className="absolute top-0 z-0 w-full h-full object-cover object-center"
          />
          <div className="relative z-20  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center h-full flex-grow gap-3">
            <h2 className="text-4xl font-bold text-white">
              Welcome to the CCA Uniform Portal
            </h2>
            <p className="text-xl text-gray-300">
              Here you can find and order your school uniforms with ease.
            </p>
            <button
              type="submit"
              disabled={false}
              className="mt-4 w-fit bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {false ? "Loading..." : <>Get Started</>}
            </button>
          </div>
        </div>
        <div className="bg-white py-10 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center h-full flex-grow gap-3">
            <h2 className="text-black text-3xl font-bold text-center">
              Our uniforms
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Explore our range of high-quality uniforms designed for comfort
              and durability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="overflow-hidden rounded-md">
                  <img
                    src="https://placehold.co/600x400"
                    alt="Placeholder"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 ">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Uniform {index + 1}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      A brief description of Uniform 1.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button className="flex items-center  justify-center mt-2 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        <ShoppingCart className="w-4 h-4 inline-block mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
