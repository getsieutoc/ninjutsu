import { GoBackButton, SettingNav } from '@/components/client';
import { Box, Flex } from '@/components/chakra';
import type { ReactNode, Locale } from '@/types';

export default function NewPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale; id: string };
}) {
  return (
    <Flex direction="column" gap={2}>
      <Flex direction="row" align="center" justify="space-between">
        <GoBackButton path="/dashboard/pages">Back to Pages</GoBackButton>
      </Flex>

      <SettingNav
        baseUrl={`/${params.locale}/dashboard/pages`}
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
