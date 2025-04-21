import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_QUERY_KEY } from "@/constants";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    queryClient.invalidateQueries({
      queryKey: AUTH_QUERY_KEY,
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="container grid grid-cols-2 items-center h-16 px-4 mx-auto">
        <div className="flex gap-4 sm:gap-8">
          <Link
            to="/dashboard"
            className="text-sm sm:text-base hover:text-gray-600"
          >
            Dashboard
          </Link>
          <Link
            to="/posts"
            className="text-sm sm:text-base hover:text-gray-600"
          >
            Posts
          </Link>
          <Link
            to="/create-post"
            className="text-sm sm:text-base hover:text-gray-600"
          >
            Create
          </Link>
        </div>

        <div className="flex justify-end">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 hover:cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 rounded text-white text-sm sm:text-base"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 rounded text-white text-sm sm:text-base"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
