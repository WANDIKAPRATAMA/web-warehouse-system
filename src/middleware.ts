import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
const restrictedPaths = ["/dashboard/internal"];
const nextAuthMiddleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const url = req.nextUrl;
    const isAuthenticated = !!token;
    console.log("🚀 ~ middleware ~ isAuthenticated:", isAuthenticated);
    const { pathname } = url;

    if (
      isAuthenticated &&
      (pathname === "/auth/signin" || pathname === "/auth/signup")
    ) {
      console.log(
        "Redirecting authenticated user from",
        pathname,
        "to /dashboard"
      );
      return NextResponse.redirect(new URL("/dashboard/", req.url));
    }

    if (!isAuthenticated && pathname.startsWith("/dashboard")) {
      console.log(
        "Redirecting unauthenticated user from",
        pathname,
        "to /signin"
      );
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    const isRestrictedPath = restrictedPaths.some((path) =>
      pathname.includes(path)
    );
    if (isRestrictedPath) {
      if (token?.user?.role === "user") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      console.log("Allowing admin role access to", pathname);
    }

    // if (pathname.match(/^\/dashboard\/novels\/[^/]+\/repository$/)) {
    //   if (token?.user?.role !== "user" && token?.user?.role !== "creator") {
    //     console.log(
    //       "Redirecting non-user role",
    //       token?.user?.role,
    //       "from",
    //       pathname,
    //       "to /dashboard"
    //     );
    //     return NextResponse.redirect(new URL("/dashboard/todos", req.url));
    //   }
    // }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export default nextAuthMiddleware;

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
