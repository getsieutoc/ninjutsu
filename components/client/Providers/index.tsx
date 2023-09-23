'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { SessionProvider } from 'next-auth/react';
import { Provider as JotaiProvider } from 'jotai';
import { SWRConfig } from 'swr';

import { ChakraProvider } from '@/components/chakra';
import { theme, toastOptions } from '@/configs/chakra';
import { configs } from '@/configs/swr';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={configs}>
      <SessionProvider>
        <JotaiProvider>
          <CacheProvider>
            <ChakraProvider
              theme={theme}
              toastOptions={{ defaultOptions: toastOptions }}
            >
              {children}
            </ChakraProvider>
          </CacheProvider>
        </JotaiProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
