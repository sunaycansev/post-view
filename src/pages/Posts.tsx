import { useState } from "react";
import { useNav } from "@/services/navigator";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import { Permission } from "@/constants";
import { Post } from "@/types/post";
import { Link } from "react-router-dom";
import { Spinner } from "@/components/Spinner";
import { useDeletePost } from "@/hooks/useDeletePost";
import { IconTrash } from "@/assets/IconTrash";
import { ConfirmModal } from "@/components/ConfirmModal";

export const Posts = () => {
  const { user } = useAuth();
  const { posts, isLoading, isError, error } = usePosts({ userId: user?.id });
  const nav = useNav();
  const { mutate: deletePost, isPending: isDeletingPost } = useDeletePost();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);

  const hasEditPermission = user?.permissions.includes(Permission.EDIT_POST);

  const handleOpenDeleteConfirm = (postId: number) => {
    setPostIdToDelete(postId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (postIdToDelete !== null) {
      deletePost(postIdToDelete);
    }
  };

  const handleCancelDelete = () => {
    setPostIdToDelete(null);
    setIsConfirmModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-red-600">
          Error loading posts
        </div>
        <div className="text-sm text-gray-600">{error?.message}</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium">No posts available</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Posts</h1>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post: Post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.body}</p>
            <div className="flex gap-2 items-center">
              <Link
                to={nav.singlePost.get({ id: post.id })}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer text-sm"
              >
                View Post
              </Link>

              {hasEditPermission && (
                <>
                  <Link
                    to={nav.editPost.get({ id: post.id })}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 hover:cursor-pointer text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleOpenDeleteConfirm(post.id)}
                    disabled={isDeletingPost}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm inline-flex items-center gap-1"
                    aria-label={`Delete post titled ${post.title}`}
                  >
                    <IconTrash width={16} height={16} />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
