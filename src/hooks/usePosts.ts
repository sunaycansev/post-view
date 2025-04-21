import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/post";

interface UsePostsOptions {
  userId?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const usePosts = ({
  userId,
  limit,
  sortBy,
  order,
}: UsePostsOptions = {}) => {
  const queryParams = new URLSearchParams();
  if (userId) queryParams.append("authorId", String(userId));
  if (limit) queryParams.append("_limit", String(limit));
  if (sortBy) queryParams.append("_sort", sortBy);
  if (order) queryParams.append("_order", order);

  const queryString = queryParams.toString();
  const url = `${import.meta.env.VITE_API_URL}/posts${
    queryString ? `?${queryString}` : ""
  }`;

  const queryKey = ["posts", { userId, limit, sortBy, order }];

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Post[]>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      return response.json();
    },
    enabled: !!userId,
  });

  return {
    posts: posts || [],
    isLoading,
    isError,
    error,
    refetch,
  };
};
