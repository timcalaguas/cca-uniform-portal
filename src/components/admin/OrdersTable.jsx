import SearchBar from "./SearchBar";
import { useAppQuery } from "../../hooks/useAppQuery";
import { useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import { useAppMutation } from "../../hooks/useAppMutation";
import formatDate from "../../utils/formatDate";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal";

const statusClasses = {
  claimed: "bg-green-700 text-white",
  unpaid: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
};

export default function OrdersTable({ title }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useAppQuery({
    queryKey: ["orders", debouncedSearch],
    url: "/api:teW9LUt8/order",
    params: { search: debouncedSearch },
    isPrivate: true, // 🔒 uses token
  });

  const { mutate, isPending } = useAppMutation({
    url: "/api:teW9LUt8/order/status",
    method: "put",
  });

  const handleStatusChange = (orderId, newStatus) => {
    mutate(
      { id: orderId, status: newStatus },
      {
        onSuccess: () => {
          toast.success("Order status updated successfully");
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error) => {
          console.error("Error updating order status:", error);
        },
      }
    );
  };

  return (
    <>
      <SearchBar
        search={search}
        onSearch={setSearch}
        placeholder="Search Order ID...."
      />
      <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Student Email
                </th>
                <th className="px-6 py-3 text-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-3 text-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => {
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                        #CCA{item.id}
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                        {item.buyer?.email}
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                        ₱
                        {new Intl.NumberFormat().format(item.total_amount) ??
                          "90000"}
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${
                            statusClasses[item.status]
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                        <button
                          className="text-green-400 font-medium transition rounded-lg  hover:text-green-600"
                          onClick={() => setSelectedOrder(item)}
                        >
                          View Items
                        </button>
                      </td>

                      <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                        {item.status === "unpaid" && (
                          <button
                            className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                            onClick={() => handleStatusChange(item.id, "paid")}
                            disabled={isPending}
                          >
                            {isPending ? "Processing..." : "Mark as Paid"}
                          </button>
                        )}
                        {item.status === "paid" && (
                          <button
                            className="text-green-600 hover:text-green-800 font-medium transition"
                            onClick={() =>
                              handleStatusChange(item.id, "claimed")
                            }
                          >
                            {isPending ? "Processing..." : "Mark as Claimed"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={selectedOrder != null}
        onClose={() => setSelectedOrder(null)}
        title={`#CCA${selectedOrder?.id} - Order Details`}
      >
        {selectedOrder?._order_items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-2 text-black"
          >
            <div className="flex flex-row gap-2 items-center">
              <div className="bg-emerald-300 grid items-center p-2 rounded-md">
                <img
                  src={item.__uniform.image_url}
                  alt={item.__uniform.name}
                  className="w-16 h-16 object-cover "
                />
              </div>
              <div>
                <span className="font-semibold">{item.__uniform.name}</span>
                <span className="block text-sm text-gray-600">
                  Size: {item.__size.name}
                </span>
                <span className="block text-sm text-gray-600">
                  Quantity: {item.quantity}
                </span>
              </div>
            </div>

            <span className="font-semibold ">₱{item.__size.price}</span>
          </div>
        ))}
      </Modal>
    </>
  );
}
