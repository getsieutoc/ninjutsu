import { LocaleSwitcher, Sidebar } from '@/components/client';
import { ProfileMenu } from '@/components/server';
import { Box, Flex } from '@/components/chakra';
import type { ReactNode, Locale } from '@/types';

export default function DefaultLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  return (
    <Flex>
      <Sidebar>
        <Flex gap={1} align="center">
          <LocaleSwitcher locale={params.locale} />
          <ProfileMenu />
        </Flex>
      </Sidebar>

      <Box padding={6} width="100%" height="100vh" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}
