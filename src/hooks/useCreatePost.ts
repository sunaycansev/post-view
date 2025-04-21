import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Post } from "@/types/post";
import { User } from "@/constants";

interface CreatePostPayload {
  title: string;
  content: string;
  authorId: User["id"];
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreatePostPayload>({
    mutationFn: async (newPostData) => {
      const url = `${import.meta.env.VITE_API_URL}/posts`;

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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(`Post "${data.title}" created successfully!`);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      toast.error(`Error creating post: ${error.message}`);
    },
  });
};
