import { LocaleSwitcher, Navbar } from '@/components/client';
import { Box, Container, Flex } from '@/components/chakra';
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
        <Flex gap={1} align="center">
          <LocaleSwitcher locale={params.locale} />
          <ProfileMenu />
        </Flex>
      </Navbar>

      <Container
        as={Box}
        maxW={{
          lg: 'container.lg',
          md: 'container.m',
          sm: 'container.sm',
          xl: 'container.xl',
        }}
      >
        {children}
      </Container>
    </Flex>
  );
}
