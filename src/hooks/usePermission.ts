import { useMemo } from "react";
import { Permission } from "@/constants";
import { hasRequiredPermission } from "@/utils/permissionUtils";

export const usePermission = (
  userPermissions: Permission[] = [],
  permissions: Permission[] = []
) => {
  const isAuthorized = useMemo(() => {
    return hasRequiredPermission(userPermissions, permissions);
  }, [userPermissions, permissions]);

  return isAuthorized;
};
