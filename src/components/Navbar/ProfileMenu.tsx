import {
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { ChevronDownIcon } from '@/icons';
import { useAuth } from '@/hooks';

import { NextImage } from '../NextImage';
import { NextLink } from '../NextLink';

export const ProfileMenu = () => {
  const { session, isAuthenticated } = useAuth();

  const { colorMode, setColorMode } = useColorMode();

  const handleToggleDarkMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  if (!isAuthenticated) {
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
          <MenuItem closeOnSelect={false} onClick={handleToggleDarkMode}>
            <Flex width="100%" justify="space-between" align="center">
              <Text>Dark mode</Text>
              <Switch
                colorScheme="purple"
                isChecked={colorMode === 'dark'}
                onChange={(e) =>
                  setColorMode(e.target.checked ? 'light' : 'dark')
                }
              />
            </Flex>
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
