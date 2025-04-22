import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/contexts/ToastContext";

const POSTS_BASE_URL = `${import.meta.env.VITE_API_URL}/posts`;
const POST_QUERY_KEY = "post";
const POSTS_QUERY_KEY = "posts";

export const useDeletePost = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (postId) => {
      if (!postId) {
        throw new Error("Post ID is required for deletion.");
      }

      const url = `${POSTS_BASE_URL}/${postId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        console.error("Failed to delete post:", response.status, errorBody);
        throw new Error(
          `Failed to delete post: ${response.status} ${
            errorBody || response.statusText
          }`
        );
      }
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [POST_QUERY_KEY, String(postId)],
      });

      showToast("Post deleted successfully!", "success");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      showToast(`Error deleting post: ${error.message}`, "error");
    },
  });
};
