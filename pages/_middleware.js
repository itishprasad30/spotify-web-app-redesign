import { getToken } from "next-auth/jwt";

import { NextResponse } from "next/server";

export async function middleware(req) {
  //Token will exist if the user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  //Allow the request if the following is true

  // 1) the token exists
  // 2) its a request for the next-auth session & provider fetching
  if (pathname.includes("/api/auth/") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
