import { LocaleSwitcher, Navbar } from '@/components/client';
import { Box, Flex } from '@/components/chakra';
import { ProfileMenu } from '@/components/server';
import type { ReactNode } from '@/types';
import type { Locale } from '@/configs/i18n.config';

export default function CustomLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  return (
    <Flex direction="column">
      <Navbar>
        <Flex gap={1}>
          <LocaleSwitcher locale={params.locale} />
          <ProfileMenu />
        </Flex>
      </Navbar>

      <Box padding={6} width="100%" height="100vh" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}
