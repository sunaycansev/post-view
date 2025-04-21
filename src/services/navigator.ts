import {
  useNavigate,
  useLocation,
  generatePath,
  NavigateOptions,
} from "react-router-dom";
import { routes } from "@/routes/routes";
import { useAuth } from "@/hooks/useAuth";
import { hasRequiredPermission } from "@/utils/permissionUtils";

type RouteParams = Record<string, string | number | undefined>;

interface NavMethods {
  get: (params?: RouteParams) => string;
  go: (params?: RouteParams, options?: NavigateOptions) => void;
}

export type Nav = {
  [routeName: string]: NavMethods;
};

const LOGIN_ROUTE_NAME = "login";
const ACCESS_DENIED_ROUTE_NAME = "accessDenied";

export const useNav = (): Nav => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const nav = routes.reduce<Nav>((acc, route) => {
    const generateRoutePath = (params?: RouteParams): string => {
      try {
        const definedParams = params
          ? Object.entries(params).reduce<Record<string, string>>(
              (paramsAccumulator, [key, value]) => {
                if (value !== undefined) {
                  paramsAccumulator[key] = String(value);
                }
                return paramsAccumulator;
              },
              {}
            )
          : {};
        return generatePath(route.path, definedParams);
      } catch (error) {
        console.error(
          `Error generating path for route "${route.name}" with params:`,
          params,
          error
        );

        return "/";
      }
    };

    acc[route.name] = {
      get: (params?: RouteParams): string => {
        return generateRoutePath(params);
      },

      go: (params?: RouteParams, options?: NavigateOptions): void => {
        if (route.isPrivate && !user) {
          const loginPath =
            routes.find((route) => route.name === LOGIN_ROUTE_NAME)?.path ||
            "/login";

          navigate(loginPath, {
            state: { from: location },
            replace: true,
          });

          return;
        }

        if (user && route.permissions && route.permissions.length > 0) {
          if (!hasRequiredPermission(user.permissions, route.permissions)) {
            const accessDeniedPath =
              routes.find((r) => r.name === ACCESS_DENIED_ROUTE_NAME)?.path ||
              "/access-denied";

            navigate(accessDeniedPath, {
              replace: true,
            });
            return;
          }
        }

        const url = generateRoutePath(params);
        navigate(url, options);
      },
    };

    return acc;
  }, {});

  return nav;
};
