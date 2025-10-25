import { useAppQuery } from "../hooks/useAppQuery";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const sizeToShorten = ["Small", "Medium", "Large"]; // Placeholder data

export default function Uniforms({ addToCart }) {
  const { data: uniforms, isLoading } = useAppQuery({
    queryKey: ["uniforms"],
    url: "/api:teW9LUt8/uniform",
    isPrivate: false,
  });

  // ✅ Derived array only after loading
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    if (!isLoading && uniforms) {
      setSelectedSizes(
        uniforms.map(() => ({
          i: 0,
        }))
      );
    }
  }, [isLoading, uniforms]);

  return (
    <div id="uniforms" className="relative z-20 pt-16 pb-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center h-full flex-grow gap-3">
        <h2 className="text-black text-3xl font-bold text-center">
          Our Uniforms
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Explore our range of high-quality uniforms designed for comfort and
          durability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading &&
            selectedSizes.length > 0 &&
            uniforms.map((uniform, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-emerald-50 shadow-md hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={uniform.image_url}
                    alt={`Uniform ${index + 1}`}
                    className="w-full h-[500px] object-contain transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute w-full h-full top-0 left-0 lg:bg-gradient-to-t from-black/60 to-transparent lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="w-full  bg-white bg-opacity-75 rounded-md px-4 py-4 shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {uniform.name}
                    </h3>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {uniform.sizes_of_uniform.map((size, idx) => (
                        <span
                          key={idx}
                          className={`text-sm text-gray-600 px-2 border border-gray-300 rounded-full ${
                            selectedSizes[index].i === idx
                              ? "bg-teal-500 text-white border-teal-500"
                              : "bg-white hover:bg-gray-100 cursor-pointer"
                          }`}
                          onClick={() =>
                            setSelectedSizes([
                              ...selectedSizes,
                              (selectedSizes[index].i = idx),
                            ])
                          }
                        >
                          {sizeToShorten.includes(size.name)
                            ? size.name.charAt(0)
                            : size.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-5">
                      <div className="text-lg font-semibold text-gray-900">
                        {uniform.sizes_of_uniform[selectedSizes[index].i]
                          .price === 0
                          ? "By Order"
                          : "₱" +
                            new Intl.NumberFormat().format(
                              uniform.sizes_of_uniform[selectedSizes[index].i]
                                .price
                            ) +
                            ".00"}
                      </div>

                      <button
                        className="flex items-center justify-center w-fit py-2.5 px-4 bg-teal-500 hover:bg-teal-700 text-white font-medium rounded-lg shadow hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                        onClick={() =>
                          addToCart({
                            img: uniform.image_url,
                            id:
                              uniform.id +
                              "-" +
                              uniform.sizes_of_uniform[selectedSizes[index].i]
                                .id,
                            name: uniform.name,
                            size: uniform.sizes_of_uniform[
                              selectedSizes[index].i
                            ].name,
                            price:
                              uniform.sizes_of_uniform[selectedSizes[index].i]
                                .price,
                            quantity: 1,
                            size_id:
                              uniform.sizes_of_uniform[selectedSizes[index].i]
                                .id,
                          })
                        }
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
