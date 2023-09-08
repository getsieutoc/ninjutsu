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
import { ChevronDownIcon } from '@/icons';

import { NextImage } from '../../NextImage';
import { NextLink } from '../../NextLink';

import { LogoutButton } from './LogoutButton';
import { SetColorMode } from './SetColorMode';
import { getSession } from '@/utils/auth';

export const ProfileMenu = async () => {
  const session = await getSession();

  if (!session) {
    return <NextLink href="/login">Join Today!</NextLink>;
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
          <MenuItem
            as={NextLink}
            href="/me"
            _hover={{ textDecoration: 'none' }}
          >
            My Profile
          </MenuItem>

          <SetColorMode />

          <MenuDivider />
          <LogoutButton />
        </MenuList>
      </Portal>
    </Menu>
  );
};
