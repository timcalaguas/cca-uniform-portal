import { XIcon } from "lucide-react";
import { Plus, Minus, Trash } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useAppMutation } from "../hooks/useAppMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Cart = ({ showCart, setShowCart, user }) => {
  const navigate = useNavigate();

  const loggedIn = user != null;

  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCartStore();

  const { mutate, isPending } = useAppMutation({
    url: "/api:teW9LUt8/order",
    method: "post",
  });

  const checkout = async () => {
    const order_items = items.map((item) => ({
      uniform_id: parseInt(item.id.split("-")[0]),
      quantity: item.quantity,
      size_id: item.size_id,
    }));

    mutate(
      { buyer_id: user.id, order_items, total_amount: totalPrice() },
      {
        onSuccess: () => {
          toast.success("Order placed successfully");
          clearCart();
          setShowCart(false);
        },
        onError: (error) => {
          console.error("Error placing order:", error);
        },
      }
    );
  };

  return (
    <>
      {showCart && (
        <div
          className="fixed inset-0 z-40 bg-gray-700/60 backdrop-blur-md"
          onClick={() => setShowCart(false)}
        />
      )}
      <div
        className={`fixed  h-screen w-full sm:min-w-[400px] sm:w-1/5 bg-gray-100 top-0 right-0 z-50 py-5 px-7 flex flex-col justify-between ${
          showCart ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="relative z-20 flex justify-between items-center mb-5 border-b pb-3 border-gray-300">
          <p className="text-black text-xl font-semibold">Cart</p>
          <div className="cursor-pointer" onClick={() => setShowCart(false)}>
            <XIcon className="w-6 h-6  text-black" />
          </div>
        </div>
        <div className="relative h-full w-full grow overflow-hidden ">
          <div className="absolute left-0 top-0 w-full  flex flex-col gap-3 h-full overflow-hidden overflow-y-auto">
            {items.length === 0 && (
              <p className="text-gray-600 text-center mt-10">
                Your cart is empty.
              </p>
            )}
            {items.map((item) => (
              <div
                className="flex gap-3 items-center justify-between flex-wrap"
                key={item.id}
              >
                <div className="flex gap-3 items-center j">
                  <img
                    src={item.img}
                    alt="Placeholder"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="">
                    <div className="flex flex-col mb-2">
                      <p className="text-black font-semibold">{item.name}</p>
                      <p className="text-gray-600 text-xs">Size: {item.size}</p>
                    </div>
                    <p className=" text-sm font-semibold text-teal-500">
                      {item.price === 0
                        ? "By Order"
                        : `₱${new Intl.NumberFormat().format(item.price)}`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1 items-center">
                    <div
                      className="cursor-pointer"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4 text-black " />
                    </div>
                    <input
                      type="number"
                      readOnly
                      className="w-12 border border-gray-300 rounded-md p-1 text-center bg-transparent text-black"
                      value={item.quantity}
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4 text-black " />
                    </div>
                  </div>
                  <div
                    className="text-red-600 text-sm flex items-center gap-1 hover:underline cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash className="w-4 h-4 " />
                    Remove
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="border-t border-gray-300 pt-3 flex flex-col gap-2"></div>

          <div className="flex justify-between items-center">
            <p className="text-black font-semibold">Subtotal:</p>
            <p className="text-black font-semibold">
              ₱{new Intl.NumberFormat().format(totalPrice())}
            </p>
          </div>
        </div>
        <button
          disabled={isPending || (loggedIn && items.length === 0)}
          className="mt-5 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          onClick={() =>
            loggedIn && items.length > 0 ? checkout() : navigate("/login")
          }
        >
          {loggedIn
            ? isPending
              ? "Processing..."
              : "Checkout"
            : "Login to Checkout"}
        </button>
      </div>
    </>
  );
};
