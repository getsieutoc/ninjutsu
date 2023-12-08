import { GoBackButton, SettingNav } from '@/components/client';
import { Box, Flex } from '@/components/chakra';
import { ReactNode } from '@/types';

export default function NewPageLayout({ children }: { children: ReactNode }) {
  return (
    <Flex direction="column" gap={2}>
      <Flex direction="row" align="center" justify="space-between">
        <GoBackButton path="/dashboard/pages">Back to Pages</GoBackButton>
      </Flex>

      <SettingNav
        baseUrl="/dashboard/pages"
        nav={[
          {
            name: 'General',
            path: '/new',
          },
          {
            name: 'Advanced',
            path: null,
          },
        ]}
      />

      <Box padding={4}>{children}</Box>
    </Flex>
  );
}
