import { usePosts } from "@/hooks/usePosts";
import { useRecentComments } from "@/hooks/useRecentComments";
import { Post } from "@/types/post";
import { Comment } from "@/types/comment";
import { useAuth } from "@/hooks/useAuth";
import { useNav } from "@/services/navigator";

const LoadingIndicator = () => (
  <p className="text-gray-500 italic">Loading...</p>
);

const ErrorMessage = ({ message }: { message?: string }) => (
  <p className="text-red-600">Error: {message || "Failed to load data"}</p>
);

export const Dashboard = () => {
  const { user } = useAuth();
  const nav = useNav();

  const {
    posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error: errorPosts,
  } = usePosts({ userId: user?.id, limit: 5, sortBy: "id", order: "desc" });

  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    error: errorComments,
  } = useRecentComments(5);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 border-b pb-2 text-gray-700">
            Recent Posts
          </h2>
          <div className="min-h-[150px]">
            {isLoadingPosts ? <LoadingIndicator /> : null}
            {isErrorPosts ? (
              <ErrorMessage message={errorPosts?.message} />
            ) : null}
            {!isLoadingPosts && !isErrorPosts && (
              <ul className="space-y-1">
                {posts.length > 0 ? (
                  posts.map((post: Post) => (
                    <li
                      key={post.id}
                      className="text-sm text-gray-600 border-b border-gray-100 last:border-b-0 py-1"
                    >
                      <button
                        onClick={() => nav.singlePost.go({ id: post.id })}
                        className="w-full text-left truncate px-1 py-0.5 rounded text-blue-600 hover:bg-blue-50 hover:text-blue-800 hover:cursor-pointer"
                      >
                        {post.title}
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No recent posts found.
                  </p>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 border-b pb-2 text-gray-700">
            Recent Comments
          </h2>
          <div className="min-h-[150px]">
            {isLoadingComments ? <LoadingIndicator /> : null}
            {isErrorComments ? (
              <ErrorMessage message={errorComments?.message} />
            ) : null}
            {!isLoadingComments && !isErrorComments && comments && (
              <ul className="space-y-2">
                {comments.length > 0 ? (
                  comments.map((comment: Comment) => (
                    <li
                      key={comment.id}
                      className="text-sm text-gray-600 border-b border-gray-100 last:border-b-0 py-1.5"
                    >
                      {comment.body}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No recent comments found.
                  </p>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
