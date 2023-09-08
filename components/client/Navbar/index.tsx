'use client';

import { Flex } from '@/components/chakra';
import { ReactNode } from '@/types';

import { NextLink } from '../../NextLink';

import { Logo } from './Logo';

export const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <Flex as="header" justify="space-between" align="center">
      <Logo />

      <NextLink href="/protected">Protected</NextLink>

      <NextLink href="/about-us">About us</NextLink>

      <NextLink href="/blog">Blogs</NextLink>

      {children}
    </Flex>
  );
};
