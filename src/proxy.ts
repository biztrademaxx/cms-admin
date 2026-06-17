import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const proxy = (request: NextRequest) => {
  const isLoggedIn = request.cookies.get("user")?.value === "true";
  const role = request.cookies.get("user_role")?.value;
  const pathname = request.nextUrl.pathname;

  if (!isLoggedIn && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isLoggedIn && pathname === "/signin") {
    const dest = role === "SALES" ? "/sales" : "/";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (isLoggedIn && role === "SALES") {
    const allowed =
      pathname.startsWith("/sales") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/projects/marketing/leads/");
    if (!allowed) {
      return NextResponse.redirect(new URL("/sales", request.url));
    }
  }

  if (isLoggedIn && role === "ADMIN" && pathname.startsWith("/sales")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|signin|public).*)",
  ],
};
