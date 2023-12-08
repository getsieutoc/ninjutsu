import { Box, Container, Flex } from '@/components/chakra';
import { ProfileMenu } from '@/components/server';
import { Navbar } from '@/components/client';
import { ReactNode } from '@/types';

export default async function CustomLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Flex direction="column">
      <Navbar>
        <ProfileMenu />
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
