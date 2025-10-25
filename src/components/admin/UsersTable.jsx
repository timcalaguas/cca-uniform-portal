import SearchBar from "./SearchBar";
import { useAppQuery } from "../../hooks/useAppQuery";
import { useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import formatDate from "../../utils/formatDate";

export default function UsersTable({ title }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useAppQuery({
    queryKey: ["users", debouncedSearch],
    url: "/api:teW9LUt8/user",
    params: { search: debouncedSearch },
    isPrivate: true, // 🔒 uses token
  });

  return (
    <>
      <SearchBar
        search={search}
        onSearch={setSearch}
        placeholder="Search student email..."
      />
      <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date Joined
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
                    No students found.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                      #CCA{item.id}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
