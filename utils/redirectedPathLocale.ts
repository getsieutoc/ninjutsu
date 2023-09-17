import { i18n } from '@/configs/i18n.config';
import { Locale } from '@/types';

export const redirectedPathName = (pathName: string, locale: Locale) => {
  if (!pathName) return '/';

  const segments = pathName.split('/');

  const check = i18n.locales.find(({ value }) => value === segments?.[1]);

  if (!check) return '';

  segments[1] = locale;

  return segments.join('/');
};
