import { useState, useEffect } from "react";
import Heading from "../../../components/Heading";
import { ShoppingBag, Users, Shirt, LogOut, User } from "lucide-react";

import OrdersTable from "../../../components/admin/OrdersTable";
import UniformsTable from "../../../components/admin/UniformsTable";
import UsersTable from "../../../components/admin/UsersTable";
import { useAppQuery } from "../../../hooks/useAppQuery";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "orders";
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  const { data, isLoading } = useAppQuery({
    queryKey: ["count"],
    url: "/api:teW9LUt8/dashboard/count",
    isPrivate: true, // 🔒 uses token
  });

  const stats = [
    {
      title: "Orders",
      value: isLoading ? 0 : data.order_count,
      icon: ShoppingBag,
      key: "orders",
    },
    {
      title: "Students",
      value: isLoading ? 0 : data.user_count,
      icon: Users,
      key: "users",
    },
    {
      title: "Uniforms",
      value: isLoading ? 0 : data.uniform_count,
      icon: Shirt,
      key: "uniforms",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <Heading size="lg">CCA Uniform Portal</Heading>
        {user && (
          <div
            className="flex items-center gap-2 p-2 bg-teal-400 rounded-full relative cursor-pointer hover:bg-teal-600 transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            <User className="w-5 h-5 text-white" />
            {showMenu && (
              <div className="absolute top-12 right-0 bg-teal-600 text-white rounded-xl shadow-lg p-3 w-40 flex flex-col gap-2 origin-top-right animate-scaleIn">
                <p className="font-semibold">{user.name}</p>
                <div className="border-t border-teal-400" />

                <button
                  className="flex gap-2 items-center text-sm hover:text-teal-200 transition"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-3 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.key}
              onClick={() => setActiveTab(stat.key)}
              className={`cursor-pointer bg-white shadow-md hover:shadow-lg transition-all rounded-2xl p-6 text-center border ${
                activeTab === stat.key
                  ? "border-teal-500"
                  : "border-transparent"
              }`}
            >
              <div className="flex justify-center mb-2">
                <Icon className="w-6 h-6 text-teal-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Table Section */}
      <div className="mt-10">
        {activeTab === "orders" && <OrdersTable title={"Orders"} />}
        {activeTab === "users" && <UsersTable title={"Students"} />}
        {activeTab === "uniforms" && <UniformsTable title={"Uniforms"} />}
      </div>
    </div>
  );
}
