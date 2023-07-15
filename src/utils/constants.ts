export const IS_VERCEL = !!process.env.VERCEL_URL;
export const SESSION_NAME = `${IS_VERCEL ? '__Secure-' : ''}next-auth.session-token`;

export const getCookieDomain = () => {
  if (IS_VERCEL && process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return '.booksao.com';
  }

  return undefined;
};

export const COOKIE_DOMAIN = getCookieDomain();
