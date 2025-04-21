import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Permission } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import AuthorityGuard from "./AuthorityGuard";

type AuthWrapperProps = PropsWithChildren<{
  isPrivate?: boolean;
  permissions?: Permission[];
}>;

const AuthWrapper = (props: AuthWrapperProps) => {
  const { isPrivate = false, permissions = [], children } = props;
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading Authentication...</div>;
  }

  if (!isPrivate) {
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (permissions.length > 0) {
    return (
      <AuthorityGuard
        userPermissions={user.permissions}
        permissions={permissions}
      >
        {children}
      </AuthorityGuard>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
