'use client';

import { i18n } from '@/configs/i18n.config';
import type { Locale } from '@/types';
import { Select } from '@/components/chakra';
import { redirectedPathName } from '@/utils/redirectedPathLocale';
import { useAuth, useCookies, usePathname, useRouter } from '@/hooks';
import { updateUser } from '@/services/users';
import { Prisma } from '@prisma/client';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathName = usePathname();

  const { session, update } = useAuth();

  const cookies = useCookies();
  const cookieLocale = cookies.get('NEXT_LOCALE');

  const handleChangeLocale = async (localeSelected: Locale) => {
    const userID = session?.user.id;

    cookies.set('NEXT_LOCALE', localeSelected);

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

    router.refresh();

    router.push(redirectedPathName(pathName, localeSelected));
  };
  return (
    <Select
      onChange={(e) => handleChangeLocale(e.target.value as Locale)}
      width="65px"
      size="xs"
      rounded={5}
      value={cookieLocale}
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
