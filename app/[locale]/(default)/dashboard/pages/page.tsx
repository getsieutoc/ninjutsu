import { Flex, Heading, Spacer } from '@/components/chakra';
import { AddNewButton } from '@/components/client';
import { queryPages } from '@/services/pages';
import { getSession } from '@/configs/auth';
import { redirect } from 'next/navigation';
import { Locale } from '@/types';

import { PageTable } from './components';

export default async function PagesDashboard({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const pages = await queryPages({
    where: { locale },
  });

  return (
    <Flex direction="column">
      <Flex justify="space-between" align="center" width="100%">
        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Pages
        </Heading>

        <AddNewButton title="Add New Page" />
      </Flex>

      <Spacer />

      <PageTable data={pages} />
    </Flex>
  );
}
