import { Box, Flex } from '@/components/chakra';
import { SettingNav } from '@/components/client';
import type { ReactNode, Locale } from '@/types';

export default function EditPageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale; id: string };
}) {
  return (
    <Flex direction="column">
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

      <Box>{children}</Box>
    </Flex>
  );
}
