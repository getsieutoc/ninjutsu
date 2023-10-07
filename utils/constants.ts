export const NEXT_LOCALE = 'NEXT_LOCALE';
export const MIN_PASSWORD_LENGTH = 8;
export const ROW_HEIGHT = 53;
export const JWT_MAX_AGE = 60 * 60 * 24 * 7;
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const IS_VERCEL = !!process.env.VERCEL;

export const SITE_URL = IS_VERCEL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXTAUTH_URL;

// Note: For server side
export function getSiteUrl() {
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_BRANCH_URL) {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }

  if (IS_PRODUCTION) {
    return SITE_URL;
  }

  return 'http://localhost:3000';
}

export const HOUR_MAX_CONFIRM = 24;
