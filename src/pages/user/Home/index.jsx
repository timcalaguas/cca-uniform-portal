import { Header } from "../../../components/Header";

import Hero from "../../../assets/hero.jpg";
import Footer from "../../../components/Footer";

import { useCartStore } from "../../../store/cartStore";
import HowItWorks from "../../../components/HowItWorks";
import Uniforms from "../../../components/Uniforms";

function Home() {
  const { addToCart } = useCartStore();

  return (
    <div className="relative min-h-screen z-0 overflow-hidden ">
      <Header />
      <main>
        <div className="relative z-20 min-h-96 overflow-hidden pt-24">
          <div className="absolute z-20 left-0 top-0 w-full h-full bg-gray-900/80"></div>
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
            <a
              href="#uniforms"
              className="mt-4 w-fit bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Get Started
            </a>
          </div>
        </div>
        <HowItWorks />
        <Uniforms addToCart={addToCart} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
