import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  console.log("proxy");
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    // "/dashboard/:path*", "/author-dashboard/:path*"
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};
