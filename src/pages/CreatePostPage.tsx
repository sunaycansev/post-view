import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useToast } from "@/contexts/ToastContext";
import { useNav } from "@/services/navigator";

export const CreatePostPage = () => {
  const navigate = useNavigate();
  const navigator = useNav();
  const { showToast } = useToast();
  const { user } = useAuth();
  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      showToast("You must be logged in to create a post.", "error");
      return;
    }

    if (!title.trim()) {
      showToast("Post title cannot be empty.", "error");
      return;
    }

    if (!content.trim()) {
      showToast("Post content cannot be empty.", "error");
      return;
    }

    try {
      await createPost({
        title,
        content,
        authorId: user.id,
      });
      navigate(navigator.posts.get());
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="post-title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isCreating}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label
            htmlFor="post-content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="post-content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isCreating}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            required
            aria-required="true"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isCreating || !title.trim() || !content.trim()}
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? "Creating..." : "Create Post"}
          </button>
          <button
            type="button"
            onClick={() => navigate(navigator.posts.get())}
            disabled={isCreating}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
