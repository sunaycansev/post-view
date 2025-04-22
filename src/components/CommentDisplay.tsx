import { Comment } from "@/types/comment";

interface CommentDisplayProps {
  comment: Comment;
}

export const CommentDisplay = ({ comment }: CommentDisplayProps) => {
  if (!comment) {
    return (
      <div className="p-4 border rounded-md shadow-sm bg-gray-100 text-red-600">
        Invalid comment data.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white mb-4">
      <p className="text-gray-800 text-base mb-2">{comment.body}</p>
      <p className="text-sm text-gray-600">
        <span className="font-bold">By:</span>{" "}
        <span className="font-medium text-gray-700">{comment.name}</span>
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-bold">Email:</span>{" "}
        <span className="font-medium text-gray-700">{comment.email}</span>
      </p>
    </div>
  );
};
