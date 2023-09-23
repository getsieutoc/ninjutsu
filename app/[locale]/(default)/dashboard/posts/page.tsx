import { redirect } from 'next/navigation';
import { Flex, Heading, Spacer } from '@/components/chakra';
import { AddNewButton } from '@/components/client';
import { prisma } from '@/configs/prisma';
import { Locale } from '@/types';

import { PostTable } from './components';
import { getSession } from '@/configs/auth';

export default async function PostsDashboard({
  params,
}: {
  params: { locale: Locale };
}) {
  const session = await getSession();

  if (!session?.user.id) {
    redirect('/login');
  }
  const posts = await prisma.post.findMany({
    where: { locale: params.locale },
    include: { author: true },
  });

  return (
    <Flex direction="column">
      <Flex justify="space-between" align="center" width="100%">
        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Posts
        </Heading>

        <AddNewButton title="Add New Post" />
      </Flex>

      <Spacer />

      <PostTable data={posts} />
    </Flex>
  );
}
