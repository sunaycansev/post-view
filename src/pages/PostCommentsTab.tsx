import { useParams, useNavigate } from "react-router-dom";
import { useComments } from "@/hooks/useComments";
import { CommentDisplay } from "@/components/CommentDisplay";
import { IconArrowLeft } from "@/assets/IconArrowLeft";

export const PostCommentsTab = () => {
  const { id: postId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: comments, isLoading, isError, error } = useComments(postId);

  if (isLoading) {
    return (
      <div className="mt-6 p-4 text-center">
        <div className="text-gray-500 italic">Loading comments...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6 p-4 text-center">
        <div className="text-red-600 font-medium">
          Error loading comments: {error?.message}
        </div>
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="mt-6 p-4 text-center">
        <div className="text-gray-500 italic">
          No comments for this post yet.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 space-y-4">
      <button
        type="button"
        onClick={() => navigate(`/posts`)}
        className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:cursor-pointer"
      >
        <IconArrowLeft className="h-5 w-5 mr-2 text-gray-400 group-hover:text-gray-600 transition-colors duration-150" />
        Back to Posts
      </button>

      <div className="mb-4 border-b pb-2">
        <h2 className="text-2xl font-semibold">Comments</h2>
      </div>
      {comments.map((comment) => (
        <CommentDisplay key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default PostCommentsTab;
