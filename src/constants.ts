export enum Permission {
  VIEW_POSTS = "VIEW_POSTS",
  VIEW_COMMENTS = "VIEW_COMMENTS",
  EDIT_POST = "EDIT_POST",
  CREATE_POST = "CREATE_POST",
}

export interface User {
  id: number;
  name: string;
  permissions: Permission[];
}

export const AUTH_QUERY_KEY = ["user", "me"];

export const DUMMY_USER: User = {
  id: 1,
  name: "John Doe",
  permissions: [Permission.VIEW_POSTS, Permission.VIEW_COMMENTS],
};
