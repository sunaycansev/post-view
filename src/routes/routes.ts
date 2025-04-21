import { ComponentType } from "react";
import { Dashboard } from "@/pages/Dashboard";
import { AccessDenied } from "@/pages/AccessDenied";
import { Permission } from "@/constants";
import { Login } from "@/pages/Login";
import { Posts } from "@/pages/Posts";

export interface Route {
  name: string;
  path: string;
  renderer: ComponentType;
  isPrivate?: boolean;
  permissions?: Permission[];
  translations?: string[];
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
    name: "accessDenied",
    path: "/access-denied",
    renderer: AccessDenied,
    isPrivate: false,
    translations: ["accessDenied"],
  },
];

export default routes;
