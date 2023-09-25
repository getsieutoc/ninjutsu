import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from '@/components/chakra';
import { NextImage, NextLink } from '@/components/client';
import { ChevronDownIcon } from '@/icons';
import { getSession } from '@/configs/auth';

import { LogoutButton } from './LogoutButton';
import { SetColorMode } from './SetColorMode';

export const ProfileMenu = async () => {
  const session = await getSession();

  if (!session) {
    return (
      <Button
        as={NextLink}
        href="/login"
        variant="ghost"
        size="sm"
        colorScheme="green"
      >
        Login / Sign up
      </Button>
    );
  }

  return (
    <Menu>
      <MenuButton
        size="sm"
        variant="ghost"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        <HStack>
          {session?.user && session.user.image && (
            <NextImage
              alt={session?.user.name ?? 'No name'}
              src={session?.user.image}
              borderRadius="full"
              height={4}
              width={4}
            />
          )}
          <Text>{session?.user.name ?? 'No name'}</Text>
        </HStack>
      </MenuButton>
      <Portal>
        <MenuList zIndex={9}>
          <NextLink href="/dashboard">
            <MenuItem>Dashboard</MenuItem>
          </NextLink>

          <NextLink href="/settings">
            <MenuItem>Settings</MenuItem>
          </NextLink>

          <SetColorMode />

          <MenuDivider />
          <LogoutButton />
        </MenuList>
      </Portal>
    </Menu>
  );
};
