import { NextResponse } from 'next/server';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  SUPPORTED_LOCALES,
} from '@/i18n/config';

const REFRESH_TOKEN_COOKIE = 'refresh_token';
const PUBLIC_PREFIXES = ['/api', '/mock', '/_next', '/favicon.ico'];
const JOIN_PATH_REGEX = /^\/workspace\/[^/]+\/join/;
const PROTECTED_PREFIXES = ['/workspace', '/me'];
const LOCALE_PREFIX_REGEX = new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})(/|$)`, 'i');

const shouldHandleLocale = (pathname) =>
  !PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));

const extractLocaleFromPath = (pathname = '') => {
  const match = pathname.match(LOCALE_PREFIX_REGEX);
  if (!match) {
    return { locale: null, pathnameWithoutLocale: pathname || '/' };
  }

  const locale = match[1];
  const rest = pathname.slice(locale.length + 1);
  return {
    locale: locale.toLowerCase(),
    pathnameWithoutLocale: rest ? `/${rest}` : '/',
  };
};

const parsePreferredLocale = (request) => {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const match = acceptLanguage
      .split(',')
      .map((part) => part.split(';')[0].trim().toLowerCase())
      .find((lang) => {
        const base = lang.includes('-') ? lang.split('-')[0] : lang;
        return SUPPORTED_LOCALES.includes(base);
      });

    if (match) {
      return match.includes('-') ? match.split('-')[0] : match;
    }
  }

  return DEFAULT_LOCALE;
};

const ensureLocaleCookie = (response, locale) => {
  if (!locale) {
    return response;
  }

  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax',
  });

  return response;
};

const hasRefreshToken = (request) => Boolean(request.cookies.get(REFRESH_TOKEN_COOKIE));
const isPublicRequest = (pathname) =>
  PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
const isProtected = (pathname) =>
  PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const { locale: pathLocale, pathnameWithoutLocale } = extractLocaleFromPath(pathname);
  const normalizedPathname = pathnameWithoutLocale || '/';
  const refreshToken = hasRefreshToken(request);
  const preferredLocale = parsePreferredLocale(request);
  const activeLocale = pathLocale ?? preferredLocale;
  const localeAware = shouldHandleLocale(pathname);

  if (isPublicRequest(normalizedPathname)) {
    return localeAware
      ? ensureLocaleCookie(NextResponse.next(), activeLocale)
      : NextResponse.next();
  }

  if (normalizedPathname === '/login') {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/workspace', request.url));
    }
    return finalizeResponse({
      request,
      pathname,
      pathLocale,
      activeLocale,
      localeAware,
    });
  }

  if (!refreshToken) {
    if (normalizedPathname === '/workspace') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (JOIN_PATH_REGEX.test(normalizedPathname)) {
      return finalizeResponse({
        request,
        pathname,
        pathLocale,
        activeLocale,
        localeAware,
      });
    }
    if (isProtected(normalizedPathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return finalizeResponse({
    request,
    pathname,
    pathLocale,
    activeLocale,
    localeAware,
  });
}

const finalizeResponse = ({ request, pathname, pathLocale, activeLocale, localeAware }) => {
  let response;
  if (localeAware && !pathLocale) {
    const rewriteUrl = request.nextUrl.clone();
    const suffix = pathname === '/' ? '' : pathname;
    rewriteUrl.pathname = `/${activeLocale}${suffix}`;
    response = NextResponse.rewrite(rewriteUrl);
  } else {
    response = NextResponse.next();
  }

  if (localeAware) {
    ensureLocaleCookie(response, pathLocale ?? activeLocale);
  }

  return response;
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
