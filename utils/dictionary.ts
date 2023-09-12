// import 'server-only';
import type { Locale } from '@/configs/i18n.config';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  vi: () => import('@/dictionaries/vi.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
export const redirectedPathName = (locale: string, pathName: string) => {
  if (!pathName) return '/';
  const segments = pathName.split('/');
  segments[1] = locale;
  return segments.join('/');
};
