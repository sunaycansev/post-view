import { useParams, Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Permission } from "@/constants";
import { usePost } from "@/hooks/useSinglePost";
import { useNavigator } from "@/services/navigator";
import { ArrowLeft, Loader2, AlertTriangle } from "lucide-react";

export const SinglePostPage = () => {
  const navigator = useNavigator();
  const { id: postId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: post, isLoading, isError, error } = usePost(postId);
  const navigate = useNavigate();

  const hasEditPermission = user?.permissions.includes(Permission.EDIT_POST);
  const hasViewCommentsPermission = user?.permissions.includes(
    Permission.VIEW_COMMENTS
  );

  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `px-4 py-2 rounded-t-md text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-white text-blue-600 border-b-2 border-blue-600"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-b-2 border-transparent"
    }`;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="flex items-center space-x-2 text-gray-500">
          <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
          <span>Loading post...</span>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center shadow-sm">
          <AlertTriangle
            className="mx-auto h-12 w-12 text-red-400"
            aria-hidden="true"
          />
          <h3 className="mt-2 text-lg font-semibold text-red-800">
            {isError ? "Error Loading Post" : "Post Not Found"}
          </h3>
          <p className="mt-1 text-sm text-red-600">
            {isError
              ? error?.message
              : "The requested post could not be found."}
          </p>
          <button
            onClick={() => navigate("/posts")}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Go Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/posts")}
        className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 text-gray-400 group-hover:text-gray-600 transition-colors duration-150" />
        Back to Posts
      </button>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl leading-6 font-bold text-gray-900 sm:text-3xl">
            {post[0].title}
          </h1>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <p className="text-gray-700 leading-relaxed">{post[0].content}</p>
        </div>

        {(hasViewCommentsPermission || hasEditPermission) && (
          <nav className="flex space-x-4 border-t border-gray-200 px-4 sm:px-6 bg-gray-50 rounded-b-lg">
            {hasViewCommentsPermission && (
              <NavLink
                to={navigator.get("postComments", { id: postId! }) || ""}
                className={getNavLinkClass}
              >
                Comments
              </NavLink>
            )}
            {hasEditPermission && (
              <NavLink
                to={navigator.get("editPost", { id: postId! }) || ""}
                className={getNavLinkClass}
              >
                Edit Post
              </NavLink>
            )}
          </nav>
        )}
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};
