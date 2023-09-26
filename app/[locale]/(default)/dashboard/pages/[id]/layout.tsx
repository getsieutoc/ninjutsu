import { Box, Button, Flex, Heading, Stack } from '@/components/chakra';
import { GoBackButton, SettingNav } from '@/components/client';
import type { ReactNode, Locale } from '@/types';

export default function EditPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale; id: string };
}) {
  return (
    <Flex direction="column" gap={2}>
      <Stack direction="row" align="center">
        <GoBackButton path="/dashboard/pages" />

        <Heading as="h3" size="lg" color="gray">
          Edit Page
        </Heading>
      </Stack>

      <SettingNav
        baseUrl={`/${params.locale}/dashboard/pages`}
        nav={[
          {
            name: 'General',
            path: `/${params.id}`,
          },
          {
            name: 'Advanced',
            path: `/${params.id}/advanced`,
          },
        ]}
      />

      <Box padding={4}>{children}</Box>
    </Flex>
  );
}
