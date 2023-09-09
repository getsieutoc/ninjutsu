'use client';

import { Flex, Stack, useColorModeValue } from '@/components/chakra';
import { ReactNode } from '@/types';
import { NextLink } from '../NextLink';
import { Logo } from '../Logo';

export const Navbar = ({ children }: { children: ReactNode }) => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      bg={backgroundColor}
    >
      <Flex align="center" gap={10}>
        <Logo />

        <Stack direction="row" spacing={3}>
          <NextLink href="/protected">Protected</NextLink>
          <NextLink href="/about-us">About us</NextLink>
          <NextLink href="/blog">Blogs</NextLink>
        </Stack>
      </Flex>

      {children}
    </Flex>
  );
};
