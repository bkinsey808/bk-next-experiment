"use server";

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  console.log("Middleware", pathname);
  console.log(request.method);
  console.log(request.url);

  const origin = request.headers.get("origin");
  console.log(origin);
  // Display the key/value pairs
  // for (const pair of request.headers.entries()) {
  //   console.log(`${pair[0]}: ${pair[1]}`);
  // }

  return NextResponse.next();
}
