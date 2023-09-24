'use client';

import { i18n } from '@/configs/i18n.config';
import { HttpMethod, Locale } from '@/types';
import { Select } from '@/components/chakra';
import { redirectedPathName } from '@/utils/redirectedPathLocale';
import {
  useAuth,
  useCallback,
  useCookies,
  usePathname,
  useRouter,
} from '@/hooks';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathName = usePathname();

  const { session } = useAuth();

  const cookies = useCookies();
  const cookieLocale = cookies.get('NEXT_LOCALE') ?? i18n.defaultLocale;

  const handleChangeLocale = useCallback(
    async (localeSelected: Locale) => {
      const userID = session?.user.id;

      cookies.set('NEXT_LOCALE', localeSelected);

      // store to database
      if (userID) {
        await fetch(`/api/users/${userID}`, {
          method: HttpMethod.PATCH,
          body: JSON.stringify({
            preferences: { locale: localeSelected },
          }),
        });
      }

      router.refresh();

      router.push(redirectedPathName(pathName, localeSelected));
    },
    [cookies, pathName, router, session]
  );

  return (
    <Select
      onChange={async (e) => await handleChangeLocale(e.target.value as Locale)}
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
