import { Search } from "lucide-react";

export default function SearchBar({
  placeholder = "Search...",
  buttonLabel = "Add New",
  onSearch,
  search = "",
  onAction,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
      {/* Search Bar */}
      <div className="relative w-full sm:w-1/3">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={search}
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-non bg-white text-black"
        />
      </div>

      {/* Primary Action Button */}
      {onAction && (
        <button
          onClick={onAction}
          className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-5 py-2 rounded-lg shadow-sm transition-all"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
