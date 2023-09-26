import { Button, Divider, Flex, Stack } from '@/components/chakra';
import { usePathname } from '@/hooks';

import { NextLink } from '../NextLink';

export type SettingNavProps = {
  baseUrl: string;
  nav: {
    name: string;
    path: string;
  }[];
};

export const SettingNav = ({ baseUrl, nav }: SettingNavProps) => {
  const pathname = usePathname();

  return (
    <Flex direction="column">
      <Stack direction="row" spacing={0} marginBottom="-2px">
        {nav.map(({ name, path }) => (
          <Button
            key={name}
            variant="ghost"
            as={NextLink}
            href={`${baseUrl}${path}`}
            borderBottomWidth="2px"
            borderBottomStyle="solid"
            borderBottomColor={
              pathname.endsWith(path) ? 'green' : 'transparent'
            }
            borderRadius={0}
            color={pathname.endsWith(path) ? 'green' : 'gray'}
          >
            {name}
          </Button>
        ))}
      </Stack>

      <Divider borderWidth="1px" />
    </Flex>
  );
};
