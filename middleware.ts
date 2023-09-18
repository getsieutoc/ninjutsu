import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { i18n } from './configs/i18n.config';
import { LOCALE } from './utils/constants';

const PUBLIC_FILE = /\.(.*)$/;
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const cookieValue = request.cookies.get(LOCALE)?.value;
  const defaultLocale = cookieValue ?? i18n.defaultLocale;

  const locales = i18n.locales.map((locale) => locale.value);

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = matchLocale(languages, locales, defaultLocale);

  return locale;
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

  const defaultLocale =
    request.cookies.get(LOCALE)?.value ?? i18n.defaultLocale;

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
