import { Permission } from "@/constants";

export const useAuth = () => {
  return {
    user: {
      id: "1",
      name: "John Doe",
      permissions: [Permission.VIEW_POSTS, Permission.VIEW_COMMENTS],
    },
  };
};
