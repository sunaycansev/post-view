import { useParams, useNavigate } from "react-router-dom";
import { useComments } from "@/hooks/useComments";
import { CommentDisplay } from "@/components/CommentDisplay";

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
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <button
          type="button"
          onClick={() => navigate(`/posts`)}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:cursor-pointer"
        >
          Back to Posts
        </button>
      </div>
      {comments.map((comment) => (
        <CommentDisplay key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default PostCommentsTab;
