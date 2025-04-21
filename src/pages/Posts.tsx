import { useNavigator } from "@/services/navigator";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import { Permission } from "@/constants";
import { Post } from "@/types/post";
import { Link } from "react-router-dom";

export const Posts = () => {
  const { user } = useAuth();
  const { posts, isLoading, isError, error } = usePosts({ userId: user?.id });
  const navigator = useNavigator();

  const hasEditPermission = user?.permissions.includes(Permission.EDIT_POST);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium">Loading posts...</div>
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
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="flex gap-2">
              <Link
                to={navigator.get("singlePost", { id: post.id }) || ""}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
              >
                View Post
              </Link>

              {hasEditPermission && (
                <Link
                  to={navigator.get("editPost", { id: post.id }) || ""}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 hover:cursor-pointer"
                >
                  Edit
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
