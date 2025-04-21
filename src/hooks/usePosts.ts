import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/post";

interface UsePostsOptions {
  userId?: number;
}

export const usePosts = ({ userId }: UsePostsOptions) => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ["posts", { userId }],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_API_URL}/posts?authorId=${userId}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
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
