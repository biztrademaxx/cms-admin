import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const proxy = (request: NextRequest) => {
  const userCookie = request.cookies.get("user");
  const isLoggedIn = userCookie?.value === "true";
  const pathname = request.nextUrl.pathname;

  // If NOT logged in → redirect to /signin
  if (!isLoggedIn && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If logged in → prevent accessing /signin
  if (isLoggedIn && pathname === "/signin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue normally
  return NextResponse.next();
};

// Next.js 16 proxy matcher
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|signin|public).*)",
  ],
};
