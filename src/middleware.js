import { NextResponse } from 'next/server';

const REFRESH_TOKEN_COOKIE = 'refresh_token';
const PUBLIC_PREFIXES = ['/api', '/mock', '/_next', '/favicon.ico'];
const JOIN_PATH_REGEX = /^\/workspace\/[^\/]+\/join/;
const PROTECTED_PREFIXES = ['/workspace', '/me'];

function hasRefreshToken(request) {
  return Boolean(request.cookies.get(REFRESH_TOKEN_COOKIE));
}

function isPublicRequest(pathname) {
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isProtected(pathname) {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const refreshToken = hasRefreshToken(request);

  if (isPublicRequest(pathname)) {
    return NextResponse.next();
  }

  if (pathname === '/login') {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/workspace', request.url));
    }
    return NextResponse.next();
  }

  if (!refreshToken) {
    if (pathname === '/workspace') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (JOIN_PATH_REGEX.test(pathname)) {
      return NextResponse.next();
    }
    if (isProtected(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname === '/workspace' && refreshToken) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
