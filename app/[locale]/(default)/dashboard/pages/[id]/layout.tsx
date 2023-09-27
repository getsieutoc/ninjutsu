import { GoBackButton, SettingNav } from '@/components/client';
import { Box, Flex } from '@/components/chakra';
import type { ReactNode, Locale } from '@/types';

import { Translations } from '../components';
import { getPage } from '@/services/pages';

export default async function EditPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale; id: string };
}) {
  const page = await getPage({ where: { id: params.id } });

  return (
    <Flex direction="column" gap={2}>
      <Flex direction="row" align="center" justify="space-between">
        <GoBackButton path="/dashboard/pages">Back to Pages</GoBackButton>

        {page && <Translations data={page} />}
      </Flex>

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
