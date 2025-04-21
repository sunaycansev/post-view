import { ComponentType } from "react";
import { Dashboard } from "@/pages/Dashboard";
import { AccessDenied } from "@/pages/AccessDenied";
import { Permission } from "@/constants";
import { Login } from "@/pages/Login";
import { Posts } from "@/pages/Posts";
import { SinglePostPage } from "@/pages/SinglePostPage";
import { EditPostTab } from "@/pages/EditPostTab";
import { PostCommentsTab } from "@/pages/PostCommentsTab";
import { CreatePostPage } from "@/pages/CreatePostPage";

export interface Route {
  name: string;
  path: string;
  renderer: ComponentType;
  isPrivate?: boolean;
  permissions?: Permission[];
  translations?: string[];
  children?: Route[];
}

export const routes: Route[] = [
  {
    name: "login",
    path: "/login",
    renderer: Login,
    isPrivate: false,
    translations: ["login"],
  },
  {
    name: "dashboard",
    path: "/",
    renderer: Dashboard,
    isPrivate: true,
    permissions: [Permission.VIEW_POSTS, Permission.VIEW_COMMENTS],
    translations: ["dashboard"],
  },
  {
    name: "posts",
    path: "/posts",
    renderer: Posts,
    isPrivate: true,
    permissions: [Permission.VIEW_POSTS],
    translations: ["posts"],
  },
  {
    name: "singlePost",
    path: "/posts/:id",
    renderer: SinglePostPage,
    isPrivate: true,
    permissions: [Permission.VIEW_POSTS],
    translations: ["post"],
  },
  {
    name: "editPost",
    path: "/posts/:id/edit",
    renderer: EditPostTab,
    isPrivate: true,
    permissions: [Permission.EDIT_POST],
    translations: ["postEdit"],
  },
  {
    name: "postComments",
    path: "/posts/:id/comments",
    renderer: PostCommentsTab,
    isPrivate: true,
    permissions: [Permission.VIEW_COMMENTS],
    translations: ["postComments"],
  },
  {
    name: "createPost",
    path: "/posts/create",
    renderer: CreatePostPage,
    isPrivate: true,
    permissions: [Permission.CREATE_POST],
    translations: ["postCreate"],
  },
  {
    name: "accessDenied",
    path: "/access-denied",
    renderer: AccessDenied,
    isPrivate: false,
    translations: ["accessDenied"],
  },
];

export default routes;
