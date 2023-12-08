import { GoBackButton, SettingNav } from '@/components/client';
import { Box, Flex } from '@/components/chakra';
import { getPage } from '@/services/pages';
import { ReactNode } from '@/types';

export default async function EditPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const page = await getPage({ where: { id: params.id } });

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
