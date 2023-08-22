import { Flex } from '@chakra-ui/react';
import { ProfileMenu } from './ProfileMenu';
import { Logo } from './Logo';

import { NextLink } from '../NextLink';

export const Navbar = () => {
  return (
    <Flex as="header" justify="space-between" align="center">
      <Logo />

      <NextLink href="/protected">Protected</NextLink>

      <NextLink href="/server">Server</NextLink>

      <NextLink href="/admin">Admin</NextLink>
<<<<<<< HEAD
      <NextLink href="/pageposteditor">Pages</NextLink>
=======
      <NextLink href="/post/pageposteditor">Pages</NextLink>
>>>>>>> phuc-dev
      <ProfileMenu />
    </Flex>
  );
};
