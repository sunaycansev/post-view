import { usePermission } from "@/hooks/usePermission";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { Permission } from "@/constants";

type AuthorityGuardProps = PropsWithChildren<{
  userPermissions?: Permission[];
  permissions?: Permission[];
}>;

const AuthorityGuard = (props: AuthorityGuardProps) => {
  const { userPermissions = [], permissions = [], children } = props;

  const isAuthorized = usePermission(userPermissions, permissions);

  return <>{isAuthorized ? children : <Navigate to="/access-denied" />}</>;
};

export default AuthorityGuard;
