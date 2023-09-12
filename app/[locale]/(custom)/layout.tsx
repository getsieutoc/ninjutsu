import { Box, Flex, HStack } from '@/components/chakra';
import { Navbar } from '@/components/client';
import { LocaleSwitcher, ProfileMenu } from '@/components/server';
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
        <HStack spacing={1}>
          <Box>
            <LocaleSwitcher locale={params.locale} />
          </Box>
          <Box>
            <ProfileMenu />
          </Box>
        </HStack>
      </Navbar>

      <Box padding={6} width="100%" height="100vh" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}
