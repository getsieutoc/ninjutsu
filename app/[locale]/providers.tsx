'use client';
import { useEffect } from 'react';
import { Session } from 'next-auth';
import { CacheProvider } from '@chakra-ui/next-js';
import { SessionProvider } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { SWRConfig } from 'swr';

import { ChakraProvider } from '@/components/chakra';
import { theme, toastOptions } from '@/utils/chakra';
import { configs } from '@/utils/swr';
import { type Locale } from '@/configs/i18n.config';
import { redirectedPathName } from '@/utils/dictionary';
import { LOCALE_LOCAL } from '@/utils/constants';

export function Providers({
  children,
  session,
  locale,
}: {
  children: React.ReactNode;
  session: Session | null;
  locale: Locale;
}) {
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    const isClient = typeof window !== 'undefined';

    if (isClient) {
      const localeLocal = localStorage.getItem(LOCALE_LOCAL);

      if (session?.user) {
        // localStorage.setItem(LOCALE_LOCAL,session.user.locale)
      } else {
        const currentLocale = localeLocal ?? locale;
        localStorage.setItem(LOCALE_LOCAL, currentLocale);
        router.push(redirectedPathName(currentLocale, pathName));
      }
      // console.log(localeLocal);
      // console.log(directPath);
      // router.push(directPath);
      // console.log(session);
      // console.log(locale);
    }
  }, [session?.user, locale, pathName]);
  return (
    <SWRConfig value={configs}>
      <SessionProvider>
        <CacheProvider>
          <ChakraProvider
            theme={theme}
            toastOptions={{ defaultOptions: toastOptions }}
          >
            {children}
          </ChakraProvider>
        </CacheProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
