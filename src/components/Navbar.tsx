import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_QUERY_KEY, Permission } from "@/constants";
import { Link } from "react-router-dom";
import { useNav } from "@/services/navigator";

export const Navbar = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const nav = useNav();
  const canCreatePost = user?.permissions.includes(Permission.CREATE_POST);

  const handleLogout = () => {
    queryClient.invalidateQueries({
      queryKey: AUTH_QUERY_KEY,
    });
  };

  const handleLogin = () => {
    nav.login.go();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="container grid grid-cols-2 items-center h-16 px-4 mx-auto">
        <div className="flex gap-4 sm:gap-8">
          <Link
            to={nav.dashboard.get()}
            className="text-sm sm:text-base hover:text-gray-600"
          >
            Dashboard
          </Link>
          <Link
            to={nav.posts.get()}
            className="text-sm sm:text-base hover:text-gray-600"
          >
            Posts
          </Link>
          {canCreatePost && (
            <Link
              to={nav.createPost.get()}
              className="text-sm sm:text-base hover:text-gray-600"
            >
              Create Post
            </Link>
          )}
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
