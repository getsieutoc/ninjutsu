'use client';

import { usePathname, useRouter } from 'next/navigation';

import { i18n, type Locale } from '@/configs/i18n.config';
import { Select } from '@/components/chakra';

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    const path = segments.join('/');
    router.push(path);
  };

  return (
    <Select
      name="locale-switcher"
      onChange={(e) => redirectedPathName(e.target.value)}
      width="55px"
      size="xs"
      rounded={5}
      defaultValue={locale}
    >
      {i18n.locales.map((locale, index) => {
        return (
          <option key={locale + index} value={locale}>
            {locale}
          </option>
        );
      })}
    </Select>
  );
}
