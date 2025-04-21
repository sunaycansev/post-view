import { useQuery } from "@tanstack/react-query";
import { AUTH_QUERY_KEY, User } from "../constants";

export const useAuth = () => {
  const { data: user, isPending } = useQuery<User | null, Error>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    user,
    isLoading: isPending,
  };
};
