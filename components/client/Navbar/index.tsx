'use client';

import { Container, Flex, Stack, useColorModeValue } from '@/components/chakra';
import { ReactNode } from '@/types';
import { NextLink } from '../NextLink';
import { Logo } from '../Logo';

export const Navbar = ({ children }: { children: ReactNode }) => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex as="header" bg={backgroundColor}>
      <Container
        as={Flex}
        justify="space-between"
        align="center"
        maxW={{
          lg: 'container.lg',
          md: 'container.m',
          sm: 'container.sm',
          xl: 'container.xl',
        }}
      >
        <Flex align="center" gap={16}>
          <Logo />

          <Stack direction="row" spacing={8}>
            <NextLink href="/protected">Protected</NextLink>
            <NextLink href="/about-us">About us</NextLink>
            <NextLink href="/blog">Blogs</NextLink>
          </Stack>
        </Flex>

        {children}
      </Container>
    </Flex>
  );
};
