import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePost, useUpdatePost } from "@/hooks/useSinglePost";
import { useToast } from "@/contexts/ToastContext";

export const EditPostTab = () => {
  const { id: postId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
  } = usePost(postId);

  const {
    mutateAsync: updatePost,
    isPending: isUpdating,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdatePost(postId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post[0].title);
      setContent(post[0].content);
    }
  }, [post]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      showToast("Title and content cannot be empty.", "error");
      return;
    }

    await updatePost({ title, content });
    showToast("Post updated successfully", "success");
  };

  if (isLoadingPost) {
    return (
      <div className="mt-6 p-4 text-center">
        <div className="text-gray-500 italic">Loading post details...</div>
      </div>
    );
  }

  if (isErrorPost) {
    return (
      <div className="mt-6 p-4 text-center">
        <div className="text-red-600 font-medium">
          Error loading post details: {errorPost?.message}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mt-6 p-4 text-center">
        <div className="text-gray-500 italic">Post not found.</div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="post-title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUpdating}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            required
          />
        </div>
        <div>
          <label
            htmlFor="post-content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="post-content"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isUpdating}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            required
          />
        </div>

        {isErrorUpdate && (
          <div className="text-red-600 text-sm">
            Error updating post: {errorUpdate?.message}
          </div>
        )}

        {isSuccessUpdate && (
          <div className="text-green-600 text-sm">
            Post updated successfully!
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isUpdating || !title || !content}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts/${postId}/comments`)}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View Comments
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts`)}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:cursor-pointer"
          >
            Back to Posts
          </button>
        </div>
      </form>
    </div>
  );
};
