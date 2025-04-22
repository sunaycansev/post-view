import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/types/post";
import { useToast } from "@/contexts/ToastContext";

const POST_QUERY_KEY = "post";
const POSTS_BASE_URL = `${import.meta.env.VITE_API_URL}/posts`;

export const usePost = (postId: string | number | undefined) => {
  const queryKey = [POST_QUERY_KEY, String(postId)];

  return useQuery<Post>({
    queryKey,
    queryFn: async () => {
      if (!postId) throw new Error("PostId is required");

      const url = `${POSTS_BASE_URL}/${postId}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Post with ID ${postId} not found`);
        }
        throw new Error(
          `Failed to fetch post with ID ${postId}: ${response.statusText}`
        );
      }

      return response.json();
    },
    enabled: !!postId,
  });
};

export const useUpdatePost = (postId: string | number | undefined) => {
  const queryClient = useQueryClient();
  const stringPostId = String(postId);
  const { showToast } = useToast();
  return useMutation<Post, Error, Pick<Post, "title" | "body">>({
    mutationFn: async (updatedData) => {
      if (!postId) throw new Error("PostId is required for update");

      const url = `${POSTS_BASE_URL}/${postId}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Failed to update post: ${response.status} ${errorBody}`
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POST_QUERY_KEY, stringPostId],
      });
      showToast("Post updated successfully!", "success");
    },
    onError: (error) => {
      console.error("Error updating post:", error);
      showToast(`Error updating post: ${error.message}`, "error");
    },
  });
};
