'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

import { ChakraProvider } from '@/components/chakra';
import { theme, toastOptions } from '@/utils/chakra';
import { configs } from '@/utils/swr';

export function Providers({ children }: { children: React.ReactNode }) {
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
