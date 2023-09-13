'use client';

import {
  Flex,
  MenuItem,
  Switch,
  Text,
  useColorMode,
} from '@/components/chakra';

export const SetColorMode = () => {
  const { colorMode, setColorMode } = useColorMode();

  const handleToggleDarkMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <MenuItem closeOnSelect={false} onClick={handleToggleDarkMode}>
      <Flex width="100%" justify="space-between" align="center">
        <Text>Dark mode</Text>
        <Switch
          name="color-mode-switch"
          colorScheme="purple"
          isChecked={colorMode === 'dark'}
          onChange={(e) => setColorMode(e.target.checked ? 'light' : 'dark')}
        />
      </Flex>
    </MenuItem>
  );
};
