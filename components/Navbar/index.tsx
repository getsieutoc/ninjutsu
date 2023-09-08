import { Flex } from '@chakra-ui/react';
import { ProfileMenu } from './ProfileMenu';
import { Logo } from './Logo';

import { NextLink } from '../NextLink';

export const Navbar = () => {
  return (
    <Flex as="header" justify="space-between" align="center">
      <Logo />

      <NextLink href="/home">Home</NextLink>

      <NextLink href="/about-us">About us</NextLink>

      <NextLink href="/blog">Blogs</NextLink>
      <ProfileMenu />
    </Flex>
  );
};
