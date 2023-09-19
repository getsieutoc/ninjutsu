import { redirect } from 'next/navigation';
import { Flex, Heading, Spacer } from '@/components/chakra';
import { AddNewButton } from '@/components/client';
import { prisma } from '@/utils/prisma';
import { PageTable } from './components';
import { getSession } from '@/utils/auth';

export default async function PagesDashboard() {
  const session = await getSession();

  if (!session?.user.id) {
    redirect('/login');
  }
  const pages = await prisma.page.findMany({
    include: { author: true },
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
