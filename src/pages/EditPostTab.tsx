import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePost, useUpdatePost } from "@/hooks/useSinglePost";
import { useToast } from "@/contexts/ToastContext";
import { IconArrowLeft } from "@/assets/IconArrowLeft";
import { useNav } from "@/services/navigator";

export const EditPostTab = () => {
  const { id: postId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const navigator = useNav();
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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
  } = useUpdatePost(postId);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const hasChanges =
    post &&
    (title.trim() !== post.title.trim() || body.trim() !== post.body.trim());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      showToast("Title and body cannot be empty.", "error");
      return;
    }

    if (!hasChanges) {
      showToast("No changes detected.", "info");
      return;
    }

    try {
      await updatePost({ title, body });
    } catch (err) {
      console.error("Update failed in component:", err);
    }
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
      <Link
        to={navigator.singlePost.get({ id: postId })}
        className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:cursor-pointer group"
        aria-label="Go back to posts list"
      >
        <IconArrowLeft className="h-5 w-5 mr-2 text-gray-400 group-hover:text-gray-600 transition-colors duration-150" />
        Back to Post
      </Link>

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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none sm:text-sm disabled:bg-gray-100"
            required
          />
        </div>
        <div>
          <label
            htmlFor="post-body"
            className="block text-sm font-medium text-gray-700"
          >
            Body
          </label>
          <textarea
            id="post-body"
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isUpdating}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none sm:text-sm disabled:bg-gray-100"
            required
          />
        </div>

        {isErrorUpdate && (
          <div className="text-red-600 text-sm">
            Error updating post: {errorUpdate?.message}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={
              isUpdating || !title.trim() || !body.trim() || !hasChanges
            }
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
        </div>
      </form>
    </div>
  );
};
