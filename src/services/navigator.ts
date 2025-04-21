import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "@/routes/routes";
import { useAuth } from "@/hooks/useAuth";
import { hasRequiredPermission } from "@/utils/permissionUtils";

type RouteParams = Record<string, string | number>;

export const navigator = {
  get: (routeName: string, params?: RouteParams): string | null => {
    const route = routes.find((r) => r.name === routeName);

    if (!route) {
      console.error(`Route with name "${routeName}" not found`);
      return null;
    }

    const initialPath = route.path;
    const expectedParams = initialPath.match(/:([a-zA-Z0-9_]+)/g) || [];

    const finalPath = params
      ? Object.entries(params).reduce((currentPath, [key, value]) => {
          const placeholder = `:${key}`;
          if (currentPath.includes(placeholder)) {
            return currentPath.replace(placeholder, String(value));
          } else {
            console.warn(
              `Parameter "${key}" provided for route "${routeName}" but not found in path pattern "${initialPath}"`
            );
            return currentPath;
          }
        }, initialPath)
      : initialPath;

    const missingParams = expectedParams.filter((p) => finalPath.includes(p));
    if (missingParams.length > 0) {
      console.error(
        `Route "${routeName}" requires parameters (${missingParams.join(
          ", "
        )}) that were not provided or fully replaced. Generated path: ${finalPath}`
      );
      return null;
    }

    return finalPath;
  },
};

export const useNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return {
    get: navigator.get,

    go: (routeName: string, params?: RouteParams): boolean => {
      const route = routes.find((r) => r.name === routeName);

      if (!route) {
        console.error(
          `Attempted to navigate to non-existent route: "${routeName}"`
        );
        return false;
      }

      if (route.isPrivate && !user) {
        console.log(
          `Redirecting to login. Route "${routeName}" requires authentication.`
        );
        navigate("/login", { state: { from: location } });
        return false;
      }

      if (!hasRequiredPermission(user?.permissions, route.permissions)) {
        console.log(
          `Redirecting to access denied. User lacks permissions for route "${routeName}".`
        );
        navigate("/access-denied");
        return false;
      }

      const url = navigator.get(routeName, params);

      if (url === null) {
        console.error(
          `Navigation failed: Could not generate valid URL for route "${routeName}" with params:`,
          params
        );
        return false;
      }

      navigate(url);
      return true;
    },
  };
};
