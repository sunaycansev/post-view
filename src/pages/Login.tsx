import { useQueryClient } from "@tanstack/react-query";
import { AUTH_QUERY_KEY, DUMMY_USER } from "../constants";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    try {
      queryClient.setQueryData(AUTH_QUERY_KEY, DUMMY_USER);
      toast.success("Logged in successfully");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Failed to log in", error);
      toast.error("Failed to log in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
      <div className="w-full max-w-xs text-center">
        <button
          type="button"
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
          aria-label="Log in"
        >
          Log In
        </button>
      </div>
    </div>
  );
};
