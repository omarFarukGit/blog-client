import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/news", "/login", "/register"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1st way get access token
  const cookieStore = await cookies();
  // const accessToken=cookieStore.get('accessToken')?.value

  // 2nd way get access token
  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedToken = accessToken
    ? jwtUtils.verifiedToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      )
    : null;

  let userRole = null;
  if (!decodedToken?.success) {
    cookieStore.delete("accessToken");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (decodedToken?.success && decodedToken.data) {
    userRole = (decodedToken.data as JwtPayload).role;
  }

  //user is logged in
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  console.log(userRole, "userrole");

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  //auhenticated pages protection
  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   Authorizing Role Based Protected Routes In Proxy

  if (pathname.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/author-dashboard") &&
    userRole !== "AUTHOR"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/dashboard/:path*", "/author-dashboard/:path*"
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};
