import { User, ListChecks, Truck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <User className="w-10 h-10 text-teal-600" />,
      title: "1. Create Account",
      description: "Register or log in to your student account.",
    },
    {
      icon: <ListChecks className="w-10 h-10 text-teal-600" />,
      title: "2. Select Uniforms",
      description: "Browse and add the required uniform items to your cart.",
    },
    {
      icon: <Truck className="w-10 h-10 text-teal-600" />,
      title: "3. Place Order",
      description:
        "Checkout and pay your order to the school to get your uniforms.",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          How It Works
        </h2>
        <p className="mt-2 text-gray-600">
          A simple 3-step process to get your uniforms.
        </p>

        {/* Steps */}
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-teal-50 mb-4">
                {step.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
