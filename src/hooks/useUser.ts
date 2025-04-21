import { useQuery } from "@tanstack/react-query";
import { User } from "@/constants";

const USER_QUERY_KEY = "user";

export const useUser = (userId: number | undefined) => {
  const queryKey = [USER_QUERY_KEY, userId];

  return useQuery<User>({
    queryKey,
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/?id=${userId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`User with ID ${userId} not found`);
        }

        throw new Error(`Failed to fetch user with ID ${userId}`);
      }

      const data = await response.json();

      return data[0];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 15,
  });
};
