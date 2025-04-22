import { useQuery } from "@tanstack/react-query";
import { Comment } from "@/types/comment";

const COMMENTS_QUERY_KEY = "comments";
const COMMENTS_BASE_URL = `${import.meta.env.VITE_API_URL}/comments`;

export const useComments = (postId: string | number | undefined) => {
  const queryKey = [COMMENTS_QUERY_KEY, String(postId)];

  return useQuery<Comment[]>({
    queryKey,
    queryFn: async () => {
      if (!postId) throw new Error("Post ID is required to fetch comments");

      const url = `${COMMENTS_BASE_URL}?postId=${postId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch comments for post ID ${postId}`);
      }

      return response.json();
    },
    enabled: !!postId,
  });
};
