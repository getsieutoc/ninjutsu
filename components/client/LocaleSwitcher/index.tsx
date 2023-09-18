'use client';

import { Prisma } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import { i18n } from '@/configs/i18n.config';
import type { Locale } from '@/types';
import { Select } from '@/components/chakra';
import { redirectedPathName } from '@/utils/redirectedPathLocale';
import { useAuth } from '@/hooks';
import { updateUser } from '@/services/users';
import { LOCALE } from '@/utils/constants';

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathName = usePathname();
  const cookies = useCookies();
  const { session, update } = useAuth();
  const locale = cookies.get(LOCALE);
  const handleChangeLocale = async (localeSelected: Locale) => {
    const userID = session?.user.id;
    cookies.set(LOCALE, localeSelected);
    // store to database
    if (userID) {
      const result = await updateUser(userID, {
        preferences: { locale: localeSelected },
      });

      // store to session local
      if (result) {
        update({
          user: {
            ...session?.user,
            preferences: {
              ...session.user.preferences,
              ...(result.preferences as Prisma.JsonObject),
            },
          },
        });
      }
    }

    router.push(redirectedPathName(pathName, localeSelected));
  };
  return (
    <Select
      onChange={(e) => handleChangeLocale(e.target.value as Locale)}
      width="65px"
      size="xs"
      rounded={5}
      // value={locale}
    >
      {i18n.locales.map((locale, index) => {
        return (
          <option key={locale.value + index} value={locale.value}>
            {locale.value}
          </option>
        );
      })}
    </Select>
  );
}
