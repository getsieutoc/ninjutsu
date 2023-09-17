'use client';

import { redirectedPathName } from '@/utils/redirectedPathLocale';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Select } from '@/components/chakra';
import { updateUser } from '@/services/users';
import { i18n } from '@/configs/i18n.config';
import { useAuth } from '@/hooks';
import { Locale } from '@/types';

export type LocaleSwitcherProps = {
  locale: Locale;
};

export const LocaleSwitcher = ({ locale }: LocaleSwitcherProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { session } = useAuth();

  const handleChangeLocale = async (localeSelected: Locale) => {
    const userID = session?.user.id;
    if (!userID) return;

    await updateUser(session.user.id, {
      preferences: { locale: localeSelected },
    });

    router.push(redirectedPathName(pathName, localeSelected));
  };
  return (
    <Box>
      <Select
        name="locale-switcher"
        size="sm"
        rounded={5}
        value={locale}
        onChange={(e) => handleChangeLocale(e.target.value as Locale)}
      >
        {i18n.locales.map(({ label, value }, index) => {
          return (
            <option key={value + index} value={value}>
              {label}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};
