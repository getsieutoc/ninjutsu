export const IS_VERCEL = !!process.env.VERCEL;
export const SESSION_NAME = `${IS_VERCEL ? '__Secure-' : ''}next-auth.session-token`;

export const getCookieDomain = () => {
  if (IS_VERCEL && process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return `.${process.env.SITE_DOMAIN}`;
  }

  return undefined;
};

export const COOKIE_DOMAIN = getCookieDomain();
