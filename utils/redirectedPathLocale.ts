import { type Locale } from '@/configs/i18n.config';

export const redirectedPathName = (pathName: string, locale: Locale) => {
  if (!pathName) return '/';
  const segments = pathName.split('/');
  segments[1] = locale;
  return segments.join('/');
};
