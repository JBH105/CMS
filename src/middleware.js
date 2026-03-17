import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||  
    pathname.startsWith('/api') ||
    pathname.match(/\.(.*)$/)          
  ) {
    return NextResponse.next();
  }

  if (pathname === '/login') {
    return NextResponse.next();
  }

  const role = request.cookies.get('role')?.value;

  if (!role) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/companines') && role !== 'company') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/companines/:path*',
  ],
};