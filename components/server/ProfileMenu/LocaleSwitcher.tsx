'use client';
import { usePathname, useRouter } from 'next/navigation';

import { i18n, type Locale } from '@/configs/i18n.config';
import { Select } from '@/components/chakra';
import { redirectedPathName } from '@/utils/dictionary';
import { LOCALE_LOCAL } from '@/utils/constants';

type PropTypes = {
  locale: Locale;
};
export function LocaleSwitcher({ locale }: PropTypes) {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <Select
      onChange={(e) => {
        const locale = e.target.value;
        const path = redirectedPathName(locale, pathName);
        localStorage.setItem(LOCALE_LOCAL, locale);
        router.push(path);
      }}
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
