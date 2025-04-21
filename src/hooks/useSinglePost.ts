import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/types/post";
import { toast } from "sonner";

const POST_QUERY_KEY = "post";

export const usePost = (postId: string | number | undefined) => {
  const queryKey = [POST_QUERY_KEY, String(postId)];

  return useQuery<Post[]>({
    queryKey,
    queryFn: async () => {
      if (!postId) throw new Error("PostId is required");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts?postId=${postId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch post with ID ${postId}`);
      }

      return response.json();
    },

    enabled: !!postId,
  });
};

export const useUpdatePost = (postId: string | number | undefined) => {
  const queryClient = useQueryClient();
  const stringPostId = String(postId);

  return useMutation<Post, Error, Pick<Post, "title" | "content">>({
    mutationFn: async (updatedData) => {
      if (!postId) throw new Error("PostId is required for update");

      const url = `${import.meta.env.VITE_API_URL}/posts/${postId}`;

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
    },
    onError: (error) => {
      console.error("Error updating post:", error);
      toast.error("Error updating post");
    },
  });
};
