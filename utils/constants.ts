export const MIN_PASSWORD_LENGTH = 8;
export const ROW_HEIGHT = 53;
export const JWT_MAX_AGE = 60 * 60 * 24 * 7;

export const SITE_DOMAIN = process.env.SITE_DOMAIN ?? '';

export const IS_PRODUCTION =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
export const IS_VERCEL = !!process.env.VERCEL;

export const SESSION_NAME = `${
  IS_VERCEL ? '__Secure-' : ''
}next-auth.session-token`;

export const getCookieDomain = () => {
  if (IS_VERCEL && IS_PRODUCTION) {
    return `.${process.env.SITE_DOMAIN}`;
  }

  return undefined;
};

export const COOKIE_DOMAIN = getCookieDomain();

export function getSiteUrl() {
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_BRANCH_URL) {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }

  if (IS_PRODUCTION) {
    return `https://${SITE_DOMAIN}`;
  }

  return 'http://localhost:3000';
}
export const LOCALE_LOCAL = 'locale-local';
