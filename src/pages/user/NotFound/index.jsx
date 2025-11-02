import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-teal-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-600">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
