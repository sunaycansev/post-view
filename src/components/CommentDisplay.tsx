import { Comment } from "@/types/comment";
import { useUser } from "@/hooks/useUser";

interface CommentDisplayProps {
  comment: Comment;
}

interface AuthorDisplayProps {
  authorId: number;
}

const AuthorDisplay = ({ authorId }: AuthorDisplayProps) => {
  const {
    data: author,
    isLoading: isLoadingAuthor,
    isError: isErrorAuthor,
    error: authorError,
  } = useUser(authorId);

  if (isLoadingAuthor) {
    return <span className="text-gray-400 italic">Loading author...</span>;
  }

  if (isErrorAuthor) {
    console.error(`Error fetching author ${authorId}:`, authorError);
    return <span className="text-red-500 font-medium">Unknown Author</span>;
  }

  if (!author) {
    return <span className="text-gray-500 italic">Author not found</span>;
  }

  return <>{author.name}</>;
};

export const CommentDisplay = ({ comment }: CommentDisplayProps) => {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-gray-50">
      <p className="text-gray-700 text-base mb-2">{comment?.content}</p>
      <p className="text-sm text-gray-600">
        By: <AuthorDisplay authorId={comment.authorId} />
      </p>
    </div>
  );
};
