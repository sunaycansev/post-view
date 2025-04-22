import { useQueryClient } from "@tanstack/react-query";
import { AUTH_QUERY_KEY, DUMMY_USER } from "../constants";
import { useToast } from "@/contexts/ToastContext";
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    try {
      queryClient.setQueryData(AUTH_QUERY_KEY, DUMMY_USER);
      showToast("Logged in successfully", "success");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Failed to log in", error);
      showToast("Failed to log in", "error");
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
