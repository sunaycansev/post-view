import { Permission } from "@/constants";
import isEmpty from "lodash/isEmpty";

export const hasRequiredPermission = (
  userPermissions: Permission[] = [],
  requiredPermissions: Permission[] = []
): boolean => {
  if (isEmpty(requiredPermissions)) {
    return true;
  }

  if (isEmpty(userPermissions)) {
    return false;
  }

  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};
