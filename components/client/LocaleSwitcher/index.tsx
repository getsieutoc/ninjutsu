import {
  useAuth,
  useCookies,
  useEffect,
  useLocale,
  usePathname,
  useRouter,
} from '@/hooks';
import { redirectedPathName } from '@/utils/redirectedPathLocale';
import { NEXT_LOCALE } from '@/utils/constants';
import { i18n } from '@/configs/i18n.config';
import { Select } from '@/components/chakra';
import { HttpMethod, Locale } from '@/types';

export function LocaleSwitcher() {
  const cookies = useCookies();
  const router = useRouter();
  const pathName = usePathname();

  const { session } = useAuth();
  const { currentLocale } = useLocale();

  useEffect(() => {
    const cookieLocale = cookies.get(NEXT_LOCALE);
    if (currentLocale !== cookieLocale) {
      cookies.set(NEXT_LOCALE, currentLocale);
    }
  }, [cookies, currentLocale]);

  const handleChangeLocale = async (localeSelected: Locale) => {
    const userID = session?.user.id;

    cookies.set(NEXT_LOCALE, localeSelected);

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
  };

  return (
    <Select
      name="locale-switcher" // Do not delete it
      onChange={(e) => handleChangeLocale(e.target.value as Locale)}
      width="65px"
      size="xs"
      rounded={5}
      value={currentLocale}
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
