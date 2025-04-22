import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/contexts/ToastContext";
import { Post } from "@/types/post";
import { User } from "@/constants";

interface CreatePostPayload {
  title: string;
  body: string;
  userId: User["id"];
}

const POSTS_BASE_URL = `${import.meta.env.VITE_API_URL}/posts`;

export const useCreatePost = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreatePostPayload>({
    mutationFn: async (newPostData) => {
      const url = POSTS_BASE_URL;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Failed to create post:", response.status, errorBody);
        throw new Error(
          `Failed to create post: ${response.status} ${
            errorBody || response.statusText
          }`
        );
      }

      return response.json();
    },
    onSuccess: (createdPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showToast(`Post "${createdPost.title}" created successfully!`, "success");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      showToast(`Error creating post: ${error.message}`, "error");
    },
  });
};
