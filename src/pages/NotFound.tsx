import { useNav } from "@/services/navigator";

export const NotFound = () => {
  const nav = useNav();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn't exist.
      </p>
      <button
        onClick={() => nav.dashboard.go()}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        aria-label="Go to homepage"
        tabIndex={0}
      >
        Go to Homepage
      </button>
    </div>
  );
};
