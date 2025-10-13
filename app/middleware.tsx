// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    console.log("herre");
    return NextResponse.redirect(new URL('/login', request.url));
  }
    console.log("herr1");


  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // protect these routes
};
