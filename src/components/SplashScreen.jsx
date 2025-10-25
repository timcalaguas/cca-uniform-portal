

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-gray-800 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
      <h1 className="text-lg font-semibold tracking-wide">Loading...</h1>
    </div>
  );
}
