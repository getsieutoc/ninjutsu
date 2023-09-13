'use client';

import { usePathname, useRouter } from 'next/navigation';

import { i18n, type Locale } from '@/configs/i18n.config';
import { Select } from '@/components/chakra';
import { redirectedPathName } from '@/utils/redirectedPathLocale';

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Select
      onChange={(e) => {
        const localeSelected = e.target.value as Locale;
        router.push(redirectedPathName(pathName, localeSelected));
      }}
      width="55px"
      size="xs"
      rounded={5}
      value={locale}
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
