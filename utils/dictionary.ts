import 'server-only';

import { i18n } from '@/configs/i18n.config';
import { Locale } from '@/types';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  vi: () => import('@/dictionaries/vi.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (dictionaries[locale]) {
    return dictionaries[locale]();
  }
  return dictionaries[i18n.defaultLocale]();
};
