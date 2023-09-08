import { Flex } from '@/components/chakra';

import { NextLink } from '../../NextLink';
import { ProfileMenu } from '../ProfileMenu';

import { Logo } from './Logo';

export const Navbar = () => {
  return (
    <Flex as="header" justify="space-between" align="center">
      <Logo />

      <NextLink href="/protected">Protected</NextLink>

      <NextLink href="/about-us">About us</NextLink>

      <NextLink href="/blog">Blogs</NextLink>

      <ProfileMenu />
    </Flex>
  );
};
