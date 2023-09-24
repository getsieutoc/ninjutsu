import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { NEXT_LOCALE } from './utils/constants';
import { i18n } from './configs/i18n.config';

const PUBLIC_FILE = /\.(.*)$/;
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

function getLocale(request: NextRequest): string | undefined {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => (headers[key] = value));

  const cookieValue = request.cookies.get(NEXT_LOCALE)?.value;

  if (cookieValue) {
    return cookieValue;
  }

  // If we dont have cookie value, try to get it from user's preferences
  const availableLocales = i18n.locales.map((locale) => locale.value);
  const acceptLanguages = new Negotiator({ headers: headers }).languages();

  const detectedLocale = match(
    acceptLanguages,
    availableLocales,
    i18n.defaultLocale
  );

  return detectedLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.search;

  //to take the files from the publisc folder
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return;
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    ({ value }) =>
      !pathname.startsWith(`/${value}/`) && pathname !== `/${value}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${
          pathname.startsWith('/') ? '' : '/'
        }${pathname}${searchParams}`,
        request.url
      )
    );
  }
}
