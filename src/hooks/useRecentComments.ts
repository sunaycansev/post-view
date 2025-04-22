import { useQuery } from "@tanstack/react-query";
import { Comment } from "@/types/comment";

const RECENT_COMMENTS_QUERY_KEY = "recentComments";
const COMMENTS_BASE_URL = `${import.meta.env.VITE_API_URL}/comments`;

export const useRecentComments = (limit: number = 5) => {
  const queryKey = [RECENT_COMMENTS_QUERY_KEY, limit];
  const url = `${COMMENTS_BASE_URL}?_sort=id&_order=desc&_limit=${limit}`;

  return useQuery<Comment[]>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch recent comments: ${response.statusText}`
        );
      }
      return response.json();
    },
  });
};
