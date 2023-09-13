'use client';

import { usePathname, useRouter } from 'next/navigation';

import { i18n, type Locale } from '@/configs/i18n.config';
import { Select } from '@/components/chakra';
import { redirectedPathName } from '@/utils/redirectedPathLocale';
import { useAuth, useToast } from '@/hooks';
import { httpClient } from '@/utils/httpClient';

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const toast = useToast();
  const pathName = usePathname();
  const { session } = useAuth();

  const handleChangeLocale = async (localeSelected: Locale) => {
    const userID = session?.user.id;
    if (!userID) return;
    // setIsLoading(true);

    const { status, statusText } = await fetch('/api/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        preferences: {
          locale: localeSelected,
        },
        id: userID,
      }),
    });

    if (status === 200) {
      toast({
        status: 'success',
        title: 'Successfully',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      router.refresh();
    } else {
      toast({
        status: 'error',
        description: statusText,
        duration: 3000,
        isClosable: true,
      });
    }
    // setIsLoading(false);
    router.push(redirectedPathName(pathName, localeSelected));
  };
  return (
    <Select
      onChange={(e) => handleChangeLocale(e.target.value as Locale)}
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
