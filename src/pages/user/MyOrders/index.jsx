import Footer from "../../../components/Footer";
import { Header } from "../../../components/Header";
import Heading from "../../../components/Heading";
import Paragraph from "../../../components/Paragraph";
import { useAppQuery } from "../../../hooks/useAppQuery";
import formatDate from "../../../utils/formatDate";
import { useAuth } from "../../../context/AuthContext";

const statusClasses = {
  claimed: "bg-green-700 text-white",
  unpaid: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
};

export default function MyOrders() {
  const { user } = useAuth();
  const { data, isLoading } = useAppQuery({
    queryKey: ["orders"],
    url: `/api:teW9LUt8/order/user/${user.id}`,
    isPrivate: true,
    enabled: !!user,
  });

  return (
    <>
      <Header />
      <section className="pt-44 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-start mb-8">
            <Heading size="lg">My Orders</Heading>
            <Paragraph size="md">
              Please present your Order ID at the school to pay for or claim
              your order.
            </Paragraph>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Student Email
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
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
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          #CCA{item.id}
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          {item.buyer?.email}
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          ₱
                          {new Intl.NumberFormat().format(item.total_amount) ??
                            "90000"}
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${
                              statusClasses[item.status]
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          {formatDate(item.created_at)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
