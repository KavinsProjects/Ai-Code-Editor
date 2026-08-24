import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // API authentication routes are always accessible
  if (isApiAuthRoute) {
    return null;
  }

  // Authentication routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
      );
    }

    return null;
  }

  // Protected routes
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(
      new URL("/auth/sign-in", nextUrl)
    );
  }

  return null;
});